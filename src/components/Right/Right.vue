<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { Tools } from '@element-plus/icons-vue'
import { reactive } from 'vue';
const info = reactive({
  searchInput: '',
  hotTools: [
    {
      id: 1,
      value: '时间戳转换'
    },
    {
      id: 1,
      value: 'MD5在线加密'
    },
    {
      id: 1,
      value: 'Json在线转换'
    },
    {
      id: 1,
      value: '正则测试工具'
    },
    {
      id: 1,
      value: '在线代码运行'
    }
  ]
})
</script>

<template>
  <div>
    <!-- search -->
    <div>
      <el-input v-model="info.searchInput" placeholder="搜索工具" class="w-full max-w-xl h-10" :suffix-icon="Search"/>
    </div>

    <!-- hot tools -->
    <div class="mt-3 border-solid rounded border-gray border p-3">
      <div class="text-xl text-gray-400 font-bold">热门工具</div>
      <ul class="mt-3">
        <li class="flex items-center hover:bg-gray-200 p-1 rounded" v-for="(item, index) in info.hotTools" :key="index">
          <el-icon class="mr-1"><Tools /></el-icon>
          <div>{{ item.value }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>