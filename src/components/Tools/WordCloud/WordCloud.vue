<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="input-section">
          <el-form label-position="top">
            <el-form-item :label="t('输入文本')">
              <el-input
                v-model="inputText"
                type="textarea"
                :rows="6"
                :placeholder="t('请输入要生成词云的文本')"
              />
            </el-form-item>
            
            <el-form-item :label="t('词云设置')">
              <div class="settings-grid">
                <el-form-item :label="t('形状')" class="setting-item">
                  <el-select v-model="shape" size="small">
                    <el-option :label="t('圆形')" value="circle" />
                    <el-option :label="t('矩形')" value="rect" />
                    <el-option :label="t('三角形')" value="triangle" />
                    <el-option :label="t('心形')" value="heart" />
                  </el-select>
                </el-form-item>
                
                <el-form-item :label="t('颜色方案')" class="setting-item">
                  <el-select v-model="colorScheme" size="small">
                    <el-option :label="t('默认')" value="default" />
                    <el-option :label="t('暖色')" value="warm" />
                    <el-option :label="t('冷色')" value="cool" />
                    <el-option :label="t('多彩')" value="multi" />
                  </el-select>
                </el-form-item>
                
                <el-form-item :label="t('字体大小范围')" class="setting-item">
                  <div class="size-range">
                    <el-input-number v-model="minFontSize" :min="10" :max="50" size="small" />
                    <span class="range-separator">-</span>
                    <el-input-number v-model="maxFontSize" :min="20" :max="100" size="small" />
                  </div>
                </el-form-item>
              </div>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="generateWordCloud">{{ t("生成词云") }}</el-button>
              <el-button @click="downloadWordCloud">{{ t("下载图片") }}</el-button>
              <el-button @click="clearText">{{ t("清空") }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="result-section">
          <div ref="chartContainer" class="chart-container"></div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线词云生成工具，根据输入文本生成词云图，支持自定义词云形状、颜色方案和字体大小范围，可用于文本分析和可视化。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "词云生成"

const inputText = ref('');
const shape = ref('circle');
const colorScheme = ref('default');
const minFontSize = ref(12);
const maxFontSize = ref(60);
const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

// 颜色方案
const colorSchemes = {
  default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  warm: ['#ff7f50', '#87ceeb', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500'],
  cool: ['#00bfff', '#9370db', '#3cb371', '#ff6347', '#4682b4', '#ff69b4', '#32cd32', '#ff4500', '#9400d3'],
  multi: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8b00ff', '#ff00ff', '#1e90ff']
};

// 词频统计函数
const getWordFrequency = (text: string) => {
  // 简单的词频统计，实际应用中可能需要更复杂的分词
  const words = text
    .toLowerCase()
    .replace(/[.,?!;:()\[\]{}]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1);
  
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 100); // 只取前100个高频词
};

// 生成词云
const generateWordCloud = () => {
  if (!inputText.value.trim()) {
    return;
  }
  
  const words = getWordFrequency(inputText.value);
  if (words.length === 0) {
    return;
  }
  
  nextTick(() => {
    if (chartContainer.value) {
      if (chart) {
        chart.dispose();
      }
      
      chart = echarts.init(chartContainer.value);
      
      const option = {
        tooltip: {},
        series: [
          {
            type: 'wordCloud',
            shape: shape.value,
            left: 'center',
            top: 'center',
            width: '80%',
            height: '80%',
            right: null,
            bottom: null,
            sizeRange: [minFontSize.value, maxFontSize.value],
            rotationRange: [-45, 45],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            textStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function () {
                return colorSchemes[colorScheme.value as keyof typeof colorSchemes][Math.floor(Math.random() * colorSchemes[colorScheme.value as keyof typeof colorSchemes].length)];
              }
            },
            emphasis: {
              focus: 'self',
              textStyle: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: words
          }
        ]
      };
      
      chart.setOption(option);
    }
  });
};

// 清空文本
const clearText = () => {
  inputText.value = '';
  if (chart) {
    chart.clear();
  }
};

// 下载词云图片
const downloadWordCloud = () => {
  if (!chart) {
    return;
  }
  
  try {
    // 获取图片数据 URL
    const dataURL = chart.getDataURL({
      type: 'png',
      pixelRatio: 2, // 提高图片质量
      backgroundColor: '#fff'
    });
    
    // 创建下载链接
    const link = document.createElement('a');
    link.download = `wordcloud-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  } catch (error) {
    console.error('下载词云图片失败:', error);
  }
};

// 响应式调整
const handleResize = () => {
  if (chart) {
    chart.resize();
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  // 示例文本
  inputText.value = '词云 生成 工具 在线 文本 分析 可视化 数据 图表 形状 颜色 字体 大小 频率 统计 单词 词组 自定义 圆形 矩形 三角形 心形 暖色 冷色 多彩';
  generateWordCloud();
});
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

.size-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-separator {
  margin: 0 5px;
}

.result-section {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}

.chart-container {
  width: 100%;
  height: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
  }
  
  .input-section {
    width: 40%;
  }
  
  .result-section {
    width: 60%;
  }
}
</style>
