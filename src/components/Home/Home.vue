<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from "vue-router"
// import { Star } from '@element-plus/icons-vue'
import { useToolsStore } from '@/store/modules/tools'
// import { ElMessage } from 'element-plus'
import { useRoute } from "vue-router"
//store
const toolsStore = useToolsStore()
const route = useRoute()
// const getToolsCate = async () => {
//   try {
//     await toolsStore.getToolCate()
//   } catch (error: any) {
//     ElMessage.error(error.message)
//   }
// }


onMounted(() => {
  // getToolsCate()
  if (route.query && route.query.value) {//底部导航跳转过来的则定位到响应位置
      document?.querySelector('#' + `${route.query.value}`)?.scrollIntoView();
  } else {//其他位置跳转过来不需要定位的则定位到顶部
      document?.querySelector('#collect')?.scrollIntoView()
  }
})
</script>

<template>
  <div class="md:mr-6 c-xs:mr-0">
    <!-- list -->
    <div v-for="(cate, index) in toolsStore.cates" :key="index">
      <!-- cate title -->
      <div class="mt-8 mb-3 text-xl font-bold text-[--base-black]" :id="'cate_' + cate.id">
        {{ cate.title }}
      </div>
      <!-- card -->
      <div class="flex justify-between flex-wrap self-card-div c-xs:ml-0" :gutter="10">
          <router-link v-for="(item, index) in cate.list" :key="index" :to="item.url" class="flex flex-col mt-5 border-solid rounded-2xl border-gray w-[24%] p-2 bg-white hover:shadow-md c-xs:w-[99.5%] c-md:w-[24%] c-sm:w-[32%] p-5 hover:-translate-y-2 duration-300">
            <div class="flex items-center border-b pb-2">
              <el-image :src="item.logo" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
              <div class="flex flex-col ml-2 w-full">
                <div class="flex">
                  <div class="font-semibold text-lg line-clamp-1">{{ item.title }}</div>
                </div>
                <div class="flex justify-between">
                  <el-text size="small">{{ item.cate }}</el-text>
                  <!-- <el-button :icon="Star" circle size="small" @click.prevent="collect(item.id)" type="warning" :plain="!toolsStore.collectIds.includes(item.id)"/> -->
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <el-text line-clamp="2">{{ item.desc }}</el-text>
            </div>
          </router-link>
          <!-- 占位 div -->
          <div class="w-[24%] c-md:w-[24%] c-sm:w-[32%] "></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.self-card-div:after{
  content: "";
  width: 24%
}
</style>