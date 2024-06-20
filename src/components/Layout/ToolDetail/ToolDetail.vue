<script setup lang="ts">
import { onMounted } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: '描述'
  }
})

onMounted(() => {
})
</script>

<template>
  <!-- desc -->
  <div class="mt-3 rounded-2xl bg-white p-4">
    <el-divider content-position="left">{{ props.title }}</el-divider>
    <div class="m-4">
      <slot></slot>
    </div> 
  </div>
</template>

<style scoped>

</style>