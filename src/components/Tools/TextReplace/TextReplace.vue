<script setup lang="ts">
import { t } from '@/i18n'

import { ref, computed } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'

const title = "文本替换"

// 状态管理
const inputText = ref('')
const findText = ref('')
const replaceText = ref('')
const useRegex = ref(false)
const caseSensitive = ref(true)

// 替换结果
const replaceResult = computed(() => {
  if (!inputText.value) return ''
  if (!findText.value) return inputText.value
  
  try {
    if (useRegex.value) {
      // 使用正则表达式替换
      const regex = new RegExp(findText.value, caseSensitive.value ? 'g' : 'gi')
      return inputText.value.replace(regex, replaceText.value)
    } else {
      // 使用普通文本替换
      if (caseSensitive.value) {
        return inputText.value.replace(new RegExp(findText.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceText.value)
      } else {
        return inputText.value.replace(new RegExp(findText.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), replaceText.value)
      }
    }
  } catch (error) {
    return '替换失败：正则表达式语法错误'
  }
})

// 复制结果
const copyResult = () => {
  if (!replaceResult.value || replaceResult.value === '替换失败：正则表达式语法错误') {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  copy(replaceResult.value)
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
  findText.value = ''
  replaceText.value = ''
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
          :placeholder="t('请输入要处理的文本')"
          class="mb-2"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <el-input
              v-model="findText"
              :placeholder="t('请输入要查找的文本')"
              class="mb-2"
            />
          </div>
          <div>
            <el-input
              v-model="replaceText"
              :placeholder="t('请输入要替换的文本')"
              class="mb-2"
            />
          </div>
        </div>
        
        <div class="flex items-center gap-4 mb-2">
          <el-checkbox v-model="useRegex">{{ t("使用正则表达式") }}</el-checkbox>
          <el-checkbox v-model="caseSensitive">{{ t("区分大小写") }}</el-checkbox>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button @click="copyResult">{{ t("复制结果") }}</el-button>
        <el-button @click="clearInput">{{ t("清空") }}</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div>
        <el-input
          :value="replaceResult"
          type="textarea"
          :rows="6"
          :placeholder="t('替换结果')"
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
      <el-text>{{ t("在线文本替换工具，支持普通文本和正则表达式替换，可用于批量修改文本内容，支持区分大小写选项。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
