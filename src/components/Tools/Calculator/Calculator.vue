<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="calculator">
          <div class="calculator-display">
            <div class="display-text">{{ display }}</div>
            <div class="display-history">{{ history }}</div>
          </div>
          
          <div class="calculator-buttons">
            <div class="button-row">
              <el-button type="info" @click="clear">C</el-button>
              <el-button type="info" @click="backspace"><</el-button>
              <el-button type="info" @click="append('%')">%</el-button>
              <el-button type="info" @click="append('/')">÷</el-button>
            </div>
            
            <div class="button-row">
              <el-button @click="append('7')">7</el-button>
              <el-button @click="append('8')">8</el-button>
              <el-button @click="append('9')">9</el-button>
              <el-button type="info" @click="append('*')">×</el-button>
            </div>
            
            <div class="button-row">
              <el-button @click="append('4')">4</el-button>
              <el-button @click="append('5')">5</el-button>
              <el-button @click="append('6')">6</el-button>
              <el-button type="info" @click="append('-')">-</el-button>
            </div>
            
            <div class="button-row">
              <el-button @click="append('1')">1</el-button>
              <el-button @click="append('2')">2</el-button>
              <el-button @click="append('3')">3</el-button>
              <el-button type="info" @click="append('+')">+</el-button>
            </div>
            
            <div class="button-row">
              <el-button @click="append('0')">0</el-button>
              <el-button @click="append('.')">.</el-button>
              <el-button type="success" @click="calculate">=</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线简易计算器，支持基本的加减乘除和取模运算，具有历史记录显示功能，可用于日常简单计算。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "简易计算器"

const display = ref('0');
const history = ref('');
const firstOperand = ref<number | null>(null);
const operator = ref<string | null>(null);
const waitingForSecondOperand = ref(false);

// 清空
const clear = () => {
  display.value = '0';
  history.value = '';
  firstOperand.value = null;
  operator.value = null;
  waitingForSecondOperand.value = false;
};

// 退格
const backspace = () => {
  if (waitingForSecondOperand.value) {
    return;
  }
  
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = '0';
  }
};

// 添加数字或操作符
const append = (value: string) => {
  if (['+', '-', '*', '/', '%'].includes(value)) {
    setOperator(value);
    return;
  }
  
  if (waitingForSecondOperand.value) {
    display.value = value;
    waitingForSecondOperand.value = false;
    return;
  }
  
  if (value === '.') {
    if (!display.value.includes('.')) {
      display.value += value;
    }
    return;
  }
  
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    display.value += value;
  }
};

// 计算
const calculate = () => {
  if (operator.value === null || firstOperand.value === null) {
    return;
  }
  
  const secondOperand = parseFloat(display.value);
  let result: number;
  
  switch (operator.value) {
    case '+':
      result = firstOperand.value + secondOperand;
      break;
    case '-':
      result = firstOperand.value - secondOperand;
      break;
    case '*':
      result = firstOperand.value * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        display.value = 'Error';
        history.value = '';
        firstOperand.value = null;
        operator.value = null;
        waitingForSecondOperand.value = false;
        return;
      }
      result = firstOperand.value / secondOperand;
      break;
    case '%':
      result = firstOperand.value % secondOperand;
      break;
    default:
      return;
  }
  
  // 处理结果显示
  if (Number.isInteger(result)) {
    display.value = result.toString();
  } else {
    display.value = result.toFixed(2);
  }
  
  history.value = `${firstOperand.value} ${operator.value} ${secondOperand} =`;
  firstOperand.value = result;
  operator.value = null;
  waitingForSecondOperand.value = true;
};

// 监听操作符点击
const setOperator = (op: string) => {
  if (operator.value !== null) {
    calculate();
  }
  
  firstOperand.value = parseFloat(display.value);
  operator.value = op;
  waitingForSecondOperand.value = true;
  history.value = `${firstOperand.value} ${op}`;
};
</script>

<style scoped>
.tool-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.calculator {
  width: 100%;
  max-width: 300px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.calculator-display {
  background-color: #f5f7fa;
  padding: 20px;
  text-align: right;
  border-bottom: 1px solid #e4e7ed;
}

.display-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.display-history {
  font-size: 14px;
  color: #999;
}

.calculator-buttons {
  display: flex;
  flex-direction: column;
}

.button-row {
  display: flex;
}

.button-row .el-button {
  flex: 1;
  height: 60px;
  font-size: 18px;
  margin: 0;
  border-radius: 0;
  border-right: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}

.button-row .el-button:last-child {
  border-right: none;
}

.button-row:last-child .el-button {
  border-bottom: none;
}

.button-row .el-button:nth-child(1) {
  border-left: none;
}

.button-row .el-button.success {
  flex: 2;
}

@media (max-width: 768px) {
  .calculator {
    max-width: 100%;
  }
  
  .button-row .el-button {
    height: 50px;
    font-size: 16px;
  }
}
</style>
