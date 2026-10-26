<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { ArrowDown, ArrowUp, Delete } from '@element-plus/icons-vue'
import { copy } from '@/utils/string'

const title = "文本处理工作流"

// 状态管理
const inputText = ref('')
const workflowSteps = ref([
  { id: 1, type: 'trim', name: '去除首尾空格' },
  { id: 2, type: 'lowercase', name: '转为小写' }
])
const outputText = ref('')

// 可用的处理步骤类型
const availableSteps = [
  { type: 'trim', name: '去除首尾空格' },
  { type: 'lowercase', name: '转为小写' },
  { type: 'uppercase', name: '转为大写' },
  { type: 'removeEmptyLines', name: '移除空行' },
  { type: 'trimLines', name: '去除每行首尾空格' },
  { type: 'sort', name: '按字母排序' }
]

// 执行工作流
const executeWorkflow = () => {
  if (!inputText.value) {
    ElMessage.warning(t('请输入要处理的文本'))
    return
  }
  
  try {
    let result = inputText.value
    
    // 按顺序执行每个步骤
    workflowSteps.value.forEach(step => {
      result = processText(result, step.type)
    })
    
    outputText.value = result
    ElMessage.success(t('工作流执行成功'))
  } catch (error) {
    outputText.value = '执行失败'
    ElMessage.error(t('执行失败：') + error)
  }
}

// 处理文本
const processText = (text: string, type: string): string => {
  switch (type) {
    case 'trim':
      return text.trim()
    case 'lowercase':
      return text.toLowerCase()
    case 'uppercase':
      return text.toUpperCase()
    case 'removeEmptyLines':
      return text.split('\n').filter(line => line.trim() !== '').join('\n')
    case 'trimLines':
      return text.split('\n').map(line => line.trim()).join('\n')
    case 'sort':
      return text.split('\n').filter(line => line.trim() !== '').sort().join('\n')
    default:
      return text
  }
}

// 添加步骤
const addStep = (type: string, name: string) => {
  const newId = Math.max(...workflowSteps.value.map(step => step.id), 0) + 1
  workflowSteps.value.push({ id: newId, type, name })
}

// 删除步骤
const removeStep = (id: number) => {
  workflowSteps.value = workflowSteps.value.filter(step => step.id !== id)
}

// 上移步骤
const moveStepUp = (index: number) => {
  if (index > 0) {
    const temp = workflowSteps.value[index]
    workflowSteps.value[index] = workflowSteps.value[index - 1]
    workflowSteps.value[index - 1] = temp
  }
}

// 下移步骤
const moveStepDown = (index: number) => {
  if (index < workflowSteps.value.length - 1) {
    const temp = workflowSteps.value[index]
    workflowSteps.value[index] = workflowSteps.value[index + 1]
    workflowSteps.value[index + 1] = temp
  }
}

// 复制结果
const copyResult = () => {
  if (!outputText.value || outputText.value === '执行失败') {
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
          :rows="4"
          :placeholder="t('请输入要处理的文本')"
          class="mb-2"
        />
      </div>
      
      <!-- 工作流步骤 -->
      <div class="mb-4">
        <el-card class="mb-4">
          <template #header>
            <div class="flex justify-between items-center">
              <span>{{ t("工作流步骤") }}</span>
              <el-dropdown>
                <el-button type="primary" size="small">{{ t("添加步骤") }}<el-icon><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="step in availableSteps"
                      :key="step.type"
                      @click="addStep(step.type, step.name)"
                    >
                      {{ t(step.name) }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          
          <div v-if="workflowSteps.length === 0" class="text-center text-gray-500 py-4">{{ t("暂无步骤，请添加处理步骤") }}</div>
          
          <div v-else class="space-y-2">
            <div
              v-for="(step, index) in workflowSteps"
              :key="step.id"
              class="flex items-center gap-2 p-2 border rounded"
            >
              <el-button
                type="text"
                size="small"
                @click="moveStepUp(index)"
                :disabled="index === 0"
              >
                <el-icon><ArrowUp /></el-icon>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="moveStepDown(index)"
                :disabled="index === workflowSteps.length - 1"
              >
                <el-icon><ArrowDown /></el-icon>
              </el-button>
              <div class="flex-1">{{ t(step.name) }}</div>
              <el-button
                type="danger"
                size="small"
                @click="removeStep(step.id)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="executeWorkflow">{{ t("执行工作流") }}</el-button>
        <el-button @click="clearInput">{{ t("清空") }}</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div>
        <el-input
          v-model="outputText"
          type="textarea"
          :rows="4"
          :placeholder="t('处理结果')"
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
      <el-text>{{ t("在线文本处理工作流工具，允许用户定义一系列文本处理步骤并按顺序执行，可用于复杂的文本处理任务，提高工作效率。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
