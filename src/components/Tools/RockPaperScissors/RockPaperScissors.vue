<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="game-section">
          <div class="player-section">
            <h3>{{ t("你的选择") }}</h3>
            <div class="choices">
              <div 
                v-for="choice in choices" 
                :key="choice.value"
                class="choice-item"
                :class="{ active: selectedChoice === choice.value }"
                @click="makeChoice(choice.value)"
              >
                <div class="choice-icon">{{ choice.icon }}</div>
                <div class="choice-name">{{ t(choice.name) }}</div>
              </div>
            </div>
          </div>
          
          <div class="result-section">
            <h3>{{ t("对战结果") }}</h3>
            <div v-if="gameResult" class="result-content">
              <div class="result-message">{{ t(gameResult.message) }}</div>
              <div class="result-details">
                <div class="player-result">{{ t("你:") }}{{ t(getChoiceName(selectedChoice)) }}</div>
                <div class="computer-result">{{ t("电脑:") }}{{ t(getChoiceName(computerChoice)) }}</div>
              </div>
              <el-button type="primary" @click="resetGame">{{ t("再来一局") }}</el-button>
            </div>
            <div v-else class="no-result">{{ t("请选择你的武器开始游戏") }}</div>
          </div>
          
          <div class="computer-section">
            <h3>{{ t("电脑选择") }}</h3>
            <div class="computer-choice">
              <div v-if="computerChoice" class="choice-item computer">
                <div class="choice-icon">{{ getChoiceIcon(computerChoice) }}</div>
                <div class="choice-name">{{ t(getChoiceName(computerChoice)) }}</div>
              </div>
              <div v-else class="waiting">{{ t("等待中...") }}</div>
            </div>
          </div>
        </div>
        
        <div class="stats-section">
          <h3>{{ t("游戏统计") }}</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">{{ t("总游戏数") }}</div>
              <div class="stat-value">{{ stats.total }}</div>
            </div>
            <div class="stat-item win">
              <div class="stat-label">{{ t("胜利") }}</div>
              <div class="stat-value">{{ stats.wins }}</div>
            </div>
            <div class="stat-item lose">
              <div class="stat-label">{{ t("失败") }}</div>
              <div class="stat-value">{{ stats.losses }}</div>
            </div>
            <div class="stat-item draw">
              <div class="stat-label">{{ t("平局") }}</div>
              <div class="stat-value">{{ stats.draws }}</div>
            </div>
          </div>
          <el-button @click="resetStats">{{ t("重置统计") }}</el-button>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线剪刀石头布游戏，与电脑对战，支持实时显示对战结果和游戏统计，可用于休闲娱乐和决策参考。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "剪刀石头布"

const choices = [
  { name: '剪刀', value: 'scissors', icon: '✂️' },
  { name: '石头', value: 'rock', icon: '🪨' },
  { name: '布', value: 'paper', icon: '📄' }
];

const selectedChoice = ref<string>('');
const computerChoice = ref<string>('');
const gameResult = ref<{ message: string; result: 'win' | 'lose' | 'draw' } | null>(null);

const stats = ref({
  total: 0,
  wins: 0,
  losses: 0,
  draws: 0
});

// 生成电脑的选择
const generateComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex].value;
};

// 判断游戏结果
const determineWinner = (player: string, computer: string) => {
  if (player === computer) {
    return { message: '平局！', result: 'draw' as const };
  }
  
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) {
    return { message: '你赢了！', result: 'win' as const };
  }
  
  return { message: '你输了！', result: 'lose' as const };
};

// 玩家选择
const makeChoice = (choice: string) => {
  if (gameResult.value) {
    return;
  }
  
  selectedChoice.value = choice;
  computerChoice.value = generateComputerChoice();
  gameResult.value = determineWinner(choice, computerChoice.value);
  
  // 更新统计
  stats.value.total++;
  if (gameResult.value.result === 'win') {
    stats.value.wins++;
  } else if (gameResult.value.result === 'lose') {
    stats.value.losses++;
  } else {
    stats.value.draws++;
  }
};

// 重置游戏
const resetGame = () => {
  selectedChoice.value = '';
  computerChoice.value = '';
  gameResult.value = null;
};

// 重置统计
const resetStats = () => {
  stats.value = {
    total: 0,
    wins: 0,
    losses: 0,
    draws: 0
  };
  resetGame();
};

// 获取选择的名称
const getChoiceName = (choice: string) => {
  const found = choices.find(c => c.value === choice);
  return found ? found.name : '';
};

// 获取选择的图标
const getChoiceIcon = (choice: string) => {
  const found = choices.find(c => c.value === choice);
  return found ? found.icon : '';
};
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.game-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.player-section, .computer-section {
  width: 100%;
  text-align: center;
}

.choices {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.choice-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.choice-item:hover {
  border-color: #409eff;
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.3);
}

.choice-item.active {
  border-color: #409eff;
  background-color: #ecf5ff;
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
}

.choice-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.choice-name {
  font-size: 16px;
  color: #333;
}

.computer-choice {
  margin-top: 10px;
}

.computer-choice .choice-item {
  cursor: default;
}

.waiting {
  padding: 40px;
  font-size: 16px;
  color: #999;
  border: 2px dashed #e4e7ed;
  border-radius: 8px;
  min-width: 200px;
}

.result-section {
  text-align: center;
  margin: 20px 0;
}

.result-content {
  padding: 30px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-top: 10px;
}

.result-message {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.result-details {
  margin-bottom: 20px;
  font-size: 16px;
}

.player-result, .computer-result {
  margin: 10px 0;
}

.no-result {
  padding: 40px;
  font-size: 16px;
  color: #999;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 10px;
}

.stats-section {
  margin-top: 20px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-item {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  text-align: center;
}

.stat-item.win {
  background-color: #f0f9eb;
  border: 1px solid #c2e7b0;
}

.stat-item.lose {
  background-color: #fef0f0;
  border: 1px solid #fbc4c4;
}

.stat-item.draw {
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

@media (min-width: 768px) {
  .game-section {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .player-section, .computer-section {
    width: 30%;
  }
  
  .result-section {
    width: 40%;
  }
}
</style>
