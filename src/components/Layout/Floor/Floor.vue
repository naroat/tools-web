<script setup lang="ts">
import {  ref } from 'vue';
const appDesc = ref(import.meta.env.VITE_APP_DESC || '')
</script>

<template>
  <div class="w-full rounded-2xl z-10 p-5 text-center">
    {{ appDesc }}  © 2024 <a href="https://github.com/taoran1401/tools-web" target="_blank" class="text-blue-700">Tools-Web</a>
  </div>
</template>

<style scoped>

</style>