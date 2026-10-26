<script setup lang="ts">
import { t } from '@/i18n'

import { Star, StarFilled } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToolsStore } from '@/store/modules/tools'
import { ElMessage } from 'element-plus'
import {rtrim} from '@/utils/string'
const props = defineProps({  title: String,  id: Number})
const route = useRoute()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: '',
  route: ''
})
//store
const toolsStore = useToolsStore()
const isCollected = ref(false)

//根据路由查询tool id
const getToolInfo = async () => {
  let routeStr = route.path
  searchParam.route = rtrim(routeStr, '/')
  await toolsStore.getToolInfo(searchParam)
  // 检查收藏状态
  isCollected.value = toolsStore.isCollected(searchParam.route)
}

// 收藏/取消收藏
const toggleCollect = () => {
  const toolInfo = toolsStore.currentTool
  if (!toolInfo) {
    ElMessage.warning(t('获取工具信息失败'));
    return;
  }
  
  if (isCollected.value) {
    // 取消收藏
    const success = toolsStore.removeCollect(toolInfo.url)
    if (success) {
      isCollected.value = false
      ElMessage.success(t('已取消收藏'));
    } else {
      ElMessage.error(t('取消收藏失败'));
    }
  } else {
    // 添加收藏
    const success = toolsStore.addCollect(toolInfo)
    if (success) {
      isCollected.value = true
      ElMessage.success(t('收藏成功'));
    } else {
      ElMessage.error(t('收藏失败，可能已经收藏过了'));
    }
  }
}

onMounted(() => {
  toolsStore.loadCollectedTools()
  getToolInfo()
})

</script>

<template>
  <div class="flex justify-between items-center rounded-2xl p-4 mt-5 mb-5 tech-detail-header">
    <div class="text-xl tech-title">
      {{ t(props.title) }}
    </div>
    <div>
      <el-button 
        :icon="isCollected ? StarFilled : Star" 
        :type="isCollected ? 'warning' : 'default'"
        @click="toggleCollect"
        class="tech-button"
        size="default"
      >
        {{ t(isCollected ? '已收藏' : '收藏') }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
/* 科技感详情页头部 */
.tech-detail-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(64, 158, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.tech-detail-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #409EFF, #667eea, #764ba2);
}

/* 科技感标题 */
.tech-title {
  position: relative;
  font-weight: 600;
  color: #333;
}

/* 科技感按钮 */
.tech-button {
  position: relative;
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.tech-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.tech-button:active {
  transform: translateY(0);
}

/* 收藏状态按钮样式 */
.tech-button.is-warning {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  border-color: #ffc107;
  color: #fff;
}

.tech-button.is-warning:hover {
  background: linear-gradient(135deg, #ffca28, #ff9800);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
}

/* 未收藏状态按钮样式 */
.tech-button.is-default {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-color: #dee2e6;
  color: #495057;
}

.tech-button.is-default:hover {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
