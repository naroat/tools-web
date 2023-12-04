<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { RouterLink } from "vue-router"
import { Star } from '@element-plus/icons-vue'
import { useToolsStore } from '@/store/modules/tools'

//store
const toolsStore = useToolsStore()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: ''
})
const getToolsList = async () => {
  try {
    await toolsStore.getTools(searchParam)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getToolsList()
})
</script>

<template>
  <div>
    <!-- card -->
    <div class="mr-3 flex justify-between flex-wrap self-card-div c-xs:ml-3" :gutter="10">
        <router-link v-for="(item, index) in toolsStore.list" :key="index" :to="item.url" class="flex flex-col mt-3 border-solid rounded border-gray w-[32.5%] p-2 bg-gray-100 hover:shadow-md c-xs:w-[99.5%]">
          <div class="flex items-center border-b pb-2">
            <el-image :src="item.logo" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
            <div class="flex flex-col ml-2 w-full">
              <div class="flex">
                <div class="font-semibold text-lg line-clamp-1">{{ item.title }}</div>
              </div>
              <div class="flex justify-between">
                <el-text size="small">{{ item.cate }}</el-text>
                <el-button :icon="Star" circle size="small"/>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2">
            <el-text line-clamp="1">{{ item.desc }}</el-text>
          </div>
        </router-link>
    </div>
    
  </div>
</template>

<style scoped>
.self-card-div:after{
  content: "";
  width: 32.5%
}
</style>