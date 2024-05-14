<script setup lang="ts">
import Header from '@/components/Layout/Header/Header.vue'
import Left from '@/components/Layout/Left/Left.vue'
import Floor from '@/components/Layout/Floor/Floor.vue'
// import Right from '@/components/Layout/Right/Right.vue'
import { useComponentStore } from '@/store/modules/component'

//store
const componentStore = useComponentStore()

</script>

<template>
  <el-container>
    <!-- left -->
    <el-aside class="fixed top-0 left-0 h-full z-10 c-md:block c-sm:hidden c-xs:hidden" width="240px" v-show="!componentStore.leftCom">
        <Left></Left>
    </el-aside>
    <el-drawer 
      show-close
      size="240px" 
      :with-header="false" 
      v-model="componentStore.leftComDrawer" 
      direction="ltr"
      >
      <Left></Left>
    </el-drawer>

    <!-- right -->
    <el-container  :class="!componentStore.leftCom ? 'c-md:ml-[240px]' : ''">
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition name="animation" mode="out-in">
            <component :is="Component" :key="route.path"></component>
          </transition>
        </router-view>
      </el-main>
      <el-footer class="md:mb-6 mt-12 c-xs:mb-12">
        <Floor />
      </el-footer>
    </el-container>

  </el-container>
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
