<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="test-section">
          <div 
            ref="testArea" 
            class="test-area"
            :class="testStatus"
            @click="handleTestClick"
          >
            <div v-if="testStatus === 'ready'" class="test-message">{{ t("点击开始测试") }}</div>
            <div v-else-if="testStatus === 'waiting'" class="test-message">{{ t("准备就绪，等待变色...") }}</div>
            <div v-else-if="testStatus === 'active'" class="test-message">{{ t("点击！") }}</div>
            <div v-else-if="testStatus === 'completed'" class="test-message">{{ t("反应时间:") }}{{ reactionTime }} ms
            </div>
          </div>
          
          <div class="test-controls">
            <el-button 
              type="primary" 
              @click="startTest" 
              :disabled="testStatus === 'waiting' || testStatus === 'active'"
            >{{ t("开始测试") }}</el-button>
            <el-button @click="resetTest">{{ t("重置") }}</el-button>
          </div>
        </div>
        
        <div class="stats-section">
          <h3>{{ t("测试统计") }}</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">{{ t("最佳反应时间") }}</div>
              <div class="stat-value">{{ bestTime }} ms</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">{{ t("平均反应时间") }}</div>
              <div class="stat-value">{{ averageTime }} ms</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">{{ t("测试次数") }}</div>
              <div class="stat-value">{{ testCount }}</div>
            </div>
          </div>
          
          <div class="history-section">
            <h4>{{ t("测试历史") }}</h4>
            <div class="history-list">
              <div 
                v-for="(time, index) in testHistory" 
                :key="index"
                class="history-item"
              >{{ t("测试") }}{{ index + 1 }}: {{ time }} ms
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线反应速度测试工具，通过点击变色的方块来测试你的反应速度，记录测试历史和统计数据，帮助你了解自己的反应能力。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref, computed } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "反应速度测试"

// 移除未使用的 testArea 引用
const testStatus = ref<'ready' | 'waiting' | 'active' | 'completed'>('ready');
const reactionTime = ref(0);
const testHistory = ref<number[]>([]);
const startTime = ref(0);
const waitingTimer = ref<number | null>(null);

// 计算属性
const testCount = computed(() => testHistory.value.length);

const bestTime = computed(() => {
  if (testHistory.value.length === 0) return 0;
  return Math.min(...testHistory.value);
});

const averageTime = computed(() => {
  if (testHistory.value.length === 0) return 0;
  const sum = testHistory.value.reduce((acc, time) => acc + time, 0);
  return Math.round(sum / testHistory.value.length);
});

// 开始测试
const startTest = () => {
  testStatus.value = 'waiting';
  
  // 随机等待时间（1-5秒）
  const waitTime = 1000 + Math.random() * 4000;
  
  waitingTimer.value = window.setTimeout(() => {
    testStatus.value = 'active';
    startTime.value = performance.now();
  }, waitTime);
};

// 处理测试区域点击
const handleTestClick = () => {
  if (testStatus.value === 'ready') {
    startTest();
  } else if (testStatus.value === 'active') {
    const endTime = performance.now();
    reactionTime.value = Math.round(endTime - startTime.value);
    testHistory.value.push(reactionTime.value);
    testStatus.value = 'completed';
  }
};

// 重置测试
const resetTest = () => {
  if (waitingTimer.value) {
    clearTimeout(waitingTimer.value);
  }
  testStatus.value = 'ready';
  reactionTime.value = 0;
};
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.test-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.test-area {
  width: 300px;
  height: 300px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e4e7ed;
}

.test-area.ready {
  background-color: #f5f7fa;
}

.test-area.waiting {
  background-color: #ecf5ff;
}

.test-area.active {
  background-color: #f0f9eb;
  border-color: #67c23a;
  box-shadow: 0 0 20px rgba(103, 194, 58, 0.5);
}

.test-area.completed {
  background-color: #fef0f0;
  border-color: #f56c6c;
}

.test-message {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.test-controls {
  display: flex;
  gap: 10px;
}

.stats-section {
  width: 100%;
}

.stats-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.stat-item {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}

.history-section {
  margin-top: 20px;
}

.history-section h4 {
  margin-bottom: 10px;
  color: #333;
}

.history-list {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.history-item {
  margin-bottom: 10px;
  color: #666;
}

.history-item:last-child {
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
  }
  
  .test-section {
    width: 50%;
  }
  
  .stats-section {
    width: 50%;
  }
}
</style>
