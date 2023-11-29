//创建tools相关的小工具
import { defineStore } from 'pinia'
import { getTools, getToolCate} from '@/api/tools'
import type { ToolsReqData, ToolsInfo, ToolCate } from '@/api/tools/type'

export const useToolsStore = defineStore('tools', {
  //用来存放变量
  state: () => ({
    list: [] as ToolsInfo[],
    cates: [] as ToolCate[],
  }),
  //方法
  actions: {
    //获取tools
    async getTools(data: ToolsReqData) {
      //发送请求
      const result: any = await getTools(data)
      if (result.code == 200) {
          this.list = result.data
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取tools cate
    async getToolCate() {
      //发送请求
      const result: any = await getToolCate()
      if (result.code == 200) {
          this.cates = result.data
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  }
})