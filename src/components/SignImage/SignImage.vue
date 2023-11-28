<script setup lang="ts">
import { ref, reactive } from "vue"
import  SignImageCore  from './SignImageCore.vue'
import { Back } from '@element-plus/icons-vue'
import { UploadProps, UploadInstance, UploadRawFile, genFileId } from 'element-plus'

// 图片处理
// const newImg = ref("")
const info = reactive({
  title:"在线编辑图片", // 弹框标题
  previewsImgUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //图片地址
  //获取处理完的图片
  getNewImg:(val: string) => {
    console.log('getNewImg:' + val)
    //newImg.value = window.serverUrl.IMG_SERVER + val
  },
  cKey: 1,  //用于刷新组件视图
})

//使用 upload ref
const refSignImageCore = ref<UploadInstance>()

//上传文件发生变化
const uploadChange: UploadProps['onChange'] = (file) => {
  //UploadFile转换url
  info.previewsImgUrl = URL.createObjectURL(file.raw!)
  // 更新组件
  info.cKey++
}

//钩子 - 文件上传超出限制
const uploadExceed: UploadProps['onExceed'] = (files) => {
  refSignImageCore.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  refSignImageCore.value!.handleStart(file)
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <div class="text-gray-600">
      <a href="/" class="flex items-center">
        <el-icon color="blue"><Back /></el-icon>
        <div>返回首页</div>
      </a>
    </div>

    <div class="text-xl mt-5 mb-5">
      {{ info.title }}
    </div>

    <div class="flex flex-col mb-3 h-[38rem]">
      <div class="mb-3 flex flex-row-reverse">
        <!-- save -->
        <el-button type="primary" class="ml-2">保存</el-button>
        <!-- upload -->
        <el-upload
          ref="refSignImageCore"
          :limit="1"
          @exceed="uploadExceed"
          accept="image/*"
          @change="uploadChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <template #trigger>
            <el-button type="primary">选择图片</el-button>
          </template>
        </el-upload>
      </div>
      <!-- 图片处理框 -->
      <SignImageCore 
        :key="info.cKey"
        :dialogVisible.sync="true" 
        :title="info.title"
        :imgUrl="info.previewsImgUrl"
        @getNewImg="info.getNewImg"
      ></SignImageCore>
    </div>
  </div>
</template>

<style scoped>
</style>

