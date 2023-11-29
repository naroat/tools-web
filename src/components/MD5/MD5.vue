<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import clipboard3 from 'vue-clipboard3'
import { ElMessage } from 'element-plus';
import { Md5 } from 'ts-md5'
const info = reactive({
  title: "MD5在线加密",
  encryptStr: '',
  encryptUpper32: '',
  encryptLower32: '',
  encryptUpper16: '',
  encryptLower16: '',
})

//加密
const encrypt = () => {
  info.encryptLower32 = Md5.hashStr(info.encryptStr)
  info.encryptUpper32 = info.encryptLower32.toUpperCase()
  info.encryptUpper16 = info.encryptUpper32.substring(8, 24)
  info.encryptLower16 = info.encryptLower32.substring(8, 24)
}

//清空输入框
const clear = () => {
  info.encryptStr = ''
}

const {toClipboard} = clipboard3()
const copyRes = async (resStr: string) => {
  try {
    //check
    if (resStr == '') {
      ElMessage({
        message: "无可复制内容",
        type: "warning",
        duration: 1500
      })
      return
    }
    //copy
    await toClipboard(resStr)
    ElMessage({
      message: "复制成功",
      type: "success",
      duration: 1500
    })
  } catch (error) {
    console.log("复制失败")
    console.log(error)
    ElMessage({
      message: "复制失败",
      type: "error",
      duration: 1500
    })
  }
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="">
      <div>
        <el-input v-model="info.encryptStr" :rows="5" type="textarea" placeholder="请输入加密内容"></el-input>
      </div>
      
      <div class="mt-4">
        <el-button type="primary" @click="encrypt()" >加密</el-button>
        <el-button type="primary" @click="clear()">清空输入框</el-button>
      </div>

      <div class="w-[30rem]">
        <el-input :value="info.encryptUpper32" class="mt-4" readonly>
          <template #prepend>
            <el-text>32位大写</el-text>
          </template>
          <template #append>
            <el-button @click="copyRes(info.encryptUpper32)">复制</el-button>
          </template>
        </el-input>

        <el-input :value="info.encryptLower32" class="mt-2" readonly>
          <template #prepend>
            <el-text>32位小写</el-text>
          </template>
          <template #append>
            <el-button @click="copyRes(info.encryptLower32)">复制</el-button>
          </template>
        </el-input>

        <el-input :value="info.encryptUpper16" class="mt-2" readonly>
          <template #prepend>
            <el-text>16位大写</el-text>
          </template>
          <template #append>
            <el-button @click="copyRes(info.encryptUpper16)">复制</el-button>
          </template>
        </el-input>

        <el-input :value="info.encryptLower16" class="mt-2" readonly>
          <template #prepend>
            <el-text>16位小写</el-text>
          </template>
          <template #append>
            <el-button @click="copyRes(info.encryptLower16)">复制</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>