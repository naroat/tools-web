//创建tools相关的小工具
import { defineStore } from 'pinia'
import { getTools, getToolsCate } from '@/components/Tools/tools.ts'
import { getIp } from '@/api/ip'
import type { ToolsReqData, ToolsInfo } from '@/components/Tools/tools.type.ts'
import type { IpReqData, IpInfo } from '@/api/ip/type'
import type { WebInfo, WebInfoReqData } from '@/api/webinfo/type'
import { fetchWebInfo } from '@/api/webinfo'

export const useToolsStore = defineStore('tools', {
  //用来存放变量
  state: () => ({
    list: [] as ToolsInfo[],
    toolInfo: {} as ToolsInfo,
    cates: [] as any[],
    recommends: [] as ToolsInfo[],
    ipData: {} as IpInfo,
    webInfo: {} as WebInfo,
    collect: [] as ToolsInfo[],
    collectIds: [] as number[],
  }),
  //方法
  actions: {
    //获取tools
    async getTools(data: ToolsReqData) {
      //发送请求
      const result: any = await getTools(data)
      this.list = result
      return result
    },
    //获取tool info
    async getToolInfo(data: ToolsReqData) {
      //发送请求
      const result: any = await getTools(data)
      this.toolInfo = result
      return result
    },
    //获取tools cate
    async getToolCate() {
      //发送请求
      this.cates = await getToolsCate()
    },
    //获取ip
    async getIp(data: IpReqData) {
      const result: any = await getIp(data)
      if (result.code == 200) {
        this.ipData = result.data
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取网站信息
    async getWebInfo(data: WebInfoReqData) {
      const result: any = await fetchWebInfo(data)
      if (result.code == 200) {
        this.webInfo = result.data
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  }
})