<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy } from '@/utils/string'
const info = reactive({
  title: "tool name",
})

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="">
      
    </div>
  </div>
</template>

<style scoped>

</style>