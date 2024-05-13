<script setup lang="ts">
// import { Star } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useToolsStore } from '@/store/modules/tools'
// import { ElMessageBox } from 'element-plus'
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

//根据路由查询tool id
const getToolInfo = async () => {
  let routeStr = route.path
  searchParam.route = rtrim(routeStr, '/')
  await toolsStore.getToolInfo(searchParam)
}
//收藏
// const collect = () => {
//   ElMessageBox({
//     title: '提示',
//     message: '请使用快捷键`Ctrl+D`进行收藏'
//   })
// }

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
  </div>
</template>

<style scoped>

</style>