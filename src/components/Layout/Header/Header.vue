<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search,MoreFilled } from '@element-plus/icons-vue';
import { useToolsStore } from '@/store/modules/tools'
import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/display.css'

const appName = ref(import.meta.env.VITE_APP_TITLE || '工具坊')
const appNet = ref('tools.ranblogs.com')
const isNavDrawer = ref(false)
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
    <nav class="h-28 w-full leading-10 flex flex-col justify-between pt-2 pb-2 c-xs:h-16 c-xs:border-b-[1px]">
      <el-row>
        <el-col :xl="4" :lg="3" :sm="1"></el-col>
        <el-col :xl="16" :lg="18" :sm="22">
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
            <div class=" w-full md:w-auto flex c-xs:hidden md:block">
              <ul class="flex mt-4 flex-col md:flex-row md:mt-0 justify-end items-center">
                <li class="hover:text-blue-500">
                  <el-button link size="large" @click="collect">收藏本站</el-button>
                </li>
                <li class="ml-3 hover:text-blue-500">
                  <!-- <el-button round>登录/注册</el-button> -->
                </li>
              </ul>
            </div>

            <!-- h5: 搜索、导航 -->
            <div class="c-lg:hidden c-sm:hidden">
              <div class="mr-3 leading-3">
                <!-- <el-icon size="25"><Search /></el-icon> -->
                <el-icon size="25" class="ml-2" style="transform:rotate(90deg)" @click="isNavDrawer == false ? isNavDrawer = true : isNavDrawer = false"><MoreFilled /></el-icon>
              </div>
              <!-- 抽屉 -->
              <el-drawer v-model="isNavDrawer" direction="rtl" class="" size="70%">
                <div>
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
                  <!-- cates -->
                  <div class="mt-3 text-center">
                    <ul class="flex flex-col rounded items-center">
                      <li class="flex items-center w-full text-center mb-2">
                        <div 
                          class="hover:text-blue-400 text-xl w-full hover:bg-gray-200 hover:rounded-md h-10 leading-10" :class="searchParam.cateId == 0 ? 'text-blue-400 bg-gray-200 rounded-md' : ''"
                          @click="chooseCate(0)"
                        >全部工具</div>
                      </li>
                      <li v-for="(item, index) in toolsStore.cates" :key="index" class="flex items-center mb-2 w-full">
                        <!-- <el-text>{{ index != 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '' }} </el-text> -->
                        <div 
                          class="hover:text-blue-400 text-xl w-full hover:bg-gray-200 hover:rounded-md h-10 leading-10" :class="searchParam.cateId == item.id ? 'text-blue-400 bg-gray-200 rounded-md' : ''"
                          @click="chooseCate(item.id)"
                        >{{ item.title }}</div>
                      </li>
                    </ul>
                  </div> 
                </div>
              </el-drawer>
            </div>
          </div>
          
          <!-- pc/pad:搜索、导航 -->
          <el-row class="mt-3 hidden-xs-only">
            <el-col :lg="19" :sm="19">
              <!-- cates -->
              <div class="mr-3">
                <ul class="flex bg-gray-100  h-10 rounded leading-10 pl-3">
                  <li class="flex items-center mr-3">
                    <div 
                      class="hover:text-blue-400 hover:underline hover:decoration-2 hover:underline-offset-[6px] text-sm" :class="searchParam.cateId == 0 ? 'text-blue-400 underline decoration-2 underline-offset-[6px]' : ''"
                      @click="chooseCate(0)"
                    >全部工具</div>
                  </li>
                  <li v-for="(item, index) in toolsStore.cates" :key="index" class="flex items-center">
                    <el-text>{{ index != 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '' }} </el-text>
                    <div 
                      class="hover:text-blue-400 hover:underline hover:decoration-2 hover:underline-offset-[6px] text-sm" :class="searchParam.cateId == item.id ? 'text-blue-400 underline decoration-2 underline-offset-[6px]' : ''"
                      @click="chooseCate(item.id)"
                    >{{ item.title }}</div>
                  </li>
                </ul>
              </div> 
            </el-col>
            <el-col :lg="5" :sm="5">
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
        <el-col :xl="4" :lg="3" :sm="1" class="flex"></el-col>
      </el-row>
    </nav>
  </header>
</template>

<style scoped>
</style>