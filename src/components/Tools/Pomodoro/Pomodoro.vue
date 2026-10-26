<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="timer-section">
          <div class="timer-display">
            <div class="timer-circle">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <!-- 背景圆环 -->
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#e4e7ed"
                  stroke-width="10"
                />
                <!-- 进度圆环 -->
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#409eff"
                  stroke-width="10"
                  stroke-linecap="round"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="progressOffset"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div class="timer-text">
                {{ formattedTime }}
              </div>
            </div>
          </div>
          
          <div class="timer-controls">
            <el-button 
              type="primary" 
              @click="startTimer" 
              :disabled="isRunning"
            >{{ t("开始") }}</el-button>
            <el-button 
              type="warning" 
              @click="pauseTimer" 
              :disabled="!isRunning"
            >{{ t("暂停") }}</el-button>
            <el-button 
              type="danger" 
              @click="resetTimer"
            >{{ t("重置") }}</el-button>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>{{ t("时间设置（分钟）") }}</h3>
          <el-form label-position="top" class="settings-form">
            <el-form-item :label="t('工作时间')">
              <el-input-number 
                v-model="workTime" 
                :min="1" 
                :max="60" 
                :step="5" 
                :disabled="isRunning"
              />
            </el-form-item>
            <el-form-item :label="t('短休息')">
              <el-input-number 
                v-model="shortBreakTime" 
                :min="1" 
                :max="30" 
                :step="5" 
                :disabled="isRunning"
              />
            </el-form-item>
            <el-form-item :label="t('长休息')">
              <el-input-number 
                v-model="longBreakTime" 
                :min="1" 
                :max="60" 
                :step="5" 
                :disabled="isRunning"
              />
            </el-form-item>
            <el-form-item :label="t('工作轮数')">
              <el-input-number 
                v-model="workRounds" 
                :min="1" 
                :max="10" 
                :disabled="isRunning"
              />
            </el-form-item>
          </el-form>
        </div>
        
        <div class="status-section">
          <h3>{{ t("状态") }}</h3>
          <div class="status-info">
            <div class="status-item">
              <span class="status-label">{{ t("当前模式:") }}</span>
              <span class="status-value">{{ t(currentModeText) }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">{{ t("已完成轮数:") }}</span>
              <span class="status-value">{{ completedRounds }}/{{ workRounds }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">{{ t("今日完成:") }}</span>
              <span class="status-value">{{ todayCompleted }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线番茄时钟工具，用于时间管理，支持工作和休息模式切换，可自定义工作时间、休息时间和工作轮数，帮助提高工作效率和专注力。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "番茄时钟"

// 时间设置
const workTime = ref(25);
const shortBreakTime = ref(5);
const longBreakTime = ref(15);
const workRounds = ref(4);

// 状态
const isRunning = ref(false);
const currentTime = ref(workTime.value * 60);
const currentMode = ref<'work' | 'shortBreak' | 'longBreak'>('work');
const completedRounds = ref(0);
const todayCompleted = ref(0);
const timerInterval = ref<number | null>(null);

// 计算属性
const circumference = computed(() => 2 * Math.PI * 90);

const progressOffset = computed(() => {
  const totalTime = currentMode.value === 'work' ? workTime.value * 60 : 
                    currentMode.value === 'shortBreak' ? shortBreakTime.value * 60 : 
                    longBreakTime.value * 60;
  const progress = currentTime.value / totalTime;
  return circumference.value * (1 - progress);
});

const formattedTime = computed(() => {
  const minutes = Math.floor(currentTime.value / 60);
  const seconds = currentTime.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const currentModeText = computed(() => {
  switch (currentMode.value) {
    case 'work': return '工作';
    case 'shortBreak': return '短休息';
    case 'longBreak': return '长休息';
    default: return '工作';
  }
});

// 开始计时器
const startTimer = () => {
  if (isRunning.value) return;
  
  isRunning.value = true;
  timerInterval.value = window.setInterval(() => {
    if (currentTime.value > 0) {
      currentTime.value--;
    } else {
      // 时间到
      clearInterval(timerInterval.value!);
      isRunning.value = false;
      
      // 播放提示音
      playNotification();
      
      // 切换模式
      switchMode();
    }
  }, 1000);
};

// 暂停计时器
const pauseTimer = () => {
  if (!isRunning.value) return;
  
  clearInterval(timerInterval.value!);
  isRunning.value = false;
};

// 重置计时器
const resetTimer = () => {
  clearInterval(timerInterval.value!);
  isRunning.value = false;
  currentTime.value = workTime.value * 60;
  currentMode.value = 'work';
  completedRounds.value = 0;
};

// 切换模式
const switchMode = () => {
  if (currentMode.value === 'work') {
    completedRounds.value++;
    todayCompleted.value++;
    
    if (completedRounds.value % workRounds.value === 0) {
      // 长休息
      currentMode.value = 'longBreak';
      currentTime.value = longBreakTime.value * 60;
    } else {
      // 短休息
      currentMode.value = 'shortBreak';
      currentTime.value = shortBreakTime.value * 60;
    }
  } else {
    // 回到工作模式
    currentMode.value = 'work';
    currentTime.value = workTime.value * 60;
  }
  
  ElMessage.success(t('切换到{mode}模式', { mode: t(currentModeText.value) }));
};

// 播放提示音
const playNotification = () => {
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAA');
    audio.play();
  } catch (e) {
    console.log('无法播放提示音');
  }
};

// 生命周期
onMounted(() => {
  // 从本地存储加载今日完成数
  const today = new Date().toDateString();
  const storedData = localStorage.getItem('pomodoro');
  if (storedData) {
    const data = JSON.parse(storedData);
    if (data.date === today) {
      todayCompleted.value = data.completed;
    }
  }
});

onUnmounted(() => {
  // 保存今日完成数到本地存储
  const today = new Date().toDateString();
  localStorage.setItem('pomodoro', JSON.stringify({
    date: today,
    completed: todayCompleted.value
  }));
  
  // 清除计时器
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.timer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.timer-display {
  display: flex;
  justify-content: center;
}

.timer-circle {
  position: relative;
  width: 200px;
  height: 200px;
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.timer-controls {
  display: flex;
  gap: 10px;
}

.settings-section {
  width: 100%;
}

.settings-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.settings-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.status-section {
  width: 100%;
}

.status-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.status-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.status-item {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.status-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.status-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .timer-section {
    width: 100%;
  }
  
  .settings-section {
    width: 50%;
  }
  
  .status-section {
    width: 50%;
  }
}
</style>
