<script setup lang="ts">
// import { ref } from 'vue'
// import { copy } from '@/utils/string'
// const info = reactive({
//   title: "关于本站",
// })
const feedBackUrl = import.meta.env.VITE_FEEDBACK_URL
//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <div class="bg-white rounded-md p-5">
      <br>
      <p>本项目基于 <el-link class="" href="https://github.com/taoran1401/tools-web" target="_blank" type="primary">tools-web</el-link> 构建</p>
      <br>
      <p class=""><span class="bg-gray-200 p-1">ctrl + D</span>收藏本站，以便以后使用</p>
      <br>
      <p class="font-bold">联系作者/问题反馈</p>
      <br>
      <p>反馈中心：<el-link :href="feedBackUrl">{{ feedBackUrl }}</el-link></p>
      <br>
      <p>邮箱：taoran0796@163.com</p>
      <br>
    </div>
  </div>
</template>

<style scoped>

</style>