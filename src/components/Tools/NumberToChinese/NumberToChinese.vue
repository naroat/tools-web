<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { copy, numberToChinese } from '@/utils/string'
const info = reactive({
  title: "数字转金额大写",
  content: '',
  tranRes: '',
})

const tran = () => {
  //数字转中文
  info.tranRes = numberToChinese(parseInt(info.content))
}

const clear = () => {
  info.content = ''
  info.tranRes = ''
}

const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div>
        <el-input type="number" v-model="info.content" placeholder="请输入数字，最高13位数字"></el-input>
      </div>

      <div class="mt-4">
        <el-button type="primary" @click="tran">数字转中文大写</el-button>
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
        可以将阿拉伯数字金额转换为中文大写金额的在线工具;用户输入阿拉伯数字金额，如100，会立即转换成“壹佰”的中文
      </el-text> 
    </ToolDetail>
  </div>
</template>

<style scoped>

</style>