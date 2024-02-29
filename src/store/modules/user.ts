import { defineStore } from 'pinia'
import { login, register, sendCodeEmail, userInfo, logout, sendForgetCodeEmail, forget} from '@/api/user'
import type { LoginReqData, LoginResponseData, RegisterReqData, RegisterResponseData, SendCodeEmailResponseData, sendCodeEmailReq, ForgetReqData } from '@/api/user/type'
export const useUserStore = defineStore('user', {
  //用来存放变量
  state: () => ({
    token: localStorage.getItem('TOKEN'),//token
    username: '',
    avatar: '',
    email: '',
  }),
  //方法
  actions: {
    //获取登录状态
    isLogin() {
      let flag = false;
      if (this.token != null && this.token != undefined && this.token != '') {
        flag = true;
      } 
      return flag;
    },
    //login
    async login(data: LoginReqData) {
      //发送请求
      const result: any = await login(data)
      if (result.code == 200) {
        //仓库存储token
        this.token = result.data.token
        //本地存储token
        localStorage.setItem('TOKEN', result.data.token)
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //logout
    async logout() {
      //发送请求
      const result: any = await logout()
      if (result.code == 200) {
        //本地存储token
        localStorage.setItem('TOKEN', '')
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //register
    async register(data: RegisterReqData) {
      //发送请求
      const result: any = await register(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //forget
    async forget(data: ForgetReqData) {
      //发送请求
      const result: any = await forget(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //register - send code email
    async sendCodeEmail(data: sendCodeEmailReq) {
      //发送请求
      const result: any = await sendCodeEmail(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //forget - send code email
    async sendForgetCodeEmail(data: sendCodeEmailReq) {
      //发送请求
      const result: any = await sendForgetCodeEmail(data)
      if (result.code == 200) {
          return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取用户信息
    async userInfo() {
      if (this.token?.length == 0) {
        return
      }
      //发送请求
      const result: any = await userInfo()
      if (result.code == 200) {
        this.username = result.data.nick_name
        this.avatar = result.data.avatar
        this.email = result.data.email
        return result.message
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  }
})