<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col mt-8 flex-1 items-center bg-white rounded-md p-10">
    <div class="p-5 w-2/3">
      <h1 class="text-2xl font-bold">关于 Tools-Web</h1>
      <p class="mt-6">
        <el-text><el-link href="https://github.com/taoran1401/tools-web" target="_blank" type="primary">Tools-Web</el-link> 是一款免费开源的轻量工具集合站，包含开发、文本、媒体、图表、生活、查询等实用工具；如果对您有帮助，请将其分享给您的朋友，并且添加到收藏夹中！顺便再点个⭐️吧！</el-text>
      </p>

      <h1 class="text-2xl font-bold mt-6 mb-6">技术</h1>
      <p>
        <el-text>主要基于Vite + Vue + ElementPlus + Typescript + TailwindCss开发，某些工具使用了第三方开源库，您可以在仓库的 <el-link href="https://github.com/taoran1401/tools-web/blob/master/package.json" target="_blank" type="primary">package.json</el-link> 文件中找到完整的列表。</el-text>
      </p>
      <h1 class="text-2xl font-bold mt-6 mb-6">发现了 Bug？</h1>
      <p>
        <el-text>如果您发现了 Bug，或者某些功能未能按预期工作，请在 GitHub 仓库的 <el-link type="primary" target="_blank" href="https://github.com/taoran1401/tools-web/issues/new" class="">issues</el-link> 中提交错误报告。</el-text>
      </p>
    </div>
  </div>
</template>

<style scoped>
.title{
  /* rgb(51, 54, 57) */
}
</style>