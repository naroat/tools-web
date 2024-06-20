<script setup lang="ts">
import { onBeforeMount, reactive,ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
// import { ElMessage } from 'element-plus'
import vueDanmaku  from 'vue3-danmaku'  //https://www.npmjs.com/package/vue3-danmaku
const info = reactive({
  title: "手持弹幕",
  content: '工具坊',
  barrage: [] as string[],
  speed: 200,
  textSize: 500,
  textColor: '#FFFFFF',
  bgColor: '#000000',
  channels: 1,//轨道数量
  extraStyle: '',
  danmakuFullStyle: "",
  isPlay: false,
  danmakuFullHeight: '100%',
  danmakuFullWidth: '100%',
})

const danmakuFullRef = ref(null) as any

//全屏播放/双击退出全屏并暂停
const fullScreenPlay = () => {
  if (info.isPlay) {
    setExtraStyle('visibility: hidden;')
    //暂停
    danmakuFullRef.value.resize()
    danmakuFullRef.value.stop()
    // danmakuFullRef.value.pause()
    info.isPlay = false
  } else {
    setExtraStyle()
    //播放
    formatBarrage()
    danmakuFullRef.value.resize()
    danmakuFullRef.value.play()
    info.isPlay = true
  }
}

//设置额外样式
const setExtraStyle = (danmakuStyleExt: string = '') => {
  info.extraStyle = "color: " + info.textColor + ";font-size: " + info.textSize + "px"
  info.danmakuFullStyle = "z-index: 99; position: fixed; top: 0px; left: 0px; height:" + info.danmakuFullHeight + "; width:" + info.danmakuFullWidth + "; background-color:" + info.bgColor + ";" + danmakuStyleExt
}

//格式化弹幕
const formatBarrage = () => {
  info.barrage[0] = info.content
}

onBeforeMount(() => {
  setExtraStyle('visibility: hidden;')
})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <!-- 全屏 -->
    <vue-danmaku 
      ref="danmakuFullRef" 
      v-model:danmus="info.barrage" 
      loop 
      :autoplay="false"
      :speeds="info.speed"
      :channels="info.channels"
      :extraStyle='info.extraStyle'
      :style="info.danmakuFullStyle"
      @dblclick="fullScreenPlay"
      :useSlot="true"
    >
      <!-- 弹幕slot -->
      <template v-slot:dm="{ danmu }">
        <div class="" :style="info.extraStyle">
          <!-- <img class="img" :src="danmu.avatar" /> -->
          <!-- <span>{{ index }}{{ danmu.name }}：</span> -->
          <span>{{ danmu }}</span>
        </div>
      </template>
    </vue-danmaku>

    <div class="p-4 rounded-2xl bg-white">
      <div class="flex mb-2">
        <el-text class="w-20">弹幕内容:</el-text>
        <div class="w-72"><el-input v-model="info.content" type="textarea" rows="3"></el-input></div>
      </div>

      <div class="flex mb-2">
        <el-text class="w-20">播放速度:</el-text>
        <div class="w-72 ml-2"><el-slider v-model="info.speed" :min="1" :max="500"/></div>
      </div>

      <div class="flex mb-2">
        <el-text class="w-20">文字大小:</el-text>
        <div class="w-72 ml-2"><el-slider v-model="info.textSize" :min="12" :max="1000"/></div>
      </div>

      <div class="flex mb-2">
        <el-text class="w-20">文字颜色:</el-text>
        <div><el-color-picker v-model="info.textColor" size="large" @change="setExtraStyle()"/></div>
      </div>

      <div class="flex mb-2">
        <el-text class="w-20">背景颜色:</el-text>
        <div><el-color-picker v-model="info.bgColor" size="large" @change="setExtraStyle()"/></div>
      </div>

      <div>
        <el-button @click="fullScreenPlay" type="primary" class="mr-3">{{ info.isPlay == false ? '播放' : '暂停'}}</el-button>
        <el-text>双击可退出弹幕</el-text>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        手持弹幕是一种新型的互动沟通工具，可以方便地为各种户外活动、演出嘉年华等活动增加趣味性和互动性。手持弹幕具有轻便、易携带、易操作等优点，可以让每个参与者都变成活动的一部分。同时，手持弹幕还可以通过预先编写的文本、表情等形式，表达参与者的情感和想法，实现沟通互动。在社交媒体时代，手持弹幕的使用也带来了更广泛的社交效应，增加了活动的互动性和传播度。无论是举办方还是参与者，手持弹幕都是一个非常有价值的互动工具。
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>
.vue-danmaku .danmus .dm{
  top: 50% !important;
}
</style>