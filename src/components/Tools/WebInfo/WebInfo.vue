<script setup lang="ts">
import { ref, reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
// import { copy } from '@/utils/string'
import { Jh_getTimeStamp } from '@/utils/time'
import { isUrl } from '@/utils/url'
import { autoDown, getFileExtension } from '@/utils/file'
import { useToolsStore } from '@/store/modules/tools'
import { ElMessage } from 'element-plus'
const info = reactive({
  title: "网站favicon获取",
})

//store
const toolsStore = useToolsStore()

const searchUrl = ref()

const getWebInfo = async () => {
  try {
    if (isUrl(searchUrl.value)) {
      //有效的域名
      if (!searchUrl.value.includes('http://') && !searchUrl.value.includes('https://')) {
        searchUrl.value = 'http://' + searchUrl.value;
      }
      const urlObj = new URL(searchUrl.value)
      // webInfo.link = urlObj.hostname
      searchUrl.value = urlObj.hostname

      await toolsStore.getWebInfo({
        link: searchUrl.value
      })
    } else {
      //无效的域名
      ElMessage({
        message: "无效的域名或地址",
        type: "error",
        duration: 1500
      })
    }
  } catch (error) {
    console.error('Error fetching site info:', error);  
  }  
};

const down = () => {
  autoDown(toolsStore.webInfo.logo, Jh_getTimeStamp() + '.' + getFileExtension(toolsStore.webInfo.logo))
}

//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div>
        <el-input
          v-model="searchUrl"
          style="max-width: 600px"
          placeholder="请输入域名或地址"
          class="input-with-select"
          size="large"
        >
          <template #append>
            <el-button type="primary" @click="getWebInfo">获取</el-button>
          </template>
        </el-input>
      </div>
      <div>
        <ul>
          <li class="mt-3">
            <el-text><b>域名: </b></el-text>
            <el-link :href="'https://' + searchUrl" type="primary" target="_blank">{{ searchUrl }}</el-link>
          </li>
          <li class="mt-3 flex">
            <el-text><b>logo: </b></el-text>
            <div v-if="toolsStore.webInfo.logo" class="ml-2 flex items-center">
              <el-image :src="toolsStore.webInfo.logo" class="h-12"></el-image>
              <el-button class="ml-3" link type="primary" @click="down">下载</el-button>
            </div>
          </li>
          <li class="mt-3 flex">
            <el-text><b>标题: </b>{{ toolsStore.webInfo.title }}</el-text>
          </li>
          <li class="mt-3 flex">
            <el-text><b>关键词: </b> {{ toolsStore.webInfo.keywords }}</el-text>
          </li>
          <li class="mt-3 flex">
            <el-text><b>描述: </b> {{ toolsStore.webInfo.desc }}</el-text>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>