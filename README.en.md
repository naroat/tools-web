<div align="center">
  <pre>
    _______          _         __          __  _
 |__   __|        | |        \ \        / / | |
    | | ___   ___ | |___ _____\ \  /\  / /__| |__
    | |/ _ \ / _ \| / __|______\ \/  \/ / _ \ '_ \
    | | (_) | (_) | \__ \       \  /\  /  __/ |_) |
    |_|\___/ \___/|_|___/        \/  \/ \___|_.__/
  </pre>
  <p>Build your own online toolbox in just a few simple steps.</p>

[![node](https://img.shields.io/badge/any_text-22.21.1-red?label=node)](node)
[![vue](https://img.shields.io/badge/any_text-3.3.10-origin?label=vue)](vue)
[![tailwindcss](https://img.shields.io/badge/any_text-3.3.5-yellow?label=tailwindcss)](tailwindcss)
[![elementplus](https://img.shields.io/badge/any_text-2.7-blue?label=element-plus)](elementplus)
[![license](https://img.shields.io/github/license/naroat/tools-web)](LICENSE)
</div>

**Language:** [简体中文](README.md) | English

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Docker Deployment](#docker-deployment)
  - [Manual Setup](#manual-setup)
- [Toolbox](#toolbox)
- [FAQ](#faq)

## Features

Live site: <a href="https://tools.ranblogs.com" target="_blank">Tools-Web</a>

## Getting Started

### Docker Deployment

```sh
docker run -d --name tools-web --restart unless-stopped -p 8080:80 docker0796/tools-web:latest
```

Open `http://127.0.0.1:8080` in your browser.

### Manual Setup

Install `pnpm`:

```sh
npm install pnpm -g
```

Clone the repository:

```sh
git clone --depth=1 https://github.com/naroat/tools-web.git
```

Install dependencies:

```sh
# Enter the project directory
cd tools-web

# Copy the configuration file
cp .env.example .env.development

# Install dependencies
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Build the project:

```sh
pnpm build
```

To build SEO-friendly static pages, copy `.env.development` to `.env.production`, set `NODE_ENV` to `production`, and run:

```sh
pnpm build:pro
```

## Toolbox

- Developer Tools
  - Random Password Generator
  - URL Encoder/Decoder
  - UUID Generator
  - Timestamp Converter
  - MD5 Hash Generator
  - Online JSON Converter
  - Regular Expression Tester
  - Unicode to Chinese Converter
  - HTTP Status Codes
  - JWT Decoder
  - HTML Entity Encoder/Decoder
  - JavaScript Formatter/Minifier
  - HTML Formatter
  - CSS Formatter/Minifier
  - Base64 Encoder/Decoder
  - Number Base Converter
  - Data Storage Unit Converter
  - Hash Calculator
  - XML Formatter
  - SQL Formatter

- Text Tools
  - Text Diff
  - Markdown Editor
  - ASCII Art Generator
  - Duplicate Text Remover
  - Online Text Editor / HTML Viewer
  - Word Counter
  - Text Replacer
  - Text Processing Workflow
  - Word Frequency Counter

- Education and Academic Tools
  - Unit Converter
  - Morse Code Translator
  - Number Base Converter
  - ASCII Table
  - Length Converter
  - Area Converter
  - Weight Converter
  - Time Converter
  - Temperature Converter
  - Pressure Converter
  - Energy Converter
  - Power Converter

- Image Tools
  - QR Code Generator
  - Online Image Editor
  - Text to Image
  - Image Splitter
  - Image Color Picker
  - Image Watermark Tool

- Charts and Data Visualization
  - Bar Chart
  - Line Chart
  - Pie Chart
  - Scatter Plot
  - Word Cloud Generator

- Random Choice Tools
  - Random Number Generator
  - Decision Maker
  - Coin Toss
  - Dice Roller
  - Random Picker
  - Spin the Wheel

- Other Tools
  - Number to Chinese Uppercase Currency
  - Scrolling Text Banner
  - Color Palette
  - Color Picker
  - Pomodoro Timer
  - Reaction Time Test
  - M3U8 Player
  - Rock Paper Scissors
  - Emoji Gallery
  - Simple Calculator

## FAQ

**Q: How can I add a new feature?**

A:

- Add the tool information in `components/Tools/tools.ts`.
- Add a route in `router/router.ts`.
- Add the tool component under `components/Tools`.

**Q: Can I contribute to Tools-Web?**

A: Absolutely! Pull requests are welcome.

<br/>
