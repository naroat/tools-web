<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'
import { format } from 'sql-formatter'

const title = "SQL格式化"

// 状态管理
const inputText = ref('')
const outputText = ref('')
const indentSize = ref(4)

// 格式化SQL
const formatSql = () => {
  if (!inputText.value) {
    ElMessage.warning(t('请输入要格式化的SQL'))
    return
  }
  
  try {
    // 使用sql-formatter库格式化SQL
    const formatted = format(inputText.value)
    outputText.value = formatted
    ElMessage.success(t('格式化成功'))
  } catch (error) {
    outputText.value = '格式化失败'
    ElMessage.error(t('格式化失败：') + error)
  }
}

// 压缩SQL
const minifySql = () => {
  if (!inputText.value) {
    ElMessage.warning(t('请输入要压缩的SQL'))
    return
  }
  
  try {
    // 压缩SQL（去除空格和换行）
    const minified = inputText.value
      .replace(/\s+/g, ' ') // 替换多个空白字符为单个空格
      .trim()
    
    outputText.value = minified
    ElMessage.success(t('压缩成功'))
  } catch (error) {
    outputText.value = '压缩失败'
    ElMessage.error(t('压缩失败：') + error)
  }
}



// 复制结果
const copyResult = () => {
  if (!outputText.value || outputText.value === '格式化失败' || outputText.value === '压缩失败') {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  copy(outputText.value)
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
  outputText.value = ''
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
          :placeholder="t('请输入要格式化的SQL')"
          class="mb-2"
        />
        
        <div class="flex items-center gap-2 mb-2">
          <el-text>{{ t("缩进大小：") }}</el-text>
          <el-input-number v-model="indentSize" :min="1" :max="8" size="small" />
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="formatSql">{{ t("格式化") }}</el-button>
        <el-button type="success" @click="minifySql">{{ t("压缩") }}</el-button>
        <el-button @click="clearInput">{{ t("清空") }}</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div>
        <el-input
          v-model="outputText"
          type="textarea"
          :rows="6"
          :placeholder="t('格式化结果')"
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
      <el-text>{{ t("在线SQL格式化工具，用于美化和压缩SQL代码，支持自定义缩进大小，使SQL代码更易于阅读和维护。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
