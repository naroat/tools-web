<script setup lang="ts">
import { reactive } from 'vue'

const info: {
  [key: string]: string|number
} = reactive({
  year: '',
  month: '',
  d: '',
  h: '',
  min: '',
  s: '',
  ms: '',
  week: ''
})

//clear
const clear = () => {
  for (let item in info) {
    info[item] = ''
  }
}

/**
 * 转换
 * @param type 
 */
const tran = (key: string) => {
  //转换成秒
  switch (key) {
    case 'year':
      info.s = parseFloat(info[key] as string) * 31536000
      break;
    case 'month':
      info.s = parseFloat(info[key] as string) * 2629800
      break;
    case 'd':
      info.s = parseFloat(info[key] as string) * 86400
      break;
    case 'h':
      info.s = parseFloat(info[key] as string) * 3600
      break;
    case 'min':
      info.s = parseFloat(info[key] as string) * 60
      break;
    case 's':
      info.s = parseFloat(info[key] as string) * 1
      break;
    case 'ms':
      info.s = parseFloat(info[key] as string) * 0.001
      break;
    case 'week':
      info.s = parseFloat(info[key] as string) * 604800
      break;
    default:
      break;
  }

  //转换成其他单位
  let val = info.s as number
  info.year = val / 31536000
  info.month = info.year * 12
  info.d = val / 86400
  info.h = val / 3600
  info.min = val / 60
  info.ms = val / 0.001
  info.week = val / 604800
}

</script>

<template>
    <div>
      <div>
        <el-divider content-position="left">国际时间单位</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">年(year)</el-text>
            <el-input
              v-model="info.year"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('year')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">月(month)</el-text>
            <el-input
              v-model="info.month"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('month')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">日(d)</el-text>
            <el-input
              v-model="info.d"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('d')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">时(h)</el-text>
            <el-input
              v-model="info.h"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('h')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">分(min)</el-text>
            <el-input
              v-model="info.min"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('min')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">秒(s)</el-text>
            <el-input
              v-model="info.s"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('s')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">毫秒(ms)</el-text>
            <el-input
              v-model="info.ms"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('ms')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">周(week)</el-text>
            <el-input
              v-model="info.week"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('week')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

      </div>

      <div class="w-full text-center">
        <el-button type="primary" @click="clear">清除全部</el-button>
      </div>
    </div>
</template>

<style scoped>
.custom-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem/* 12px */;
}
.custom-box-single{
  display: flex;
  width: 50%;
}
.custom-box-text{
  text-align: center;
  width: 10rem;
}
</style>