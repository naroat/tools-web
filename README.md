# 基于Vite4.x + Vue3.x + ElementPlus + Typescript + Tailwind的工具站

[![license](https://img.shields.io/github/license/taoran1401/tools-web)](LICENSE)

> 演示站点：https://tools.ranblogs.com

# 介绍

免费开源的工具站，目前已开发数十种工具，对平板和手机适配进行了响应式设计，同时为了让seo更为友好做了ssr处理，搭建简单使用方便

![](/public/index.png)

# 快速使用

安装`pnpm`, 为避免因为不同包管理器工具下载同一个依赖,可能版本不一样的问题,本项目强制使用`pnpm`
```
npm install pnpm -g
```

克隆
```
git clone --depth=1 https://github.com/taoran1401/tools-web.git
```

安装
```
# 进入项目
cd tools-web

# 复制配置文件
cp .env.example .env.development

# 安装
pnpm install
```

启动
```
pnpm dev
```

打包
```
pnpm build:dev
```

# 后端功能(非必须)

主要包含登录后的收藏功能，若只用工具可以忽略该部分

项目地址：https://github.com/taoran1401/tools-web-api

使用方法见内`README`

# 其他

有问题或建议请提`issue`
