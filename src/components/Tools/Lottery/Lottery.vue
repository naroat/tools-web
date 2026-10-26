<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="input-section">
          <el-form label-position="top">
            <el-form-item :label="t('抽签选项（每行一个）')">
              <el-input
                v-model="optionsText"
                type="textarea"
                :rows="8"
                :placeholder="t('请输入抽签选项，每行一个')"
              />
            </el-form-item>
            
            <el-form-item :label="t('抽取设置')">
              <div class="settings-grid">
                <el-form-item :label="t('抽取数量')" class="setting-item">
                  <el-input-number v-model="drawCount" :min="1" :max="10" size="small" />
                </el-form-item>
                
                <el-form-item :label="t('是否允许重复')" class="setting-item">
                  <el-switch v-model="allowRepeat" size="small" />
                </el-form-item>
              </div>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="drawLottery">{{ t("开始抽签") }}</el-button>
              <el-button @click="clearOptions">{{ t("清空") }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="result-section">
          <h3>{{ t("抽签结果") }}</h3>
          <div v-if="results.length > 0" class="result-list">
            <div v-for="(result, index) in results" :key="index" class="result-item">
              <span class="result-number">{{ index + 1 }}</span>
              <span class="result-text">{{ result }}</span>
            </div>
          </div>
          <div v-else class="no-result">{{ t("点击开始抽签按钮开始抽取") }}</div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线抽签工具，输入多个选项后随机抽取一个或多个结果，支持设置抽取数量和是否允许重复抽取，可用于随机选择、抽奖等场景。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "抽签工具"

const optionsText = ref('');
const drawCount = ref(1);
const allowRepeat = ref(false);
const results = ref<string[]>([]);

// 开始抽签
const drawLottery = () => {
  // 解析输入的选项
  const options = optionsText.value
    .split('\n')
    .map(option => option.trim())
    .filter(option => option !== '');
  
  if (options.length === 0) {
    return;
  }
  
  // 计算实际抽取数量
  const actualDrawCount = allowRepeat.value 
    ? Math.min(drawCount.value, 10) 
    : Math.min(drawCount.value, options.length);
  
  // 执行抽签
  const newResults: string[] = [];
  const availableOptions = [...options];
  
  for (let i = 0; i < actualDrawCount; i++) {
    if (availableOptions.length === 0) {
      break;
    }
    
    const randomIndex = Math.floor(Math.random() * availableOptions.length);
    const selectedOption = availableOptions[randomIndex];
    newResults.push(selectedOption);
    
    // 如果不允许重复，从可用选项中移除
    if (!allowRepeat.value) {
      availableOptions.splice(randomIndex, 1);
    }
  }
  
  results.value = newResults;
};

// 清空选项
const clearOptions = () => {
  optionsText.value = '';
  results.value = [];
};
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-section {
  width: 100%;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.setting-item {
  margin-bottom: 0;
}

.result-section {
  width: 100%;
  margin-top: 20px;
}

.result-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.result-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #409eff;
  color: white;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 12px;
}

.result-text {
  font-size: 16px;
  color: #333;
}

.no-result {
  text-align: center;
  color: #999;
  padding: 40px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
  }
  
  .input-section {
    width: 50%;
  }
  
  .result-section {
    width: 50%;
  }
}
</style>
