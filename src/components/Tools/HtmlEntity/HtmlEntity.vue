<script setup lang="ts">
import { reactive,ref,onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { escape, unescape } from 'lodash';
import { copy } from '@/utils/string'
const info = reactive({
  title: "HTML实体转义",
})

const content = ref('')
const cleanContent = ref('')

const parser = (type: string) => {
  if (type == 'toHTML') {
    //转html
    cleanContent.value = unescape(content.value)
  } else {
    //转实体
    cleanContent.value = escape(content.value)
  }
}

//清空输入框
const clear = () => {
  content.value = ''
  cleanContent.value = ''
}

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}

onMounted(() => {
})

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white ">
      <div class="mb-6">
        <el-input v-model="content" :rows="10" type="textarea" placeholder="请输入内容" @change="parser"></el-input>
        <div class="mt-3">
          <el-button type="primary" @click="parser('toEntity')">HTML转实体</el-button>
          <el-button type="primary" @click="parser('toHTML')">实体转HTML</el-button>
          <el-button type="primary" @click="copy(cleanContent)">复制结果</el-button>
          <el-button type="primary" @click="clear">清除</el-button>
        </div>
      </div>

      <div>
        <el-input v-html="cleanContent" v-model="cleanContent" :rows="10" type="textarea" placeholder="" @change="parser"></el-input>
      </div>



      <!-- <el-divider content-position="left">描述</el-divider>
      <div>
        <el-text>
        </el-text>
      </div> -->
    </div>
  </div>
</template>

<style scoped>

</style>