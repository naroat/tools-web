//创建tools相关的小工具
import { defineStore } from 'pinia'
import type { ScanReqData, ScanFilePage, ScanTagInfo, UpdateTagReqData, ScanInfoReqData, ScanFileInfo } from '@/api/scan/type'
import { getList, getTags, updateTag, getInfo } from '@/api/scan'

export const useScanStore = defineStore('scan', {
  //用来存放变量
  state: () => ({
    list: {} as ScanFilePage,
    fileInfo: {} as ScanFileInfo, //当前文件信息
    fileInfoTags: [] as number[], //当期文件tags
    tags: [] as ScanTagInfo[],
    videoList: localStorage.getItem('videoList') !== null ? JSON.parse(localStorage.getItem('videoList') || '') : [], //播放列表，一般情况下同list
    playbackRate: 1.5,  //播放速度
    isRandPlay: false,  //是否随机播放
    extVideo: ['ts', 'mp4', 'mkv', 'wmv', 'avi', 'flv', '3gp', 'dvd', 'mov', 'vob', 'webm'], //视频格式
    sourceUrl: 'http://localhost:7881/',  //资源服务地址
    historyList: localStorage.getItem('historyList') !== null ? JSON.parse(localStorage.getItem('historyList') || '') : [],   //历史播放
  }),
  //方法
  actions: {
    //获取scan file list
    async getList(data: ScanReqData) {
      //发送请求
      const result: any = await getList(data)
      if (result.code == 200) {
          this.list = result.data
          localStorage.setItem('videoList', JSON.stringify(result.data.data))
          console.log(localStorage.getItem('videoList'))
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取scan file list
    async getInfo(data: ScanInfoReqData) {
      //发送请求
      const result: any = await getInfo(data)
      if (result.code == 200) {
          this.fileInfo = result.data
          this.fileInfoTags = this.fileInfo.tags
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //get tags
    async getTags() {
      //发送请求
      const result: any = await getTags()
      if (result.code == 200) {
          this.tags = result.data
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //收藏工具
    async updateTag(data: UpdateTagReqData) {
      const result: any = await updateTag(data)
      if (result.code == 200) {
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //设置播放列表
    // setVideoList() {

    // },
    //设置播放速度
    setPlaybackRate(number) {
      this.playbackRate = number
    },
    //当期那播放信息、索引获取和设置
    getNowPlay() {
      return localStorage.getItem('nowPlay') !== null ? JSON.parse(localStorage.getItem('nowPlay') || '') : {};
    },
    getNowIndex() {
      return localStorage.getItem('nowIndex') !== null ? JSON.parse(localStorage.getItem('nowIndex') || '') : 0;
    },
    setNowPlay(data) {
      localStorage.setItem('nowPlay', JSON.stringify(data))
    },
    setNowIndex(index) {
      localStorage.setItem('nowIndex', JSON.stringify(index))
    },
    //清除缓存
    cleanCache() {
      localStorage.removeItem('videoList');
      localStorage.removeItem('historyList');
    }
  }
})