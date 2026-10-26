<script setup lang="ts">
import { t } from '@/i18n'

import { onMounted } from 'vue';
import { RouterLink } from "vue-router"
import { StarFilled } from '@element-plus/icons-vue'
import { useToolsStore } from '@/store/modules/tools'
import { ElMessage } from 'element-plus'
import { useRoute } from "vue-router"
//store
const toolsStore = useToolsStore()
const route = useRoute()

// 取消收藏
const removeCollect = (url: string) => {
  const success = toolsStore.removeCollect(url)
  if (success) {
    ElMessage.success(t('已取消收藏'));
  } else {
    ElMessage.error(t('取消收藏失败'));
  }
}

onMounted(() => {
  toolsStore.loadCollectedTools()
  if (route.query && route.query.value) {//底部导航跳转过来的则定位到响应位置
      document?.querySelector('#' + `${route.query.value}`)?.scrollIntoView();
  } else {//其他位置跳转过来不需要定位的则定位到顶部
      document?.querySelector('#collect')?.scrollIntoView()
  }
})
</script>

<template>
  <div class="md:mr-6 c-xs:mr-0">
    <!-- 收藏工具 -->
    <div id="collect">
      <!-- 收藏标题 -->
      <div class="mt-8 mb-3 text-xl font-bold text-[--base-black] tech-title">{{ t("收藏工具") }}</div>
      <!-- 收藏卡片 -->
      <div v-if="toolsStore.collectedTools.length > 0" class="flex justify-between flex-wrap self-card-div c-xs:ml-0" :gutter="10">
          <router-link v-for="(item, index) in toolsStore.collectedTools" :key="index" :to="item.url" class="flex flex-col mt-5 border-solid rounded-2xl border-gray w-[24%] p-2 bg-white hover:shadow-md c-xs:w-[99.5%] c-md:w-[24%] c-sm:w-[32%] p-5 hover:-translate-y-2 duration-300 tech-card">
            <div class="flex items-center border-b pb-2">
              <el-image :src="item.logo" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
              <div class="flex flex-col ml-2 w-full">
                <div class="flex justify-between">
                  <div class="font-semibold text-lg line-clamp-1">{{ t(item.title) }}</div>
                  <el-button 
                    :icon="StarFilled" 
                    circle 
                    size="small" 
                    @click.prevent="removeCollect(item.url)" 
                    type="warning"
                  />
                </div>
                <div class="flex justify-between">
                  <el-text size="small">{{ t(item.cate) }}</el-text>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <el-text line-clamp="2">{{ t(item.desc) }}</el-text>
            </div>
          </router-link>
          <!-- 占位 div -->
          <div class="w-[24%] c-md:w-[24%] c-sm:w-[32%] "></div>
      </div>
      <div v-else class="mt-5 p-5 bg-white rounded-2xl">
        <el-empty :description="t('暂无收藏工具')" />
      </div>
    </div>

    <!-- 工具分类列表 -->
    <div v-for="(cate, index) in toolsStore.cates" :key="index">
      <!-- cate title -->
      <div class="mt-8 mb-3 text-xl font-bold text-[--base-black] tech-title" :id="'cate_' + cate.id">
        {{ t(cate.title) }}
      </div>
      <!-- card -->
      <div class="flex justify-between flex-wrap self-card-div c-xs:ml-0" :gutter="10">
          <router-link v-for="(item, index) in cate.list" :key="index" :to="item.url" class="flex flex-col mt-5 border-solid rounded-2xl border-gray w-[24%] p-2 bg-white hover:shadow-md c-xs:w-[99.5%] c-md:w-[24%] c-sm:w-[32%] p-5 hover:-translate-y-2 duration-300 tech-card">
            <div class="flex items-center border-b pb-2">
              <el-image :src="item.logo" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
              <div class="flex flex-col ml-2 w-full">
                <div class="flex">
                  <div class="font-semibold text-lg line-clamp-1">{{ t(item.title) }}</div>
                </div>
                <div class="flex justify-between">
                  <el-text size="small">{{ t(item.cate) }}</el-text>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <el-text line-clamp="2">{{ t(item.desc) }}</el-text>
            </div>
          </router-link>
          <!-- 占位 div -->
          <div class="w-[24%] c-md:w-[24%] c-sm:w-[32%] "></div>
      </div>
    </div>

    <!-- 返回顶部 -->
    <el-backtop :right="10" :bottom="50" />
  </div>
</template>

<style scoped>
.self-card-div:after{
  content: "";
  width: 24%
}

/* 科技感卡片样式 */
.router-link-active .tech-card {
  border-color: #409EFF;
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.3);
}

.tech-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(64, 158, 255, 0.2);
  border-color: #409EFF;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #409EFF, #667eea, #764ba2);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.tech-card:hover::before {
  transform: scaleX(1);
}

/* 科技感标题样式 */
.tech-title {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.tech-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #409EFF, #667eea);
  border-radius: 3px;
}
</style>
