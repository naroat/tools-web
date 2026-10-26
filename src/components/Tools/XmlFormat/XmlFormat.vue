<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'

const title = "XML格式化"

// 状态管理
const inputText = ref('')
const outputText = ref('')
const indentSize = ref(4)

// 格式化XML
const formatXml = () => {
  if (!inputText.value) {
    ElMessage.warning(t('请输入要格式化的XML文本'))
    return
  }
  
  try {
    // 使用DOMParser解析XML
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(inputText.value, 'text/xml')
    
    // 检查解析是否成功
    const errorNode = xmlDoc.querySelector('parsererror')
    if (errorNode) {
      throw new Error('XML解析错误: ' + errorNode.textContent)
    }
    
    // 格式化XML
    const formatted = formatXmlNode(xmlDoc.documentElement, 0)
    outputText.value = formatted
    ElMessage.success(t('格式化成功'))
  } catch (error) {
    outputText.value = '格式化失败'
    ElMessage.error(t('格式化失败：') + error)
  }
}

// 递归格式化XML节点
const formatXmlNode = (node: Node, indent: number): string => {
  const indentStr = ' '.repeat(indent * indentSize.value)
  let result = ''
  
  if (node.nodeType === Node.ELEMENT_NODE) {
    result += `${indentStr}<${node.nodeName}`
    
    // 处理属性
    if ((node as Element).attributes && (node as Element).attributes.length > 0) {
      for (let i = 0; i < (node as Element).attributes.length; i++) {
        const attr = (node as Element).attributes[i]
        result += ` ${attr.name}="${attr.value}"`
      }
    }
    
    if (node.childNodes.length === 0) {
      // 空标签
      result += '/>\n'
    } else {
      result += '>\n'
      
      // 处理子节点
      for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i]
        if (childNode.nodeType === Node.TEXT_NODE && childNode.textContent?.trim() === '') {
          // 跳过空白文本节点
          continue
        }
        result += formatXmlNode(childNode, indent + 1)
      }
      
      result += `${indentStr}</${node.nodeName}>\n`
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim()
    if (text) {
      result += `${indentStr}${text}\n`
    }
  } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
    result += `${indentStr}<![CDATA[${node.textContent}]]>\n`
  } else if (node.nodeType === Node.COMMENT_NODE) {
    result += `${indentStr}<!--${node.textContent}-->\n`
  }
  
  return result
}

// 压缩XML
const minifyXml = () => {
  if (!inputText.value) {
    ElMessage.warning(t('请输入要压缩的XML文本'))
    return
  }
  
  try {
    // 压缩XML（去除空格和换行）
    const minified = inputText.value
      .replace(/\s+/g, ' ') // 替换多个空白字符为单个空格
      .replace(/\s*<\s*/g, '<') // 去除标签周围的空格
      .replace(/\s*>\s*/g, '>') // 去除标签周围的空格
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
          :placeholder="t('请输入要格式化的XML文本')"
          class="mb-2"
        />
        
        <div class="flex items-center gap-2 mb-2">
          <el-text>{{ t("缩进大小：") }}</el-text>
          <el-input-number v-model="indentSize" :min="1" :max="8" size="small" />
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="formatXml">{{ t("格式化") }}</el-button>
        <el-button type="success" @click="minifyXml">{{ t("压缩") }}</el-button>
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
      <el-text>{{ t("在线XML格式化工具，用于美化和压缩XML代码，支持自定义缩进大小，使XML代码更易于阅读和维护。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
