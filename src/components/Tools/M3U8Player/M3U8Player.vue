<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="input-section">
          <el-form label-position="top">
            <el-form-item :label="t('m3u8地址')">
              <el-input
                v-model="m3u8Url"
                :placeholder="t('请输入m3u8格式的视频地址')"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="loadVideo">{{ t("加载视频") }}</el-button>
              <el-button @click="clearUrl">{{ t("清空") }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="player-section">
          <div v-if="m3u8Url" class="player-container">
            <video 
              ref="videoPlayer" 
              class="video-js vjs-default-skin vjs-big-play-centered"
              controls
              preload="auto"
              width="100%"
              height="400"
            >
              <source :src="m3u8Url" type="application/x-mpegURL">{{ t("您的浏览器不支持HTML5视频播放。") }}</video>
          </div>
          <div v-else class="no-video">{{ t("请输入m3u8地址并点击加载视频") }}</div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线m3u8播放器，支持播放m3u8格式的视频流，可输入自定义m3u8地址进行播放，适用于直播流和视频点播场景。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref, onMounted } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "m3u8在线播放"

const m3u8Url = ref('');
const videoPlayer = ref<HTMLVideoElement | null>(null);

// 加载视频
const loadVideo = () => {
  if (!m3u8Url.value) {
    return;
  }
  
  // 重新加载视频元素
  if (videoPlayer.value) {
    videoPlayer.value.load();
  }
};

// 清空地址
const clearUrl = () => {
  m3u8Url.value = '';
};

// 示例地址
const exampleUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

onMounted(() => {
  // 加载示例地址
  m3u8Url.value = exampleUrl;
  loadVideo();
});
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-section {
  width: 100%;
}

.player-section {
  width: 100%;
  margin-top: 20px;
}

.player-container {
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
}

.no-video {
  text-align: center;
  color: #999;
  padding: 100px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* 确保视频播放器占满容器 */
:deep(.video-js) {
  width: 100% !important;
  height: 100% !important;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: column;
  }
  
  .input-section {
    width: 100%;
  }
  
  .player-section {
    width: 100%;
  }
}
</style>
