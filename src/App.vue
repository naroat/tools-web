<script setup lang="ts">
import Header from '@/components/Layout/Header/Header.vue'
import Floor from '@/components/Layout/Floor/Floor.vue'
import Right from '@/components/Layout/Right/Right.vue'
</script>

<template>
  <Header></Header>
  <div class="w-full flex flex-col justify-between mb-20">
    <el-row>
      <el-col :xl="4" :lg="3" :sm="1" class=""></el-col>
      <el-col :xl="16" :lg="18" :sm="22" class="mt-4">
        <el-row class="flex-1">
          <el-col :lg="19" :sm="19" class="">
            <router-view v-slot="{ Component, route }">
              <transition name="animation" mode="out-in">
                <component :is="Component" :key="route.path"></component>
              </transition>
            </router-view>
          </el-col>
          <el-col :lg="5" :sm="5" class="">
            <Right/>
          </el-col>
        </el-row>
      </el-col>
      <!-- <el-col :lg="4" :sm="1" class="flex bg-gray-200"></el-col> -->
      <el-col :xl="4" :lg="3" :sm="1"></el-col>
    </el-row>
  </div>
  <Floor></Floor>
</template>

<style scoped>
/* 过度动画配置代码 */
.animation-enter-from,
.animation-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
.animation-enter-to,
.animation-leave-from {
	opacity: 1;
}
.animation-enter-active {
	transition: all 0.7s ease;
}
.animation-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
