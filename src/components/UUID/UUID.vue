<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy } from '@/utils/string'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
const info = reactive({
  title: "UUID生成器",
  resStr: '',
  pwNum: 1,
  autosize: {
    minRows: 5
  },
})

//生成
const gen = () => {
  //生成数量验证
  if (info.pwNum > 100) {
    ElMessage({
      message: "生成数量范围在1~100",
      type: "warning",
      duration: 1500
    })
    return
  }
  //清空旧数据
  info.resStr = ''

  //按数量生成密码
  for (let i = 1; i <= info.pwNum; i++) {
    let ext = '\n'
    if (i == info.pwNum) {
      ext = ''
    }
    info.resStr += uuidv4() + ext
  }
}

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div>
        <el-input v-model="info.pwNum" placeholder="范围1~100" class="" max="100" type="number">
          <template #prepend>生成数量:</template>
        </el-input>
      </div>
      <div class="mt-3 mb-3">
        <el-button type="primary" @click="gen">生成UUID</el-button>
        <el-button type="primary" @click="copyRes(info.resStr)">复制全部</el-button>
      </div>
      <!-- res -->
      <div>
        <el-input type="textarea" :autosize="info.autosize" v-model="info.resStr"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>