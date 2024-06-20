<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
// import { copy } from '@/utils/string'
const info = reactive({
  title: "tool name",
})

//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        示例...
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>

</style>