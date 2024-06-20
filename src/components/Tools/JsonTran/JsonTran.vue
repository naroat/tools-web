<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { transferred, copy } from '@/utils/string';
import { Codemirror } from "vue-codemirror";
import { json } from '@codemirror/lang-json';
import '@codemirror/search';
import '@codemirror/state';
import '@codemirror/commands';
// import { syntaxTree } from '@codemirror/language';
// import { linter, Diagnostic } from '@codemirror/lint';

// const regexpLinter = linter(view => {
//   let diagnostics: Diagnostic[] = []
//   syntaxTree(view.state).cursor().iterate(node => {
//     if (node.name == "number") diagnostics.push({
//       from: node.from,
//       to: node.to,
//       severity: "warning",
//       message: "Regular expressions are FORBIDDEN",
//       actions: [{
//         name: "Remove",
//         apply(view, from, to) { view.dispatch({changes: {from, to}}) }
//       }]
//     })
//   })
//   return diagnostics
// })

const info = reactive({
  title: "Json在线转换",
  code: '',
  extensions: [json()],  //[json(), lineNumbers()],
  isParseErr: false,
  parseErr: ''
})


//格式化json
const formatJson = () => {
  try {
    //初始化错误信息
    info.isParseErr = false;
    info.parseErr = ''
    // 1、JSON.parse：把JSON字符串转换为JSON对象
    // 2、JSON.stringify：把JSON对象 转换为 有缩进的 JSON字符串格式
    info.code = JSON.stringify(JSON.parse(info.code), null, '\t');
  } catch(error) {
    info.isParseErr = true;
    // info.parseErr = (error as Error).message
    info.parseErr = '无效的JSON'
  }
}

//压缩
const compress = () => {
  info.code = info.code.replace(/[\r\n\t]/g, "")
}

//转义
const tran = () => {
  info.code = transferred(info.code, "\"")
}

//去转义
const unTransferred = () => {
  info.code = info.code.replace(/[\\]/g, ``)
}

//清空输入框
const clear = () => {
  info.code = ''
}

const copyRes = async () => {
  copy(info.code)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white ">
      
      <div>
        <!-- 
          tabSize: tab键前进的个数
          style： 自定义样式
          autofocus： 挂载后立即聚焦在编辑器
          indent-with-tab：绑定键盘tab事件
          extensions： 扩展，传数组
          
          @ready="console.log('ready', $event)"
          @change="console.log('change', $event)"
          @focus="console.log('focus', $event)"
          @blur="console.log('blur', $event)"
         -->
        <codemirror
          v-model="info.code"
          placeholder="这里是代码..."
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true" 
          :tabSize="2"
          :extensions="info.extensions"
        />
      </div>
      
      <div class="mt-4">
        <el-button type="primary" @click="formatJson">校验/格式化</el-button>
        <el-button type="primary" @click="compress">压缩</el-button>
        <el-button type="primary" @click="tran">转义</el-button>
        <el-button type="primary" @click="unTransferred">去转义</el-button>
        <!-- <el-button type="primary">unicode转中文</el-button> -->
        <!-- <el-button type="primary">中文转unicode</el-button> -->
        <el-button type="primary" @click="copyRes">复制</el-button>
        <el-button type="primary" @click="clear">清空</el-button>
      </div>

      <div class="mt-3 min-h-md bg-red-100 p-3 mb-3" v-show="info.isParseErr">
        <el-text type="danger">{{ info.parseErr }}</el-text>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。它基于JavaScript的一个子集，但与语言无关，因此在多种编程环境中广泛使用。JSON格式易于人阅读和编写，同时也易于机器解析和生成。它通常用于网络应用程序中服务器与客户端之间的数据传输。<br>
        JSON 工具提供实时编辑和预览JSON 数据，语法高亮、校验、格式化、转义，去转义、压缩等功能，可以提高阅读修改的效率和准确性
      </el-text> 
    </ToolDetail>
  </div>
</template>

<style scoped>
</style>