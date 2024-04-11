import { defineStore } from 'pinia'
export const useUserStore = defineStore('linux', {
  //用来存放变量
  state: () => ({

  }),
  //方法
  actions: {
    //获取tools
    async getCmds() {
      //发送请求
      // const result: any = await getTools(data)
      // if (result.code == 200) {

      //     return result.message
      // } else {
      //   return Promise.reject(new Error(result.message))
      // }
    },
  }
})