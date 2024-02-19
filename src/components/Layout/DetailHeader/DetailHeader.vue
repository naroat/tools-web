<script setup lang="ts">
// import { Star } from '@element-plus/icons-vue'
const props = defineProps({
  title: String
})
</script>

<template>
  <div class="flex justify-between rounded-2xl bg-white p-4 mt-5 mb-5">
    <!-- <div class="text-gray-600">
      <div class="flex">
        <RouterLink to="/" class="flex items-center">
          <el-icon color="blue"><Back /></el-icon>
          <div>返回首页</div>
        </RouterLink>
      </div>
    </div> -->

    <div class="text-xl">
      {{ props.title }}
    </div>
    <div>
      <el-button type="primary" plain>收藏</el-button>
      <!-- <el-button type="danger">取消收藏</el-button> -->
    </div>
  </div>
</template>

<style scoped>

</style>