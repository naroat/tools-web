<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="input-section">
          <el-form label-position="top">
            <el-form-item :label="t('转盘选项（每行一个）')">
              <el-input
                v-model="optionsText"
                type="textarea"
                :rows="6"
                :placeholder="t('请输入转盘选项，每行一个')"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="updateWheel">{{ t("更新转盘") }}</el-button>
              <el-button @click="clearOptions">{{ t("清空") }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="wheel-section">
          <div class="wheel-wrapper">
            <div 
              ref="wheel" 
              class="wheel"
              :style="wheelStyle"
            >
              <div 
                v-for="(option, index) in options" 
                :key="index"
                class="wheel-sector"
                :style="getSectorStyle(index)"
              >
                <div class="sector-text">{{ option }}</div>
              </div>
              <div class="wheel-center"></div>
            </div>
            <div class="wheel-pointer"></div>
          </div>
          
          <div class="wheel-controls">
            <el-button 
              type="primary" 
              :disabled="isSpinning || options.length < 2"
              @click="spinWheel"
            >
              {{ t(isSpinning ? '旋转中...' : '开始旋转') }}
            </el-button>
            <div v-if="result" class="result">{{ t("结果:") }}{{ result }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线转盘工具，自定义选项后旋转转盘随机选择结果，支持多个选项和动画效果，可用于随机选择、抽奖等场景。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref, computed } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "转盘工具"

const optionsText = ref('');
const options = ref<string[]>([]);
const isSpinning = ref(false);
const result = ref<string>('');
// const wheel = ref<HTMLElement | null>(null);
const rotation = ref(0);

// 颜色列表
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
  '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
];

// 解析选项
const parseOptions = () => {
  const newOptions = optionsText.value
    .split('\n')
    .map(option => option.trim())
    .filter(option => option !== '');
  options.value = newOptions;
};

// 更新转盘
const updateWheel = () => {
  parseOptions();
  result.value = '';
};

// 清空选项
const clearOptions = () => {
  optionsText.value = '';
  options.value = [];
  result.value = '';
};

// 转盘样式
const wheelStyle = computed(() => {
  return {
    transform: `rotate(${rotation.value}deg)`
  };
});

// 获取扇形样式
const getSectorStyle = (index: number) => {
  const count = options.value.length;
  if (count === 0) return {};
  
  const angle = 360 / count;
  const startAngle = index * angle;
  const endAngle = (index + 1) * angle;
  
  // 计算扇形路径
  const radius = 150;
  const centerX = radius;
  const centerY = radius;
  
  const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
  const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
  const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
  const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
  
  // const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
  // const path = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  
  return {
    backgroundColor: colors[index % colors.length],
    clipPath: `polygon(50% 50%, ${startX}px ${startY}px, ${endX}px ${endY}px)`
  };
};

// 旋转转盘
const spinWheel = () => {
  if (isSpinning.value || options.value.length < 2) {
    return;
  }
  
  isSpinning.value = true;
  result.value = '';
  
  // 随机旋转角度（3-5圈）
  const randomRotation = 360 * (3 + Math.random() * 2);
  const finalRotation = rotation.value + randomRotation;
  
  // 计算最终指向的选项
  const anglePerOption = 360 / options.value.length;
  const normalizedRotation = finalRotation % 360;
  const selectedIndex = Math.floor((360 - normalizedRotation) / anglePerOption) % options.value.length;
  
  // 执行旋转动画
  const duration = 3000 + Math.random() * 2000; // 3-5秒
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用缓动函数
    const easeOut = 1 - Math.pow(1 - progress, 3);
    rotation.value = rotation.value + randomRotation * easeOut;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 旋转结束
      isSpinning.value = false;
      result.value = options.value[selectedIndex];
    }
  };
  
  requestAnimationFrame(animate);
};

// 初始示例
optionsText.value = '选项1\n选项2\n选项3\n选项4\n选项5';
parseOptions();
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

.wheel-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wheel-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}

.wheel {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.wheel-sector {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.sector-text {
  max-width: 80px;
  word-break: break-word;
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.wheel-pointer {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid #ff6b6b;
  z-index: 20;
}

.wheel-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.result {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
  }
  
  .input-section {
    width: 40%;
  }
  
  .wheel-section {
    width: 60%;
  }
}
</style>
