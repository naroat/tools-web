<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { VideoPause,VideoPlay,CopyDocument } from '@element-plus/icons-vue'
import { Jh_getTimeStamp,Jh_timeStampToTime,Jh_convertTimeStamp } from '@/utils/time'
import clipboard3 from 'vue-clipboard3'
import { ElMessage } from 'element-plus';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
const info = reactive({
  title: "时间戳转换",
  nowTime: Jh_getTimeStamp(),
  isPlay: true,
  waitTimeStamp: Jh_getTimeStamp(),//待转换的时间戳
  tranTimeStamp: 0, //转换后的时间戳
  waitDate: Jh_timeStampToTime(Jh_getTimeStamp(), '{y}-{m}-{d} {h}:{i}:{s}'),  //待转换时间
  tranDate: '', //转换后时间
  chooseTranStampOption: '0',
  chooseTranDateOption: '0',
  tranOptions: [
    {
      value: '0',
      label: '毫秒(ms)'
    },
    {
      value: '1',
      label: '秒(s)'
    }
  ]
})
let timer: any

//开始定时任务
const start = () => {
  if (!timer) {
    timer = setInterval(() => {
      info.nowTime = Jh_getTimeStamp()
    }, 1000)
  }
}

//停止定时任务
const stop = () => {
  clearInterval(timer)
  timer = null
}

//进入
onMounted(() => {
  start()
})

//消亡
onUnmounted(() => {
  stop()
})


const isPlayChange = () => {
  if (info.isPlay == true) {
    info.isPlay = false
    stop()
  } else {
    info.isPlay = true
    start()

  }
}

//时间日期相互转换
const timeTran = (type: string) => {
  if (type == 'toStamp') {
    info.tranTimeStamp = info.chooseTranStampOption == '0' ? Jh_convertTimeStamp(info.waitDate) : Jh_convertTimeStamp(info.waitDate) / 1000
  } else {
    //转换number类型
    if (typeof(info.waitTimeStamp) === 'string') info.waitTimeStamp = parseInt(info.waitTimeStamp as string)
    info.tranDate = Jh_timeStampToTime(info.waitTimeStamp, '{y}-{m}-{d} {h}:{i}:{s}')
  }
}

//复制时间戳
const {toClipboard} = clipboard3()
const copyStamp = async () => {
  try {
    await toClipboard('' + info.nowTime)
    ElMessage({
      message: "复制成功",
      type: "success",
      duration: 1500
    })
  } catch (error) {
    console.log("复制失败")
    console.log(error)
    ElMessage({
      message: "复制失败",
      type: "error",
      duration: 1500
    })
  }
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="flex flex-col">
      <div class="flex flex-direction">
        <el-text class="mr-2 w-12">现在</el-text>
        <el-button class="mr-3" link @click="copyStamp()">{{ info.nowTime }} <el-icon class="ml-1 mr-1"><CopyDocument /></el-icon></el-button>
        <el-button v-if="info.isPlay" type="danger" link class="flex items-center" @click="isPlayChange()"><el-icon class="mr-1" size="16"><VideoPlay/></el-icon>停止</el-button>
        <el-button v-else="info.isPlay" type="primary" link class="flex items-center" @click="isPlayChange()"><el-icon class="mr-1" size="16"><VideoPause /></el-icon>开始</el-button>
      </div>

      <div class="flex flex-direction mt-4 justify-start">
        <el-text class="mr-2 w-12">时间戳</el-text>
        <el-input v-model="info.waitTimeStamp" class="h-8 mr-2 w-60 max-w-[30%]" placeholder="毫秒/秒">
          <!-- <template #append>
            <el-select v-model="info.chooseTranDateOption" placeholder="Select"  class="w-24">
              <el-option
                v-for="item in info.tranOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template> -->
        </el-input> 
        <el-button class="mr-2 max-w-[25%]" @click="timeTran('toDate')">转换</el-button>
        <el-input v-model="info.tranDate" class="h-8 w-72 mr-2 max-w-[30%]" placeholder="北京时间"></el-input>
      </div>

      <div class="flex flex-direction mt-4 justify-start">
        <el-text class="mr-2 w-12">时间</el-text>
        <el-input v-model="info.waitDate" class="h-8 mr-2 w-60 max-w-[30%]"></el-input> 
        <el-button class="mr-2 max-w-[25%]" @click="timeTran('toStamp')">转换</el-button>
        <el-input v-model="info.tranTimeStamp" :value="info.tranTimeStamp == 0 ? '' : info.tranTimeStamp" class="h-8 w-72 mr-2 max-w-[30%]" placeholder="时间戳">
          <template #prepend>
            <el-select v-model="info.chooseTranStampOption" placeholder="Select"  class="w-24">
              <el-option
                v-for="item in info.tranOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-input>
      </div>
    </div>

    <div>
      <div class="text-xl mt-5 mb-5">时间戳</div>
      <el-text>Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。</el-text>
    </div>
  </div>
</template>

<style scoped>

</style>