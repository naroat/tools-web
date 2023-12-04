<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy } from '@/utils/string'

const info = reactive({
  title: "URL编码/解码",
  content: '',
  tranRes: '',
})


//编码
const toEncode = () => {
  info.tranRes = ''
  info.tranRes = encodeURIComponent(info.content)
}

//解码
const toDecode = () => {
  info.tranRes = ''
  info.tranRes = decodeURIComponent(info.content)
}

//clear
const clear = () => {
  info.content = ''
  info.tranRes = ''
}

//copy
const copyRes = async () => {
  copy(info.tranRes)
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <DetailHeader :title="info.title"></DetailHeader>

    <div>
      <div>
        <el-input type="textarea" :rows="8" v-model="info.content"></el-input>
      </div>

      <div class="mt-4">
        <el-button type="primary" @click="toEncode">UrlEncode编码</el-button>
        <el-button type="primary" @click="toDecode">UrlDecode解码</el-button>
        <el-button type="primary" @click="copyRes">复制结果</el-button>
        <el-button type="danger" @click="clear">清空内容</el-button>
      </div>

      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3">
        <el-input type="textarea" :rows="8" v-model="info.tranRes"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>