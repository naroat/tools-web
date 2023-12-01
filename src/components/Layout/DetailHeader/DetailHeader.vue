<script setup lang="ts">
import { Back } from '@element-plus/icons-vue'
const props = defineProps({
  title: String
})
</script>

<template>
  <div>
    <div class="text-gray-600">
      <div class="flex">
        <RouterLink to="/" class="flex items-center">
          <el-icon color="blue"><Back /></el-icon>
          <div>返回首页</div>
        </RouterLink>
      </div>
    </div>

    <div class="text-xl mt-5 mb-5">
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped>

</style>