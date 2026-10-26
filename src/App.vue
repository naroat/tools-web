<script setup lang="ts">
import { computed } from 'vue'
import { locale } from '@/i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import Header from '@/components/Layout/Header/Header.vue'
import Left from '@/components/Layout/Left/Left.vue'
import Floor from '@/components/Layout/Floor/Floor.vue'
// import Right from '@/components/Layout/Right/Right.vue'
import { useComponentStore } from '@/store/modules/component'

//store
const componentStore = useComponentStore()
const elementLocale = computed(() => locale.value === 'en' ? en : zhCn)

</script>

<template>
  <el-config-provider :locale="elementLocale">
  <el-container>
    <!-- left -->
    <transition name="left-sidebar">
      <el-aside v-if="!componentStore.leftCom" class="fixed top-0 left-0 h-full z-10 c-md:block c-sm:hidden c-xs:hidden" width="240px">
        <Left></Left>
      </el-aside>
    </transition>
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
    <el-container  :class="!componentStore.leftCom ? 'c-md:ml-[240px]' : ''" class="main-container">
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
  </el-config-provider>
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

/* 左侧菜单折叠动画 */
.left-sidebar-enter-from,
.left-sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.left-sidebar-enter-to,
.left-sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.left-sidebar-enter-active,
.left-sidebar-leave-active {
  transition: all 0.3s ease;
}

/* 主内容区域动画 */
.main-container {
  transition: margin-left 0.3s ease;
}
</style>

<style>
/* 全局科技感样式 */
body {
  background-color: #f0f2f5;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(64, 158, 255, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 80% 30%, rgba(118, 75, 162, 0.05) 0%, transparent 25%),
    radial-gradient(circle at 40% 70%, rgba(102, 126, 234, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 90%, rgba(64, 158, 255, 0.05) 0%, transparent 15%);
  background-attachment: fixed;
  min-height: 100vh;
}

/* 科技感滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #409EFF, #667eea);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #667eea, #764ba2);
}
</style>
