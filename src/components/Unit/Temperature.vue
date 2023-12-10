<script setup lang="ts">
import { reactive } from 'vue'

const info: {
  [key: string]: string|number
} = reactive({
  c: '',
  f: '',
  k: '',
  re: '',
  r: '',
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
  //转换成摄氏度
  switch (key) {
    case 'c':
      info.c = parseFloat(info[key] as string) * 1
      break;
    case 'f':
      info.c = parseFloat(info[key] as string) * -17.2222222
      break;
    case 'k':
      info.c = parseFloat(info[key] as string) * -272.15
      break;
    case 're':
      info.c = parseFloat(info[key] as string) * 1.25
      break;
    case 'r':
      info.c = parseFloat(info[key] as string) * -272.5944444
      break;
    default:
      break;
  }

  //转换成其他单位
  let val = info.c as number
  info.f = 32 + (val * 1.8)
  info.k = 273.15 + val
  info.re = val / 1.25
  info.r = (val + 273.15) * 1.8
}

</script>

<template>
    <div>
      <div>
        <el-divider content-position="left">国际温度单位</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">摄氏度(℃)</el-text>
            <el-input
              v-model="info.c"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('c')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">华氏度(℉)</el-text>
            <el-input
              v-model="info.f"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('f')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">开氏度(K)</el-text>
            <el-input
              v-model="info.k"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('k')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">列氏度(°Re)</el-text>
            <el-input
              v-model="info.re"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('re')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">兰氏度(°R)</el-text>
            <el-input
              v-model="info.r"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('r')">转换</el-button>
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