<script setup lang="ts">
import { ref, reactive } from "vue"
import  SignImageCore  from './SignImageCore.vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { UploadProps, UploadInstance, UploadRawFile, genFileId } from 'element-plus'
import { autoDown } from '@/utils/file'
import { Jh_getTimeStamp } from '@/utils/time'

// 图片处理
const info = reactive({
  title:"在线编辑图片",
  //图片地址
  previewsImgUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", 
  //获取处理完的图片
  getNewImg:(url: string) => {
    //下载
    autoDown(url, Jh_getTimeStamp() + '.png')
  },
  //用于刷新组件视图
  cKey: 1,  
})

//使用 upload ref
const upload = ref<UploadInstance>()
//使用 SignImageCore ref
const refSignImageCore = ref<any>()

//上传文件发生变化
const uploadChange: UploadProps['onChange'] = (file) => {
  //UploadFile转换url
  info.previewsImgUrl = URL.createObjectURL(file.raw!)
  // 更新组件
  info.cKey++
}

//钩子 - 文件上传超出限制
const uploadExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

//保存图片
const saveImg = () => {
  refSignImageCore.value!.save()
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="flex flex-col mb-3 h-[38rem] p-4 rounded-2xl bg-white">
      <div class="mb-3 flex flex-row-reverse">
        <!-- save -->
        <el-button type="primary" class="ml-2" @click="saveImg">保存</el-button>
        <!-- upload -->
        <el-upload
          ref="upload"
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
        ref="refSignImageCore"
        :key="info.cKey"
        :dialogVisible.sync="true" 
        :title="info.title"
        :imgUrl="info.previewsImgUrl"
        @getNewImg="info.getNewImg"
      ></SignImageCore>
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        在线图片裁剪，图片标注，图片滤镜，图片画笔、图片旋转、图片文字、图片尺寸调整等操作
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>
</style>

