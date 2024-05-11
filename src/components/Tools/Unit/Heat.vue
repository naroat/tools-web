<script setup lang="ts">
import { reactive } from 'vue'

const info: {
  [key: string]: string|number
} = reactive({
  wh: '',
  mmwh: '',
  kwh: '',
  mwh: '',
  j: '',
  kj: '',
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
  //转换成瓦
  switch (key) {
    case 'wh':
      info.wh = parseFloat(info[key] as string) * 1
      break;
    case 'mmwh':
      info.wh = parseFloat(info[key] as string) * 0.001
      break;
    case 'kwh':
      info.wh = parseFloat(info[key] as string) * 1000
      break;
    case 'mwh':
      info.wh = parseFloat(info[key] as string) * 1000000
      break;
    case 'j':
      info.wh = parseFloat(info[key] as string) * 0.0002777777777777778
      break;
    case 'kj':
      info.wh = parseFloat(info[key] as string) * 0.2777777777777778
      break;
    default:
      break;
  }

  //转换成其他单位
  let val = info.wh as number
  info.mmwh = val / 0.001
  info.kwh = val / 1000
  info.mwh = val / 1000000
  info.j = val / 0.0002777777777777778
  info.kj = info.j / 1000
}

</script>

<template>
    <div>
      <div>
        <el-divider content-position="left">热量单位</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">瓦(Wh)</el-text>
            <el-input
              v-model="info.wh"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('wh')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">毫瓦时(mWh)</el-text>
            <el-input
              v-model="info.mmwh"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('mmwh')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">千瓦时(kWh)</el-text>
            <el-input
              v-model="info.kwh"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('kwh')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">兆瓦时(MWh)</el-text>
            <el-input
              v-model="info.mwh"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('mwh')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">焦(J)</el-text>
            <el-input
              v-model="info.j"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('j')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">千焦(kJ)</el-text>
            <el-input
              v-model="info.kj"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('kj')">转换</el-button>
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