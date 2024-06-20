<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
const info = reactive({
  title: "在线字数统计",
  content: '',
  tranRes: '',
  chinaCharNum: 0,
  letterNum: 0,
  punctuationHalfNum: 0,
  punctuationFullNum: 0,
  numberNum: 0,
  emptyNum: 0,
  sum: 0,
})

//内容发生变化，重新统计
const changeContent = () => {
  //汉字
  info.chinaCharNum = (info.content.match(/[\u4e00-\u9fa5]/g) || []).length;
  //字母
  info.letterNum = (info.content.match(/[a-zA-Z]/g) || []).length;
  //符号 - 半角
  info.punctuationHalfNum = (info.content.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g) || []).length;
  //符号 - 全角
  info.punctuationFullNum = (info.content.match(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g) || []).length;
  //数字
  info.numberNum = (info.content.match(/[\d+]/g) || []).length;
  //空白字符
  info.emptyNum = (info.content.match(/[\s*]/g) || []).length;
  //合计
  info.sum = info.chinaCharNum + info.letterNum + info.punctuationHalfNum + info.punctuationFullNum + info.numberNum + info.emptyNum;
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div>
        <el-input type="textarea" :rows="16" v-model="info.content" @input="changeContent"></el-input>
      </div>
      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3 flex">
        <div><el-text>总字数：{{ info.sum }}</el-text></div>
        <div class="ml-3"><el-text>汉字：{{ info.chinaCharNum }}</el-text></div>
        <div class="ml-3"><el-text>字母：{{ info.letterNum }}</el-text></div>
        <div class="ml-3"><el-text>数字：{{ info.numberNum }}</el-text></div>
        <div class="ml-3"><el-text>标点符号半角：{{ info.punctuationHalfNum }}</el-text></div>
        <div class="ml-3"><el-text>标点符号全角：{{ info.punctuationFullNum }}</el-text></div>
        <div class="ml-3"><el-text>空白字符：{{ info.emptyNum }}</el-text></div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        在线统计字数、汉字、标点、数字、字母、字符
      </el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>
</style>