# =============================================================================
# tools-web —— macOS（Intel / Apple Silicon）、Windows（Docker Desktop / WSL2）、
#              Linux 通用镜像。同一份文件在哪台机器上构建结果都一致。
#
# 常规构建（用本机架构，最快）：
#   docker build -t tools-web:latest .
# 运行：
#   docker run -d -p 8080:80 --name tools-web tools-web:latest
#
# 目标是 x86 云服务器时（Apple Silicon 上必须显式指定平台，否则服务器上会
# 报 exec format error）：
#   docker buildx build --platform linux/amd64 -t <repo>/tools-web:latest --push .
#   一次出两种架构：--platform linux/amd64,linux/arm64
#
# 国内网络拉包慢可以换源（npm 依赖 + 基础镜像都可换）：
#   docker build \
#     --build-arg NPM_REGISTRY=https://registry.npmmirror.com \
#     --build-arg NODE_IMAGE=docker.m.daocloud.io/library/node:22-alpine \
#     --build-arg NGINX_IMAGE=docker.m.daocloud.io/library/nginx:stable-alpine \
#     -t tools-web .
#
# 说明：默认走 `pnpm build`（--mode development），与原 Dockerfile 产物一致。
# 若要用 `pnpm build:pro`（--mode production），该模式会通过
# vite-plugin-seo-prerender + puppeteer 做 SEO 预渲染，容器内必须有 Chrome：
#   在 build 阶段 apk add chromium，并设 PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
#   （以 root 运行还需 --no-sandbox，体积与耗时都会明显增加，故默认不开）
# =============================================================================

ARG NODE_IMAGE=node:22-alpine
ARG NGINX_IMAGE=nginx:stable-alpine
ARG PNPM_VERSION=9.15.4

# -----------------------------------------------------------------------------
# 第 1 阶段：构建前端静态资源
# 固定在 BUILDPLATFORM 上执行，跨架构构建时不会走 QEMU 模拟，速度快数倍；
# 产物是纯 JS / CSS / HTML，与 CPU 架构无关。
# -----------------------------------------------------------------------------
FROM --platform=$BUILDPLATFORM ${NODE_IMAGE} AS build-stage

ARG PNPM_VERSION
ARG NPM_REGISTRY

# pnpm 用 corepack 管理，版本与 pnpm-lock.yaml（lockfileVersion 9.0）对齐
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=true \
    NPM_CONFIG_LOGLEVEL=warn

RUN corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate \
    && if [ -n "$NPM_REGISTRY" ]; then \
         npm config set registry "$NPM_REGISTRY" \
         && pnpm config set registry "$NPM_REGISTRY"; \
       fi

WORKDIR /app

# 先只拷清单与锁文件：依赖没变时这层直接命中缓存
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

# 再拷源码。node_modules / dist / .git / .env* 已在 .dockerignore 排除，
# 宿主机（尤其 Windows）上的原生依赖不会被打进镜像
COPY . .

# 仓库里的 .env.development 被 .dockerignore 排除了，缺省时用 .env.example 兜底，
# 保证在 mac / win 上都能直接构建
RUN set -eux; \
    if [ ! -f .env.development ] && [ -f .env.example ]; then \
      cp .env.example .env.development; \
    fi

RUN pnpm run build

# -----------------------------------------------------------------------------
# 第 2 阶段：nginx 静态托管（架构随目标平台走，与构建阶段解耦）
# -----------------------------------------------------------------------------
FROM ${NGINX_IMAGE} AS production-stage

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
