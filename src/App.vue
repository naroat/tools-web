<script setup lang="ts">
import Header from '@/components/Layout/Header/Header.vue'
import Floor from '@/components/Layout/Floor/Floor.vue'
import Right from '@/components/Layout/Right/Right.vue'
</script>

<template>
  <Header></Header>
  <div class="w-full flex flex-col justify-between mb-20">
    <el-row>
      <el-col :xl="4" :md="1" class=""></el-col>
      <el-col :xl="16" :md="22" class="mt-4">
        <el-row class="flex-1">
          <el-col :xl="19" :md="19" class=""><router-view></router-view></el-col>
          <el-col :xl="5" :md="5" class="">
            <Right/>
          </el-col>
        </el-row>
      </el-col>
      <!-- <el-col :xl="4" :md="1" class="flex bg-gray-200"></el-col> -->
      <el-col :xl="4" :md="1"></el-col>
    </el-row>
  </div>
  <Floor></Floor>
</template>

<style scoped>
</style>
