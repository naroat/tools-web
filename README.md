<div align="center">
  <h1 align="center">Tools-Web</h1>
  <p> 只需简单几步，即可快速搭建属于自己的综合工具站。</p> 

[![node](https://img.shields.io/badge/any_text-18.14.2-red?label=node)](node)
[![vue](https://img.shields.io/badge/any_text-3.3.10-origin?label=vue)](vue)
[![tailwindcss](https://img.shields.io/badge/any_text-3.3.5-yellow?label=tailwindcss)](tailwindcss)
[![elementplus](https://img.shields.io/badge/any_text-2.7-blue?label=element-plus)](elementplus)
[![license](https://img.shields.io/github/license/taoran1401/tools-web)](LICENSE)

</div>

## 目录

[TOC]

## 功能展览

![](/public/index.png)

## 开始使用

### Docker方式(推荐)

```
docker run -d --name tools-web --restart unless-stopped -p 8080:80 docker0796/tools-web:latest
```

访问：

### 手动

安装`pnpm`
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
pnpm build
```