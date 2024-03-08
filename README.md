# 基于Vite4.x + Vue3.x + ElementPlus + Typescript + Tailwind的工具站

[![license](https://img.shields.io/github/license/taoran1401/tools-web)](LICENSE)

> 演示站点：https://tools.ranblogs.com

# 介绍

免费开源的工具站，目前已开发数十种工具，对平板和手机适配进行了响应式设计，同时为了让seo更为友好做了ssr处理，搭建简单使用方便

已有工具：
- 时间戳转换
- MD5在线加密
- Json在线转换
- 正则测试工具
- Unicode转中文
- IP查询
- 常用进制转换
- 在线图片处理
- 字数统计
- 随机密码生成
- URL编码/解码
- UUID生成器
- 手持弹幕
- ASCII码表
- 单位换算
- 色板
- 二维码生成
- 帮我决定
- 摩斯电码
- 生成随机数
- 数字转金额大写
- 文本对比
- markdown编辑器
- 文本转图片
- 网站favicon获取

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
