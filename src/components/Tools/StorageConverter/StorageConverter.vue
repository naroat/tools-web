<script setup lang="ts">
import { t } from '@/i18n'

import { ref, computed } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'

const title = "数据存储单位换算"

// 状态管理
const inputValue = ref('')
const fromUnit = ref('B')
const toUnit = ref('KB')

// 存储单位选项
const unitOptions = [
  { label: 'bit (比特)', value: 'bit' },
  { label: 'B (字节)', value: 'B' },
  { label: 'KB (千字节)', value: 'KB' },
  { label: 'MB (兆字节)', value: 'MB' },
  { label: 'GB (吉字节)', value: 'GB' },
  { label: 'TB (太字节)', value: 'TB' },
  { label: 'PB (拍字节)', value: 'PB' },
  { label: 'EB (艾字节)', value: 'EB' }
]

// 单位转换系数
const unitFactors = {
  'bit': 1,
  'B': 8, // 1字节 = 8比特
  'KB': 8 * 1024,
  'MB': 8 * 1024 * 1024,
  'GB': 8 * 1024 * 1024 * 1024,
  'TB': 8 * 1024 * 1024 * 1024 * 1024,
  'PB': 8 * 1024 * 1024 * 1024 * 1024 * 1024,
  'EB': 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024
}

// 单个转换结果
const convertedValue = computed(() => {
  if (!inputValue.value) return ''
  
  const value = parseFloat(inputValue.value)
  if (isNaN(value)) return '无效输入'
  
  try {
    // 先转换为字节
    const bytes = value * unitFactors[fromUnit.value]
    // 再转换为目标单位
    const result = bytes / unitFactors[toUnit.value]
    
    // 检查小数点后的位数
    const resultStr = result.toString()
    const decimalIndex = resultStr.indexOf('.')
    
    if (decimalIndex !== -1 && resultStr.length - decimalIndex - 1 > 5) {
      // 小数点超过5位，使用科学计数法
      return result.toExponential(5)
    } else {
      // 否则使用固定小数位
      return result.toFixed(6)
    }
  } catch (error) {
    return '转换失败'
  }
})

// 所有单位的转换结果
const allConvertedValues = computed(() => {
  if (!inputValue.value) return []
  
  const value = parseFloat(inputValue.value)
  if (isNaN(value)) return []
  
  try {
    // 先转换为字节
    const bytes = value * unitFactors[fromUnit.value]
    
    // 计算所有单位的转换结果
    return unitOptions.map(option => {
      const result = bytes / unitFactors[option.value]
      
      // 检查小数点后的位数
      const resultStr = result.toString()
      const decimalIndex = resultStr.indexOf('.')
      
      let formattedResult
      if (decimalIndex !== -1 && resultStr.length - decimalIndex - 1 > 5) {
        // 小数点超过5位，使用科学计数法
        formattedResult = result.toExponential(5)
      } else {
        // 否则使用固定小数位
        formattedResult = result.toFixed(6)
      }
      
      return {
        unit: option.label,
        value: formattedResult
      }
    })
  } catch (error) {
    return []
  }
})

// 复制结果
const copyResult = () => {
  if (!convertedValue.value || convertedValue.value === '无效输入' || convertedValue.value === '转换失败') {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  copy(convertedValue.value)
}

// 清空输入
const clearInput = () => {
  inputValue.value = ''
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <!-- 输入部分 -->
      <div class="mb-4">
        <el-input
          v-model="inputValue"
          type="number"
          :placeholder="t('请输入数值')"
          class="mb-2"
        />
        
        <div class="flex gap-4 items-center">
          <div class="flex items-center gap-2">
            <el-text>{{ t("从单位：") }}</el-text>
            <el-select v-model="fromUnit" style="width: 140px;">
              <el-option
                v-for="option in unitOptions"
                :key="option.value"
                :label="t(option.label)"
                :value="option.value"
              />
            </el-select>
          </div>
          
          <div class="flex items-center gap-2">
            <el-text>{{ t("到单位：") }}</el-text>
            <el-select v-model="toUnit" style="width: 140px;">
              <el-option
                v-for="option in unitOptions"
                :key="option.value"
                :label="t(option.label)"
                :value="option.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="clearInput">{{ t("清空") }}</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div class="mb-4">
        <el-input
          :value="convertedValue"
          :placeholder="t('转换结果')"
          readonly
        >
          <template #append>
            <el-button @click="copyResult">{{ t("复制") }}</el-button>
          </template>
        </el-input>
      </div>
      
      <!-- 所有单位转换结果 -->
      <div v-if="allConvertedValues.length > 0">
        <el-text class="block mb-2">{{ t("所有单位转换结果：") }}</el-text>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div v-for="item in allConvertedValues" :key="item.unit" class="bg-gray-50 p-2 rounded">
            <div class="text-sm text-gray-500">{{ item.unit }}</div>
            <div class="font-medium">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线数据存储单位换算工具，支持比特(bit)、字节(B)、KB、MB、GB、TB、PB、EB等存储单位之间的相互转换。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
