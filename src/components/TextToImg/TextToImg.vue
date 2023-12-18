<script setup lang="ts">
import { reactive, ref, shallowRef, onBeforeUnmount } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import html2canvas from "html2canvas";
import '@wangeditor/editor/dist/css/style.css' // 引入富文本 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'  //富文本组件
// import { copy } from '@/utils/string'
const info = reactive({
  title: "文本转图片",
  mode: 'default',
  convasWidth: 860,
  convasBackgroundColor: '#fff',
  downExt: '.png',
  downExts: [
    {
      value: '.png',
      label: '.png'
    },
    {
      value: '.jpg',
      label: '.jpg'
    },
  ]
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(`文字转图片演示😀
拥有丰富的样式选择
可自由调整宽度背景色
支持一键导出为长图
`)

// 绑定  需要把那个内容生成图片
const  poster  = ref();

// 工具栏配置
const toolbarConfig = {
  excludeKeys: [
    "uploadImage",
    "group-video",
    "insertLink",
  ]
}

//编辑器配置
const editorConfig = { placeholder: '请输入内容...' }

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const goDown =() => {
  html2canvas(poster.value, {
      backgroundColor: info.convasBackgroundColor,//海报的背景颜色
      useCORS: true, // 允许跨域 
      width: info.convasWidth, //生成海报的w
    }).then(canvas=>{
      // canvas 其实就是我们所讲的res 的意思 返回报文的意思
      let  baseImg = canvas.toDataURL("image/png");
      if (info.downExt == '.jpg') {
        baseImg = canvas.toDataURL("image/jpg");
      }
      //创建a标签
      let save  = document.createElement('a');
      // <a href=''></a>
      save.href = baseImg;
      // 下载的名字
      save.download = 'yz'
      // 直接回调a的点击事件
      save.click()
  })
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
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
      <div>
        <div class="">
          
          <div class="flex items-center">
            <el-text class="w-20">宽度：</el-text>
            <el-slider v-model="info.convasWidth" show-input size="large" :min="260" :max="1920"/>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between">
          <div class="">
            <el-text>背景颜色：</el-text>
            <el-color-picker v-model="info.convasBackgroundColor" size="large" />
          </div>
          <div>
            <el-select v-model="info.downExt" class="" placeholder="Select">
              <el-option
                v-for="item in info.downExts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" class="ml-2"  @click="goDown">下载</el-button> 
          </div>
        </div>
      </div>
      <div class="border relative z-10 mt-3">
        <Toolbar
          class="border-b"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="info.mode"
        />
        <Editor
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="info.mode"
          @onCreated="handleCreated"
        />
        <div ref="poster" class="absolute top-0 -z-10" v-html="valueHtml"></div>
      </div>

      <!-- v-html="valueHtml" -->
    </div>
  </div>
</template>

<style scoped>
</style>