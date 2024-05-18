<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { useRouter } from "vue-router"
import { useScanStore } from '@/store/modules/scan'

// const router = useRouter()
const scanStore = useScanStore()

//video html element
const videoPlayerRef = ref()

//上一个
const playPreviousVideo = () => {
  var data = scanStore.historyList[scanStore.historyList.length - 2];
  videoPlayerRef.value.src = scanStore.sourceUrl + data.title;
  // console.log(videoPlayerRef.value.src)
  videoPlayerRef.value.load();
  videoPlayerRef.value.play();
  //记录当期播放
  scanStore.setNowPlay(data)
  // scanStore.setNowIndex(nextIndex)
  //刷新页面
  window.location.reload()
}

//下一个
const playNextVideo = () => {
  let nextIndex = scanStore.getNowIndex() + 1;
  if (scanStore.isRandPlay === false) {
    //随机播放,并且不能和当前相同TODO
    nextIndex = Math.floor(Math.random() * scanStore.videoList.length);
  }
  if (nextIndex < scanStore.videoList.length) {
    var data = scanStore.videoList[nextIndex];
    videoPlayerRef.value.src = scanStore.sourceUrl + data.title;
    videoPlayerRef.value.load();
    videoPlayerRef.value.play();
    //记录当期播放
    scanStore.setNowPlay(data)
    scanStore.setNowIndex(nextIndex)
    //刷新页面
    window.location.reload()
  } else {
    alert('没有下一个了')
  }
}

//能播放时触发
const canplay = () => {
  //更新历史播放
  //过滤重复信息
  let nowPlay = scanStore.getNowPlay()
  console.log(nowPlay.id)
  scanStore.historyList = scanStore.historyList.filter(item => item.id != nowPlay.id)
  scanStore.historyList.push(scanStore.getNowPlay())
  localStorage.setItem('historyList', JSON.stringify(scanStore.historyList))
}

//根据索引获取文件信息
// const getInfoByIndex = () => {
//   return scanStore.videoList[Number(scanStore.nowIndex)];
// }

//播放结束时触发
const ended = () => {
  //自动播放下一个
  playNextVideo()
}

onMounted(() => {
  console.log(scanStore.getNowPlay())
})

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <div class="ml-3">
      <router-link to="/" class="mr-3">
        <el-button>首页</el-button>
      </router-link>
      <el-button @click="playPreviousVideo">上一个</el-button>
      <el-button @click="playNextVideo">下一个</el-button>
      <div class="mt-3 mb-3">当前播放：{{ scanStore.getNowPlay().path }}</div>
      <video 
        ref="videoPlayerRef"
        :src="scanStore.sourceUrl + scanStore.getNowPlay().title" class="w-[850px] h-[500px]" 
        :autoplay="false"
        :playbackRate="scanStore.playbackRate"
        @canplay="canplay"
        @ended="ended"
        controls>
        您的浏览器不支持video
      </video>

    </div>

  </div>
</template>

<style scoped>

</style>