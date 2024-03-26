<script setup lang="ts">
// import { Star } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useToolsStore } from '@/store/modules/tools'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import {rtrim} from '@/utils/string'
const props = defineProps({
  title: String,
  id: Number
})
const route = useRoute()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: '',
  route: ''
})
//store
const toolsStore = useToolsStore()
const userStore = useUserStore()

//根据路由查询tool id
const getToolInfo = async () => {
  let routeStr = route.path
  searchParam.route = rtrim(routeStr, '/')
  await toolsStore.getToolInfo(searchParam)
}

//收藏
const toolCollect = reactive({
  toolId: 0
})
const collect = async (toolId) => {
  try {
    if (!userStore.isLogin()) {
      //未登录,弹出登录窗口
      ElMessage.error('请登录')
      return 
    }
    toolCollect.toolId = toolId
    await toolsStore.toolCollect(toolCollect)
    // ElMessage.success('收藏成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
  return
}

onMounted(() => {
  getToolInfo()
})

</script>

<template>
  <div class="flex justify-between rounded-2xl bg-white p-4 mt-5 mb-5">
    <!-- <div class="text-gray-600">
      <div class="flex">
        <RouterLink to="/" class="flex items-center">
          <el-icon color="blue"><Back /></el-icon>
          <div>返回首页</div>
        </RouterLink>
      </div>
    </div> -->

    <div class="text-xl">
      {{ props.title }}
    </div>
    <div>
      <el-button type="warning" :plain="!toolsStore.collectIds.includes(toolsStore.toolInfo.id)" @click="collect(toolsStore.toolInfo.id)">收藏</el-button>
      <!-- <el-button type="danger">取消收藏</el-button> -->
    </div>
  </div>
</template>

<style scoped>

</style>