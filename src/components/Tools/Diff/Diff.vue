<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
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
  <div class="flex flex-col mt-3 flex-1">
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

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        在线文本差异比对支持中文、英文、代码比对，不限制字数轻松比对文本。
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>