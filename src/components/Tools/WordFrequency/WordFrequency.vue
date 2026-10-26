<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'

const title = "词频统计"

// 状态管理
const inputText = ref('')
const minWordLength = ref(2)
const frequencyResult = ref([] as { word: string; count: number }[])

// 统计词频
const calculateFrequency = () => {
  if (!inputText.value) {
    ElMessage.warning(t('请输入要统计词频的文本'))
    return
  }
  
  try {
    const frequency = countWordFrequency(inputText.value, minWordLength.value)
    frequencyResult.value = frequency
    ElMessage.success(t('统计完成'))
  } catch (error) {
    ElMessage.error(t('统计失败：') + error)
  }
}

// 计算词频
const countWordFrequency = (text: string, minLength: number) => {
  // 分词
  const words = tokenize(text)
  
  // 过滤长度
  const filteredWords = words.filter(word => word.length >= minLength)
  
  // 统计频率
  const frequencyMap = new Map<string, number>()
  filteredWords.forEach(word => {
    frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1)
  })
  
  // 转换为数组并排序
  const frequencyArray = Array.from(frequencyMap.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
  
  return frequencyArray
}

// 文本分词
const tokenize = (text: string): string[] => {
  // 简单的分词实现，去除标点符号，转为小写
  return text
    .toLowerCase()
    .replace(/[.,?!;:"'()\[\]{}]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0)
}

// 复制结果
const copyResult = () => {
  if (frequencyResult.value.length === 0) {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  const resultText = frequencyResult.value
    .map(item => `${item.word}: ${item.count}`)
    .join('\n')
  
  copy(resultText)
  ElMessage.success(t('复制成功'))
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
  frequencyResult.value = []
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <!-- 输入部分 -->
      <div class="mb-4">
        <el-input
          v-model="inputText"
          type="textarea"
          :rows="6"
          :placeholder="t('请输入要统计词频的文本')"
          class="mb-2"
        />
        
        <div class="flex items-center gap-2 mb-2">
          <el-text>{{ t("最小单词长度：") }}</el-text>
          <el-input-number v-model="minWordLength" :min="1" :max="10" size="small" />
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="calculateFrequency">{{ t("统计词频") }}</el-button>
        <el-button @click="clearInput">{{ t("清空") }}</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div v-if="frequencyResult.length > 0" class="mb-4">
        <el-card shadow="never">
          <template #header>
            <div class="flex justify-between items-center">
              <div class="font-bold">{{ t("统计结果") }}</div>
              <el-button size="small" @click="copyResult">{{ t("复制结果") }}</el-button>
            </div>
          </template>
          
          <el-table :data="frequencyResult" style="width: 100%">
            <el-table-column prop="word" :label="t('单词')" width="200" />
            <el-table-column prop="count" :label="t('出现次数')" />
          </el-table>
        </el-card>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线词频统计工具，用于统计文本中单词出现的频率，可用于文本分析、关键词提取等场景，支持设置最小单词长度。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
