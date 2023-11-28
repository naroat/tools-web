<script setup lang="ts">
import { ref } from 'vue'
// import { Search } from '@element-plus/icons-vue'
// const searchInput = ref('')
const appName = ref('工具坊')
const appNet = ref('tools.ranblogs.com')
</script>

<template>
  <header class="">
    <nav class="h-20 w-full leading-10 flex flex-col justify-between pt-2 pb-2">
      <el-row>
        <el-col :xl="4" :md="1"></el-col>
        <el-col :xl="16" :md="22">
          <div class="flex items-center justify-between">
            <!-- left -->
            <router-link class="ml-4 flex flex-row" to="/">
              <img class="h-10 w-auto rounded-lg lg:h-16 mr-2 mt-auto mb-auto" src="../../assets/logo.png" :alt="appNet">
              <div class="flex flex-col  mt-auto mb-auto">
                <div class="text-xl">{{ appName }}</div>
                <div class="text-sm text-gray-500">{{ appNet }}</div>
              </div>
            </router-link>

            <!-- right -->
            <div class=" w-full md:w-auto flex hidden md:block">
              <ul class="flex mt-4 flex-col md:flex-row md:mt-0 justify-end">
                <!-- <li class="mr-5">
                  <el-input v-model="searchInput" placeholder="搜索工具" class="w-full max-w-xl h-10" :prefix-icon="Search"/>
                </li> -->
                <li class="hover:text-blue-500">语言</li>
                <li class="ml-5 hover:text-blue-500">加入收藏</li>
                <li class="ml-5 hover:text-blue-500">常见问题</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :xl="4" :md="1" class="flex"></el-col>
      </el-row>
      
    </nav>
  </header>
</template>

<style scoped>

</style>