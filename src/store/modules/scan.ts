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
    tags: [] as ScanTagInfo[]
  }),
  //方法
  actions: {
    //获取scan file list
    async getList(data: ScanReqData) {
      //发送请求
      const result: any = await getList(data)
      if (result.code == 200) {
          this.list = result.data
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
  }
})