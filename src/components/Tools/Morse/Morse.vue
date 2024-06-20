<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { copy } from '@/utils/string'
import { toMorse, toText } from '@/utils/morse'
const info = reactive({
  title: "摩斯电码",
  content: '支持中文的摩斯电码编码(Encode)解码(Decode)',
  tranRes: '',
})

const toEncode = () => {
  info.tranRes = toMorse(info.content)

}

const toDecode = () => {
  info. tranRes = toText(info.content)
}

const clear = () => {
  info.content = ''
  info.tranRes = ''
}

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white ">
      <div>
        <el-input type="textarea" :rows="8" v-model="info.content"></el-input>
      </div>

      <div class="mt-4">
        <el-button type="primary" @click="toEncode">摩斯编码</el-button>
        <el-button type="primary" @click="toDecode">摩斯解码</el-button>
        <el-button type="primary" @click="copyRes(info.tranRes)">复制结果</el-button>
        <el-button type="danger" @click="clear">清空内容</el-button>
      </div>

      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3">
        <el-input type="textarea" :rows="8" v-model="info.tranRes"></el-input>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        摩尔斯电码（或摩斯电码，Morse code）是一种编码系统，通过不同顺序的信号表示英文字母、数字和标点符号。由美国人艾尔菲德·维尔在协助Samuel Morse发明摩尔斯电报机（1835年）时创造。今天，国际摩尔斯电码仍在使用。
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>