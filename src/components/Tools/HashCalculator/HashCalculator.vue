<script setup lang="ts">
import { t } from '@/i18n'

import { ref, watch, computed } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'
import { Md5 } from 'ts-md5'
import CryptoJS from 'crypto-js'

const title = "Hash计算器"

// 状态管理
const inputText = ref('')
const algorithm = ref('MD5')
const key = ref('')
const hashResult = ref('')

// 计算属性：是否是Hmac算法
const isHmacAlgorithm = computed(() => {
  return algorithm.value.startsWith('HMAC-')
})

// 哈希算法选项
const algorithmOptions = [
  { label: 'MD5', value: 'MD5' },
  { label: 'SHA-1', value: 'SHA-1' },
  { label: 'SHA-256', value: 'SHA-256' },
  { label: 'SHA-384', value: 'SHA-384' },
  { label: 'SHA-512', value: 'SHA-512' },
  { label: 'Hmac-MD5', value: 'HMAC-MD5' },
  { label: 'Hmac-SHA1', value: 'HMAC-SHA1' },
  { label: 'Hmac-SHA256', value: 'HMAC-SHA256' },
  { label: 'Hmac-SHA384', value: 'HMAC-SHA384' },
  { label: 'Hmac-SHA512', value: 'HMAC-SHA512' }
]

// 监听输入变化，自动计算哈希
watch([inputText, algorithm, key], async () => {
  if (!inputText.value) {
    hashResult.value = ''
    return
  }
  
  try {
    if (algorithm.value === 'MD5') {
      // 计算MD5
      hashResult.value = Md5.hashStr(inputText.value)
    } else if (algorithm.value.startsWith('HMAC-')) {
      // 处理Hmac算法
      if (!key.value) {
        hashResult.value = '请输入Hmac密钥'
        return
      }
      
      // 提取Hmac算法中的哈希算法部分
      const hashAlgorithm = algorithm.value.replace('HMAC-', '')
      
      if (hashAlgorithm === 'MD5') {
        // 使用crypto-js计算Hmac-MD5
        try {
          const hmac = CryptoJS.HmacMD5(inputText.value, key.value)
          hashResult.value = hmac.toString()
        } catch (error) {
          console.error('Hmac-MD5计算失败:', error)
          hashResult.value = '计算失败'
        }
      } else {
        // 处理其他Hmac算法
        // 转换为Web Crypto API支持的标准格式
        let standardHashAlgorithm
        switch (hashAlgorithm) {
          case 'SHA1':
            standardHashAlgorithm = 'SHA-1'
            break
          case 'SHA256':
            standardHashAlgorithm = 'SHA-256'
            break
          case 'SHA384':
            standardHashAlgorithm = 'SHA-384'
            break
          case 'SHA512':
            standardHashAlgorithm = 'SHA-512'
            break
          default:
            standardHashAlgorithm = hashAlgorithm
        }
        
        try {
          const encoder = new TextEncoder()
          const data = encoder.encode(inputText.value)
          const keyData = encoder.encode(key.value)
          
          // 创建密钥
          const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: standardHashAlgorithm },
            false,
            ['sign']
          )
          
          // 计算Hmac
          const hmacBuffer = await crypto.subtle.sign('HMAC', cryptoKey, data)
          const hmacArray = Array.from(new Uint8Array(hmacBuffer))
          const hmacHex = hmacArray.map(b => b.toString(16).padStart(2, '0')).join('')
          
          hashResult.value = hmacHex
        } catch (error) {
          console.error('Hmac计算失败:', error)
          hashResult.value = '计算失败'
        }
      }
    } else {
      // 使用Web Crypto API计算其他哈希
      const encoder = new TextEncoder()
      const data = encoder.encode(inputText.value)
      const hashBuffer = await crypto.subtle.digest(algorithm.value, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      
      hashResult.value = hashHex
    }
  } catch (error) {
    console.error('计算失败:', error)
    hashResult.value = '计算失败'
  }
}, { immediate: true })

// 计算哈希
const calculateHash = async () => {
  // 由于我们已经在watch中自动计算了哈希，这里只需要显示成功消息
  if (!inputText.value) {
    ElMessage.warning(t('请输入要计算哈希的文本'))
    return
  }
  
  if (algorithm.value.startsWith('HMAC-') && !key.value) {
    ElMessage.warning(t('请输入Hmac密钥'))
    return
  }
  
  ElMessage.success(t('计算成功'))
}

// 复制结果
const copyResult = () => {
  if (!hashResult.value || hashResult.value === '计算失败' || hashResult.value === '请输入Hmac密钥') {
    ElMessage.warning(t('没有可复制的内容'))
    return
  }
  
  copy(hashResult.value)
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
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
          :placeholder="t('请输入要计算哈希的文本')"
          class="mb-2"
        />
        
        <div class="flex items-center gap-2 mb-2">
          <el-text>{{ t("哈希算法：") }}</el-text>
          <el-select v-model="algorithm" style="width: 150px;">
            <el-option
              v-for="option in algorithmOptions"
              :key="option.value"
              :label="t(option.label)"
              :value="option.value"
            />
          </el-select>
        </div>
        
        <!-- 密钥输入（仅Hmac算法需要） -->
        <div class="flex items-center gap-2 mb-2" v-if="isHmacAlgorithm">
          <el-text>{{ t("密钥(HMAC算法必填)：") }}</el-text>
          <el-input
            v-model="key"
            :placeholder="t('请输入Hmac密钥')"
            style="width: 500px;"
          />
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="calculateHash">{{ t("计算哈希") }}</el-button>
        <el-button @click="copyResult">{{ t("复制结果") }}</el-button>
        <el-button @click="clearInput">{{ t("清空") }}</el-button>
      </div>
      
      <!-- 结果部分 -->
      <div>
        <el-input
          :value="hashResult"
          type="textarea"
          :rows="2"
          :placeholder="t('哈希结果')"
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
      <el-text>{{ t("在线Hash计算器，支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法，以及Hmac-MD5、Hmac-SHA1、Hmac-SHA256、Hmac-SHA384、Hmac-SHA512等Hmac算法，可用于数据完整性验证、密码加密等场景。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>
