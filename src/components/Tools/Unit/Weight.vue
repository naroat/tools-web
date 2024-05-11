<script setup lang="ts">
import { reactive } from 'vue'

const info: {
  [key: string]: string|number
} = reactive({
  t: '',
  kg: '',
  g: '',
  mg: '',

  jin: '',
  liang: '',
  qian: '',
  dan: '',

  eng_lb: '',
  eng_oz: '',
  eng_st: '',
  eng_cwt: '',
  eng_dr: '',
  eng_gr: '',
  eng_lt: '',

  eng_lbt: '',
  eng_ozt: '',
  eng_grain: '',
  eng_dwt: '',
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
  switch (key) {
    case 't':
      info.g = parseFloat(info[key] as string) * 1000000
      break;
    case 'kg':
      info.g = parseFloat(info[key] as string) * 1000
      break;
    case 'g':
      info.g = parseFloat(info[key] as string) * 1
      break;
    case 'mg':
      info.g = parseFloat(info[key] as string) * 0.001
      break;

    case 'jin':
      info.g = parseFloat(info[key] as string) * 500
      break;
    case 'liang':
      info.g = parseFloat(info[key] as string) * 50
      break;
    case 'qian':
      info.g = parseFloat(info[key] as string) * 5
      break;
    case 'dan':
      info.g = parseFloat(info[key] as string) * 50000
      break;

    case 'eng_lb':
      info.g = parseFloat(info[key] as string) * 453.59237
      info.eng_lb = parseFloat(info[key] as string) * 1
      break;
    case 'eng_oz':
      info.g = parseFloat(info[key] as string) * 28.3495231
      info.eng_lb = parseFloat(info[key] as string) * 0.0625
      break;
    case 'eng_st':
      info.g = parseFloat(info[key] as string) * 6350.29318
      info.eng_lb = parseFloat(info[key] as string) * 14
      break;
    case 'eng_cwt':
      info.g = parseFloat(info[key] as string) * 50802.34544
      info.eng_lb = parseFloat(info[key] as string) * 112
      break;
    case 'eng_dr':
      info.g = parseFloat(info[key] as string) * 1.7718452
      info.eng_lb = parseFloat(info[key] as string) * 0.0039063
      break;
    case 'eng_gr':
      info.g = parseFloat(info[key] as string) * 0.0647989
      info.eng_lb = parseFloat(info[key] as string) * 0.0001429
      break;
    case 'eng_lt':
      info.g = parseFloat(info[key] as string) * 1016046.9088
      info.eng_lb = parseFloat(info[key] as string) * 2240
      break;
    
    case 'eng_lbt':
      info.g = parseFloat(info[key] as string) * 373.2417216
      info.eng_lbt = parseFloat(info[key] as string) * 1
      break;
    case 'eng_ozt':
      info.g = parseFloat(info[key] as string) * 31.1034768
      info.eng_lbt = parseFloat(info[key] as string) * 0.0833333
      break;
    case 'eng_grain':
      info.g = parseFloat(info[key] as string) * 0.0647989
      info.eng_lbt = parseFloat(info[key] as string) * 0.0001736
      break;
    case 'eng_dwt':
      info.g = parseFloat(info[key] as string) * 1.5551738
      info.eng_lbt = parseFloat(info[key] as string) * 0.0041667
      break;
    default:
      break;
  }

  //转换成其他单位
  let val = info.g as number
  //英制 - 常衡制
  let engLbVal = val / 453.59237
  if (['tradition_mu', 'tradition_fen', 'tradition_mill', 'tradition_hao'].includes(key)) {
    engLbVal = (info.eng_lb == '' ? engLbVal : info.eng_lb) as number
  }
  //英制 - 金衡制
  let engLbtVal = val / 373.2417216
  if (['eng_lbt', 'eng_ozt', 'eng_grain', 'eng_dwt'].includes(key)) {
    engLbtVal = (info.eng_lbt == '' ? engLbtVal : info.eng_lbt) as number
  }
  info.t = val * 0.000001
  info.kg = val * 0.001
  info.mg = val * 1000

  info.jin = val * 0.002
  info.liang = val * 0.02
  info.qian = val * 0.2
  info.dan = val * 0.00002

  info.eng_lb = engLbVal * 1
  info.eng_oz = engLbVal * 16
  info.eng_st = engLbVal * 0.0714286
  info.eng_cwt = engLbVal * 0.0089286
  info.eng_dr = engLbVal * 256
  info.eng_gr = engLbVal * 7000
  info.eng_lt = engLbVal * 0.0004464

  info.eng_lbt = engLbtVal * 1
  info.eng_ozt = engLbtVal * 12
  info.eng_grain = engLbtVal * 5760
  info.eng_dwt = engLbtVal * 240
}

</script>

<template>
    <div>
      <div>
        <el-divider content-position="left">国际重量单位(公制)</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">吨(t)</el-text>
            <el-input
              v-model="info.t"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('t')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">千克/公斤(kg)</el-text>
            <el-input
              v-model="info.kg"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('kg')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">克(g)</el-text>
            <el-input
              v-model="info.g"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('g')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">毫克(mg)</el-text>
            <el-input
              v-model="info.mg"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('mg')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- ----- -->
        <el-divider content-position="left">中国传统重量单位(市制)</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">斤</el-text>
            <el-input
              v-model="info.jin"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('jin')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">两</el-text>
            <el-input
              v-model="info.liang"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('liang')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">钱</el-text>
            <el-input
              v-model="info.qian"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('qian')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">担</el-text>
            <el-input
              v-model="info.dan"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('dan')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <el-divider content-position="left">英制重量单位(常衡制)</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">磅(lb)</el-text>
            <el-input
              v-model="info.eng_lb"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_lb')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">盎司(oz)</el-text>
            <el-input
              v-model="info.eng_oz"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_oz')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">英石(st)</el-text>
            <el-input
              v-model="info.eng_st"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_st')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">英担(cwt)</el-text>
            <el-input
              v-model="info.eng_cwt"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_cwt')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">打兰(dr)</el-text>
            <el-input
              v-model="info.eng_dr"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_dr')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">格令(gr)</el-text>
            <el-input
              v-model="info.eng_gr"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_gr')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">长吨(lt)</el-text>
            <el-input
              v-model="info.eng_lt"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_lt')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>

        <el-divider content-position="left">英制重量单位(金衡制)</el-divider>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">磅(lbt)</el-text>
            <el-input
              v-model="info.eng_lbt"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_lbt')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">盎司(ozt)</el-text>
            <el-input
              v-model="info.eng_ozt"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_ozt')">转换</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <!-- group -->
        <div class="custom-box">
          <div class="custom-box-single">
            <el-text class="custom-box-text">格令</el-text>
            <el-input
              v-model="info.eng_grain"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_grain')">转换</el-button>
              </template>
            </el-input>
          </div>
          <div class="custom-box-single">
            <el-text class="custom-box-text">英钱(dwt)</el-text>
            <el-input
              v-model="info.eng_dwt"
              placeholder=""
              class="input-with-select"
            >
              <template #append>
                <el-button @click="tran('eng_dwt')">转换</el-button>
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