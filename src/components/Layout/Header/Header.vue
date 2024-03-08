<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { useToolsStore } from '@/store/modules/tools'
import { useComponentStore } from '@/store/modules/component'
import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import { ToolsInfo } from '@/api/tools/type';
import Login from '@/components/Layout/Login/Login.vue'
import { useUserStore } from '@/store/modules/user'
import defaultAvatar from '@/assets/default_avatar.png'
import router from '@/router';
// const isNavDrawer = ref(false)
const loading = ref(false)
const options = ref<ToolsInfo[]>([])
const loginRef = ref()
const userPopRef = ref()
const defAvatar = ref(defaultAvatar)
const feedBackUrl = import.meta.env.VITE_FEEDBACK_URL
//store
const toolsStore = useToolsStore()
const componentStore = useComponentStore()
const userStore = useUserStore()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: '',
  route: '',
})

//search
// const search = async () => {
//   try {
//     await toolsStore.getTools(searchParam)
//     //关闭抽屉
//     isNavDrawer.value = false
//   } catch (error) {
//     console.log(error)
//   }
// }

//选择分类
// const chooseCate = (cateId: number) => {
//   searchParam.cateId = cateId
//   search()
// }

//搜索工具
const searchTools = async (query: string) => {
  loading.value = true
  if (query) {
    searchParam.title = query
    await toolsStore.getTools(searchParam)
  } else {
    options.value = []
  }
  loading.value = false
}

const optionClick = (url: string) => {
  router.push(url)
}

//收藏
// const collect = () => {
//   ElMessageBox({
//     title: '提示',
//     message: '请使用快捷键`Ctrl+D`进行收藏'
//   })
// }

const openLogin = () => {
  loginRef.value.show()
}

//获取用户信息
const userInfo = async () => {
  try {
    //提交
    await userStore.userInfo()
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

//退出登录
const logout = async () => {
  try {
    //提交
    await userStore.logout()
    location.reload()
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

//获取收藏
const getToolCollect = async () => {
  try {
    await toolsStore.getCollect()
    // ElMessage.success('收藏成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
  return
}

onMounted(() => {
  getToolCollect(),
  userInfo()
})
</script>

<template>
  <header class="h-20 w-full flex justify-between pt-2 pb-2 c-xs:h-16 c-xs:border-b-[1px] items-center">
    <div class="flex items-center">
      <Transition name="fold" class="hidden c-sm:block c-md:hidden c-xs:block">
        <svg v-if="!componentStore.leftComDrawer" @click="componentStore.setleftComDrawerStatus(true)" t="1702978210636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7618" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M895.936 256l-768-0.896 0.128-64L896 192l-0.064 64zM179.2 689.152l202.688-152a32 32 0 0 0 0-51.2L179.2 333.952a32 32 0 0 0-51.2 25.6v304a32 32 0 0 0 51.2 25.6z m12.8-89.6v-176l117.312 88L192 599.552zM896 544H480v-64H896v64z m-0.064 288l-768-0.896 0.128-64L896 768l-0.064 64z" p-id="7619"></path>
        </svg>
        <svg v-else @click="componentStore.setleftComDrawerStatus(false)" t="1702978577170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1587" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M128.064 192l768 0.896-0.128 64L128 256l0.064-64z m514.048 294.848a32 32 0 0 0 0 51.2l202.688 152a32 32 0 0 0 51.2-25.6v-304a32 32 0 0 0-51.2-25.6l-202.688 152zM832 424.448v176l-117.312-88L832 424.448zM128 480h416v64H128v-64z m0.064 288l768 0.896-0.128 64L128 832l0.064-64z" p-id="1588"></path>
        </svg>
      </Transition>

      <!-- c-md:block -->
      <Transition name="fold" class="hidden c-md:block">
        <svg v-if="!componentStore.leftCom" @click="componentStore.setLeftComStatus(true)" t="1702978577170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1587" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M128.064 192l768 0.896-0.128 64L128 256l0.064-64z m514.048 294.848a32 32 0 0 0 0 51.2l202.688 152a32 32 0 0 0 51.2-25.6v-304a32 32 0 0 0-51.2-25.6l-202.688 152zM832 424.448v176l-117.312-88L832 424.448zM128 480h416v64H128v-64z m0.064 288l768 0.896-0.128 64L128 832l0.064-64z" p-id="1588"></path>
        </svg>
        <svg v-else @click="componentStore.setLeftComStatus(false)" t="1702978210636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7618" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M895.936 256l-768-0.896 0.128-64L896 192l-0.064 64zM179.2 689.152l202.688-152a32 32 0 0 0 0-51.2L179.2 333.952a32 32 0 0 0-51.2 25.6v304a32 32 0 0 0 51.2 25.6z m12.8-89.6v-176l117.312 88L192 599.552zM896 544H480v-64H896v64z m-0.064 288l-768-0.896 0.128-64L896 768l-0.064 64z" p-id="7619"></path>
        </svg>
      </Transition>
    
      <div class="md:w-80 c-xs:72">
        <!-- <el-input 
          v-model="searchParam.title" 
          placeholder="搜索工具" 
          class="h-10 ml-3" 
          @keyup.enter.native="search">
          <template #append>
            <el-button :icon="Search" @click="search"/>
          </template>
        </el-input> -->
        <el-select
          v-model="searchParam.title"
          filterable
          remote
          reserve-keyword
          remote-show-suffix
          :suffix-transition="false"
          :suffix-icon="Search"
          placeholder="输入关键词搜索，如文本、json、图片等"
          :remote-method="searchTools"
          :loading="loading"
          class="ml-3 mr-3 md:w-80 c-xs:w-60"
        >
          <el-option
            v-for="item in toolsStore.list"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            @click="optionClick(item.url)"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class=" w-full md:w-auto flex md:block c-xs:w-auto">
      <ul class="flex mt-4 flex-col md:flex-row md:mt-0 justify-end items-center c-xs:mt-0">
        <li class="hover:text-blue-500">
          <el-link :href="feedBackUrl" size="large" target="_blank">建议/问题</el-link>
        </li>
        <li class="ml-3" v-if="userStore.isLogin()">
          <!-- userStore.avatar -->
          <el-image class="w-10 h-10 cursor-pointer" fit="cover" :src="(userStore.avatar == '' || userStore.avatar == null || userStore.avatar == undefined) ? defAvatar : userStore.avatar" v-popover="userPopRef"></el-image>
          <el-popover
            ref="userPopRef"
            trigger="hover"
            virtual-triggering
            popper-style="padding-left: 0; padding-right: 0;"
          >
            <div class="flex flex-col">
              <el-button link class="mb-3">{{ userStore.email }}</el-button>
              <el-button link type="danger" class="ml-0" style="margin-left: 0;" @click="logout">退出登录</el-button>
            </div>
          </el-popover>
        </li>
        <li class="ml-3 hover:text-blue-500" v-else>
          <el-button size="large" type="primary" @click="openLogin">登录</el-button>
        </li>
      </ul>
    </div>
    <Login ref="loginRef"/>
  </header>
</template>

<style scoped>
.fold-enter-active {
  transition: all 1s ease-out;
}

.fold-enter-from,
.fold-leave-to {
  transform: translateX(20px);
  opacity: 0;
} 
</style>