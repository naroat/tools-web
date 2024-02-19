<script setup lang="ts">
import { ref } from 'vue'
const beianNo = ref('粤ICP备19038804号-1')
const copyright = ref('ranblogs.com')
</script>

<template>
  <div class="bg-white w-full rounded-2xl z-10 p-5 text-center">
    Copyright © 2023  · {{ copyright }} &nbsp;&nbsp; <a href="https://beian.miit.gov.cn/" target="_blank">{{ beianNo }}</a> 
  </div>
</template>

<style scoped>

</style>