<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { copy } from '@/utils/string';
import { Codemirror } from "vue-codemirror";
import '@codemirror/search';
import '@codemirror/state';
import '@codemirror/commands';
import * as prettier from "prettier/standalone";
import * as parserHtml from 'prettier/parser-html';
import { ElMessage } from 'element-plus';

const info = reactive({
  title: "html格式化/压缩",
  code: '',
  isParseErr: false,
  parseErr: '',
})

//格式化
const formatCode = async () => {
  try {
    info.code = await prettier.format(info.code, { parser: "html", plugins: [parserHtml]})
  } catch (error) {
    ElMessage({
      showClose: true,
      message: '请填入正确代码格式',
      type: 'error',
    })
  }
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
        <codemirror
          v-model="info.code"
          placeholder="这里是代码..."
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true" 
          :tabSize="2"
        />
      </div>
      
      <div class="mt-4">
        <el-button type="primary" @click="formatCode">格式化</el-button>
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
        提供在线html、xml格式化
      </el-text> 
    </ToolDetail>
  </div>
</template>

<style scoped>
</style>