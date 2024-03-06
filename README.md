# 基于Vite4.x + Vue3.x + ElementPlus + Typescript + Tailwind的工具站

[![license](https://img.shields.io/github/license/taoran1401/tools-web)](LICENSE)

> 演示站点：https://tools.ranblogs.com

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

# 技术栈

- 编程语言: TypeScript + JavaScript
- 构件工具: Vite4.x
- 前端框架: Vue3.x
- 路由工具: Vue Router
- 状态管理: Pinia
- Ui框架: ElementPlus + Tailwindcss
- Http工具: Axios

# 后端功能(可以不用)

主要包含登录后的相关操作，若不用后端功能可以忽略该部分

项目地址：https://github.com/taoran1401/tools-web-api

使用方法见内`README`

# 其他

有问题请提`issue`，积极处理
