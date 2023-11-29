<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { useToolsStore } from '@/store/modules/tools'
import { ElMessageBox } from 'element-plus'

const appName = ref(import.meta.env.VITE_APP_TITLE || '工具坊')
const appNet = ref('tools.ranblogs.com')
//store
const toolsStore = useToolsStore()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: ''
})
//获取分类
const getToolCates = async () => {
  try {
    await toolsStore.getToolCate()
  } catch (error) {
    console.log(error)
  }
}

//search
const search = async () => {
  try {
    await toolsStore.getTools(searchParam)
  } catch (error) {
    console.log(error)
  }
}

//选择分类
const chooseCate = (cateId: number) => {
  searchParam.cateId = cateId
  search()
}

//收藏
const collect = () => {
  ElMessageBox({
    title: '提示',
    message: '请使用快捷键`Ctrl+D`进行收藏'
  })
}

onMounted(() => {
  getToolCates()
})
</script>

<template>
  <header class="">
    <nav class="h-28 w-full leading-10 flex flex-col justify-between pt-2 pb-2">
      <el-row>
        <el-col :xl="4" :md="1"></el-col>
        <el-col :xl="16" :md="22">
          <div class="flex items-center justify-between">
            <!-- left -->
            <router-link class="ml-4 flex flex-row" to="/">
              <img class="h-10 w-auto rounded-lg lg:h-16 mr-2 mt-auto mb-auto" src="@/assets/logo.png" :alt="appNet">
              <div class="flex flex-col  mt-auto mb-auto">
                <div class="text-xl">{{ appName }}</div>
                <div class="text-sm text-gray-500">{{ appNet }}</div>
              </div>
            </router-link>

            <!-- right -->
            <div class=" w-full md:w-auto flex hidden md:block">
              <ul class="flex mt-4 flex-col md:flex-row md:mt-0 justify-end items-center">
                <li class="hover:text-blue-500">
                  <el-button link size="large" @click="collect">收藏本站</el-button>
                </li>
                <li class="ml-3 hover:text-blue-500">
                  <!-- <el-button round>登录/注册</el-button> -->
                </li>
              </ul>
            </div>
          </div>
          
          <el-row class="mt-3">
            <el-col :xl="19" :md="19">
              <!-- cates -->
              <div class="mr-3">
                <ul class="flex bg-gray-100  h-10 rounded leading-10 pl-3">
                  <li v-for="(item, index) in toolsStore.cates" :key="index" class="flex items-center">
                    <el-text>{{ index != 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '' }} </el-text>
                    <div 
                      class="hover:text-blue-400 hover:underline hover:decoration-2 hover:underline-offset-[6px] text-sm" :class="searchParam.cateId == item.id ? 'text-blue-400 underline decoration-2 underline-offset-[6px]' : ''"
                      @click="chooseCate(item.id)"
                    >{{ item.value }}</div>
                  </li>
                </ul>
              </div> 
            </el-col>
            <el-col :xl="5" :md="5">
              <!-- search -->
              <div>
                <el-input 
                  v-model="searchParam.title" 
                  placeholder="搜索工具" 
                  class="w-full max-w-xl h-10" 
                  @keyup.enter.native="search">
                  <template #append>
                    <el-button :icon="Search" @click="search"/>
                  </template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xl="4" :md="1" class="flex"></el-col>
      </el-row>
    </nav>
  </header>
</template>

<style scoped>
</style>