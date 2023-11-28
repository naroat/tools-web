<script setup lang="ts">
import { ref } from 'vue'
const beianNo = ref('xxxxx备案号')
const copyright = ref('ranblogs.com')
</script>

<template>
  <div class="bg-black w-full fixed left-0 bottom-0 text-white text-center h-8 leading-8 z-10">
    Copyright © 2023  · {{ copyright }} &nbsp;&nbsp; <a href="https://beian.miit.gov.cn/" target="_blank">{{ beianNo }}</a> 
  </div>
</template>

<style scoped>

</style>