<script setup lang="ts">
import { t } from '@/i18n'
import {  ref } from 'vue';
const appDesc = ref(import.meta.env.VITE_APP_DESC || '')
const currentYear: number = new Date().getFullYear();
</script>

<template>
  <div class="w-full rounded-2xl z-10 p-5 text-center tech-footer">
    <el-text>{{ t(appDesc) }}  © {{ currentYear }} <a href="https://github.com/naroat/tools-web" target="_blank" class="text-blue-700 tech-link">Tools-Web</a></el-text>
  </div>
</template>

<style scoped>
/* 简约页脚 */
.tech-footer {
  background: transparent;
  border: none;
  position: relative;
}

/* 简约链接 */
.tech-link {
  transition: all 0.2s ease;
  text-decoration: none;
}

.tech-link:hover {
  color: #409EFF;
}
</style>