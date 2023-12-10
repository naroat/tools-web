<script setup lang="ts">
import { reactive } from 'vue'

const lengthInfo: {
  [key: string]: string|number
} = reactive({
  km: '',
  m: '',
  dm: '',
  cm: '',
  mm: '',
  ha: '',
  tradition_mu: '',
  tradition_fen: '',
  tradition_mill: '',
  tradition_hao: '',
  eng_nmi: '',
  eng_mi: '',
  eng_acre: '',
  eng_rd: '',
  eng_yd: '',
  eng_ft: '',
  eng_in: '',
})

//clear
const clear = () => {
  for (let item in lengthInfo) {
    lengthInfo[item] = ''
  }
}

/**
 * 转换
 * @param type 
 */
const tran = (key: string) => {
  //转换成平方米
  switch (key) {
    case 'km':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * (1000 * 1000)
      break;
    case 'm':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 1
      break;
    case 'dm':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.01
      break;
    case 'cm':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.0001
      break;
    case 'mm':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.000001
      break;
    case 'ha':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 10000
      break;
    case 'tradition_mu':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 666.6666667
      lengthInfo.tradition_mu = parseFloat(lengthInfo[key] as string) * 1
      break;
    case 'tradition_fen':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 66.67
      lengthInfo.tradition_mu = parseFloat(lengthInfo[key] as string) * 0.1
      break;
    case 'tradition_mill':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 6.67
      lengthInfo.tradition_mu = parseFloat(lengthInfo[key] as string) * 0.01
      break;
    case 'tradition_hao':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.67
      lengthInfo.tradition_mu = parseFloat(lengthInfo[key] as string) * 0.001
      break;
    case 'eng_nmi':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * (1852 * 1852)
      break;
    case 'eng_mi':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 2589988.110336
      lengthInfo.eng_ft = parseFloat(lengthInfo[key] as string) * 27878400
      break;
    case 'eng_acre':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 4046.8564224
      lengthInfo.eng_ft = parseFloat(lengthInfo[key] as string) * 43560
      break;
    case 'eng_rd':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 25.2928526
      lengthInfo.eng_ft = parseFloat(lengthInfo[key] as string) * 272.25
      break;
    case 'eng_yd':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.8361274
      lengthInfo.eng_ft = parseFloat(lengthInfo[key] as string) * 9
      break;
    case 'eng_ft':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.092903
      lengthInfo.eng_ft = parseFloat(lengthInfo[key] as string) * 1
      break;
    case 'eng_in':
      lengthInfo.m = parseFloat(lengthInfo[key] as string) * 0.0006452
      lengthInfo.eng_ft = parseFloat(lengthInfo[key] as string) * 0.0069444
      break;
    default:
      break;
  }

  //平方米转换成其他单位
  let mVal = lengthInfo.m as number
  //传统面积处理
  let muVal = mVal * 0.0015
  if (['tradition_mu', 'tradition_fen', 'tradition_mill', 'tradition_hao'].includes(key)) {
    muVal = (lengthInfo.tradition_mu == '' ? muVal : lengthInfo.tradition_mu) as number
  }
  //英制
  let engFtVal = mVal / 0.092903
  if (['eng_mi', 'eng_acre', 'eng_rd', 'eng_yd', 'eng_ft', 'eng_in'].includes(key)) {
    engFtVal = (lengthInfo.eng_ft == '' ? engFtVal : lengthInfo.eng_ft) as number
  }

  lengthInfo.km = mVal * 0.000001
  lengthInfo.dm = mVal * 100
  lengthInfo.cm = mVal * 10000
  lengthInfo.mm = mVal * 1000000
  lengthInfo.ha = mVal * 0.0001

  lengthInfo.tradition_mu = muVal
  lengthInfo.tradition_fen = muVal / 0.1
  lengthInfo.tradition_mill = muVal / 0.01
  lengthInfo.tradition_hao = muVal / 0.001

  lengthInfo.eng_nmi = mVal / (1852 * 1852)
  lengthInfo.eng_mi = engFtVal / 27878400
  lengthInfo.eng_acre = engFtVal / 43560
  lengthInfo.eng_rd = engFtVal / 272.25
  lengthInfo.eng_yd = engFtVal / 9
  lengthInfo.eng_ft = engFtVal
  lengthInfo.eng_in = engFtVal / 0.0069444
}

</script>

<template>
    <div>
      <div>
        <el-divider content-position="left">国际面积单位(公制)</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方千米(km<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.km"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('km')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方米(m<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.m"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('m')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方分米(dm<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.dm"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('dm')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方厘米(cm<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.cm"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('cm')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方毫米(mm<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.mm"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('mm')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">公顷(ha)</el-text>
            <el-input
              v-model="lengthInfo.ha"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('ha')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <el-divider content-position="left">中国传统面积单位(市制)</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">亩</el-text>
            <el-input
              v-model="lengthInfo.tradition_mu"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('tradition_mu')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">分</el-text>
            <el-input
              v-model="lengthInfo.tradition_fen"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('tradition_fen')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">厘</el-text>
            <el-input
              v-model="lengthInfo.tradition_mill"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('tradition_mill')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">毫</el-text>
            <el-input
              v-model="lengthInfo.tradition_hao"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('tradition_hao')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <el-divider content-position="left">英制面积单位</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方海里(nmi<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.eng_nmi"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_nmi')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方英里(mi<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.eng_mi"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_mi')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">英亩(acre)</el-text>
            <el-input
              v-model="lengthInfo.eng_acre"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_acre')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方竿(rd<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.eng_rd"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_rd')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方码(yd<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.eng_yd"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_yd')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方英尺(ft<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.eng_ft"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_ft')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">平方英寸(in<sup>2</sup>)</el-text>
            <el-input
              v-model="lengthInfo.eng_in"
              placeholder=""
              class="input-with-select"
              type="number"
            >
              <template #append>
                <el-button @click="tran('eng_in')">转换</el-button>
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