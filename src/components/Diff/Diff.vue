<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { CodeDiff } from "v-code-diff";
// import { copy } from '@/utils/string'
const info = reactive({
  title: "文本对比",
  leftTxt: '旧文本',
  rightTxt: '新文本'
})

//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="">
      <div class="flex justify-between">
        <el-input type="textarea" :rows="16" v-model="info.leftTxt"></el-input>
        <el-input type="textarea" :rows="16" v-model="info.rightTxt" class="ml-3"></el-input>
      </div>
      <code-diff
        :old-string="info.leftTxt"
        :new-string="info.rightTxt"
        output-format="side-by-side"
        theme="dark"
      />
    </div>
  </div>
</template>

<style scoped>

</style>