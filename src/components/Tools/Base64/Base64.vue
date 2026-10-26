<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'

// 状态管理
const title = "Base64加解密工具"
const activeTab = ref('encode')
const encodeInput = ref('')
const encodeOutput = ref('')
const decodeInput = ref('')
const decodeOutput = ref('')

// 加密处理
const encodeText = () => {
  if (!encodeInput.value) {
    ElMessage.warning(t('请输入要加密的文本'))
    return
  }
  
  try {
    encodeOutput.value = btoa(unescape(encodeURIComponent(encodeInput.value)))
    ElMessage.success(t('加密成功'))
  } catch (error) {
    ElMessage.error(t('加密失败：') + error)
  }
}

// 解密处理
const decodeText = () => {
  if (!decodeInput.value) {
    ElMessage.warning(t('请输入要解密的Base64字符串'))
    return
  }
  
  try {
    decodeOutput.value = decodeURIComponent(escape(atob(decodeInput.value)))
    ElMessage.success(t('解密成功'))
  } catch (error) {
    ElMessage.error(t('解密失败：请输入有效的Base64字符串'))
  }
}

// 复制结果
const copyEncodeResult = () => {
  if (!encodeOutput.value) {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  copy(encodeOutput.value)
}

const copyDecodeResult = () => {
  if (!decodeOutput.value) {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  copy(decodeOutput.value)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="t('加密')" name="encode">
          <div class="mb-4">
            <el-input
              v-model="encodeInput"
              type="textarea"
              :rows="6"
              :placeholder="t('请输入要加密的文本')"
            />
          </div>
          
          <div class="mb-4">
            <el-button type="primary" @click="encodeText">{{ t("加密") }}</el-button>
          </div>
          
          <div>
            <el-input
              v-model="encodeOutput"
              type="textarea"
              :rows="6"
              :placeholder="t('加密结果')"
              readonly
            >
              <template #append>
                <el-button @click="copyEncodeResult">{{ t("复制") }}</el-button>
              </template>
            </el-input>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="t('解密')" name="decode">
          <div class="mb-4">
            <el-input
              v-model="decodeInput"
              type="textarea"
              :rows="6"
              :placeholder="t('请输入要解密的Base64字符串')"
            />
          </div>
          
          <div class="mb-4">
            <el-button type="primary" @click="decodeText">{{ t("解密") }}</el-button>
          </div>
          
          <div>
            <el-input
              v-model="decodeOutput"
              type="textarea"
              :rows="6"
              :placeholder="t('解密结果')"
              readonly
            >
              <template #append>
                <el-button @click="copyDecodeResult">{{ t("复制") }}</el-button>
              </template>
            </el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线Base64加解密工具，支持文本的Base64编码和解码，可用于URL编码、数据传输等场景。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
