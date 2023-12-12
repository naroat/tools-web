<script setup lang="ts">
import { Tools } from '@element-plus/icons-vue'
import { Message } from '@element-plus/icons-vue'
import { reactive, onMounted } from 'vue';
import { useToolsStore } from '@/store/modules/tools'
const info = reactive({
  feedbackUrl: import.meta.env.VITE_FEEDBACK_URL || 'javascript:void(0)',
  advShow: import.meta.env.VITE_ADV_SHOW || 'false',
  advList: [
    {
      img: 'https://img.jutuike.com/taokeout/banner/ele_hongbao_banner.png',
      url: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/adv/elm_adv.jpeg'
    },
    {
      img: 'https://s3plus.sankuai.com/v1/mss_5017c592a8a946d2a54eb62a76ba299c/nebulafile/910fa09a310aadd229e90e4ad872d86e.png',
      url: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/adv/meituan_adv.png'
    }
  ]
})

//store
const toolsStore = useToolsStore()

//获取随机推荐
const getToolRecommend = async () => {
  try {
    await toolsStore.getToolRecommend()
  } catch (e) {
    console.log(e)
  }
}

//点击走马灯
const clickCarousel = (url: string) => {
  let w = window.open('')
  w?.document.write(`<!DOCTYPE html><html><body ><img src='${url}'/></body></html>`)
}

//反馈
const feedback = () => {
  window.open(info.feedbackUrl)
}

onMounted(() => {
  getToolRecommend()
})
</script>

<template>
  <div>
    <!-- feedback -->
    <div class="flex flex-col text-center mt-3 border-solid rounded border-gray border p-3 c-xs:mr-3 c-xs:ml-3">
      <div @click="feedback()" class="text-2xl flex items-center justify-center cursor-pointer">
        <el-icon><Message /></el-icon>
        <div class="ml-2">
          建议反馈
        </div>
      </div>
    </div>
    <!-- adv -->
    <div class="mt-3" v-if="info.advShow == 'true'">
      <el-carousel
        height="130px"
        :autoplay="false"
      >
        <el-carousel-item v-for="(item, index) in info.advList" :key="index" @click="clickCarousel(item.url)">
          <el-image :src="item.img" fit="fill" class="h-full w-full"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- hot tools -->
    <div class="mt-3 border-solid rounded border-gray border p-3 c-xs:mr-3 c-xs:ml-3">
      <div class="text-xl text-gray-400 font-bold">随机推荐</div>
      <ul class="mt-3">
        <RouterLink :to="item.url" class="flex items-center hover:bg-gray-200 p-1 rounded" v-for="(item, index) in toolsStore.recommends" :key="index">
          <el-icon class="mr-1"><Tools /></el-icon>
          <div>{{ item.title }}</div>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>