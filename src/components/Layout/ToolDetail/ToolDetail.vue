<script setup lang="ts">
import { t } from '@/i18n'

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
  <div class="mt-3 rounded-2xl p-4 tech-detail-section">
    <el-divider content-position="left" class="tech-divider">{{ t(props.title) }}</el-divider>
    <div class="m-4">
      <slot></slot>
    </div> 
  </div>
</template>

<style scoped>
/* 科技感详情区块 */
.tech-detail-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  position: relative;
  overflow: hidden;
}



/* 科技感分割线 */
.tech-divider {
  position: relative;
}

.tech-divider .el-divider__text {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  padding: 0 16px;
  font-weight: 600;
  color: #333;
}

.tech-divider::before {
  background: linear-gradient(90deg, #409EFF, transparent);
}

.tech-divider::after {
  background: linear-gradient(90deg, transparent, #667eea);
}
</style>
