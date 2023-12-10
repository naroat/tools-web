<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy } from '@/utils/string'
const info = reactive({
  title: "色板",
  palettes: [
    {
      theme: 'last summer day',    // 
      item: ['#A7C5C5', '#DEE0D5', '#E2AC48', '#B96028', '#983C2D'],
    },
    {
      theme: 'Hazy Summer Afternoon',    // 
      item: ['#26C4A5', '#54D99F', '#ACE08C', '#E8E284', '#F2B652'],
    },
    {
      theme: 'Summering',    // 
      item: ['#FFBE4C', '#B33127', '#93EDFF', '#648FAD', '#FFFFFF'],
    },
    {
      theme: 'Bare August — Footcare Essentials',    // 
      item: ['#F2636F', '#F2858E', '#F2AEB4', '#F27999', '#F2D9D0'],
    },
    {
      theme: 'Big Vilnius Summer Loto',    // 
      item: ['#D90416', '#BF2A45', '#528C49', '#BF7B54', '#F28D8D'],
    },
    {
      theme: 'Illustration Design',    // 
      item: ['#D9D2D6', '#010326', '#4C5D73', '#808C65', '#F2E750'],
    },
    {
      theme: 'Beautiful tropical beach with blue sky and white clouds abstract texture background',    // 
      item: ['#04B2D9', '#CEECF2', '#04C4D9', '#15BFBF', '#D9D0C7'],
    },
  ]
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
      <div class="flex flex-col">
        <div v-for="(item, index) in info.palettes" :key="index" class="flex flex-col mb-3">
          <div class="flex h-28 rounded-lg overflow-hidden items-center">
            <span 
              v-for="(color, index) in item.item"
              :key="index" 
              class="w-1/5 h-full color-palette" 
              :style="'background-color:' + color + ';'" 
              @click="copyRes(color)" 
            >
              <div class="color-text hidden flex items-center justify-center h-full w-full" :style="'color:' + color + ';'" >{{ color }}</div>
            </span>
            <!--  @change="(val: any) => (changeCheckBox(val, 3)) -->
          </div>
          <!-- <div class="">
            <el-text>主题：{{ item.theme }}</el-text>
          </div> -->
          <el-divider v-if="index != item.item.length + 1"/>
        </div>
        
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.color-palette:hover .color-text{
  display: flex;
  filter: grayscale(1) contrast(999) invert(1)
}
</style>