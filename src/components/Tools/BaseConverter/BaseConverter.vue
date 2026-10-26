<script setup lang="ts">
import { t } from '@/i18n'

import { ref, computed } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'

const title = "进制转换计算器"

// 状态管理
const inputValue = ref('')
const fromBase = ref(10)
const toBase = ref(2)

// 进制选项
const baseOptions = [
  { label: '2 (二进制)', value: 2 },
  { label: '8 (八进制)', value: 8 },
  { label: '10 (十进制)', value: 10 },
  { label: '16 (十六进制)', value: 16 },
]

// 转换结果
const convertedValue = computed(() => {
  if (!inputValue.value) return ''
  
  try {
    // 先转换为十进制
    const decimalValue = parseInt(inputValue.value, fromBase.value)
    if (isNaN(decimalValue)) return '无效输入'
    
    // 再转换为目标进制
    if (toBase.value === 10) {
      return decimalValue.toString()
    } else if (toBase.value === 16) {
      return decimalValue.toString(16).toUpperCase()
    } else {
      return decimalValue.toString(toBase.value)
    }
  } catch (error) {
    return '转换失败'
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
          :placeholder="t('请输入要转换的数值')"
          class="mb-2"
        />
        
        <div class="flex gap-4 items-center">
          <div class="flex items-center gap-2">
            <el-text class="">{{ t("从进制：") }}</el-text>
            <el-select v-model="fromBase" style="width: 140px;">
              <el-option
                v-for="option in baseOptions"
                :key="option.value"
                :label="t(option.label)"
                :value="option.value"
              />
            </el-select>
          </div>
          
          <div class="flex items-center gap-2">
            <el-text>{{ t("到进制：") }}</el-text>
            <el-select v-model="toBase" style="width: 140px;">
              <el-option
                v-for="option in baseOptions"
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
      <div>
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
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线进制转换计算器，支持二进制、八进制、十进制、十六进制等多种进制之间的相互转换。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
