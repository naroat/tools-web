import request from '@/utils/request'

import type {
  LoginReqData,
  LoginResponseData,
  LogoutResponseData,
  RegisterReqData,
  RegisterResponseData,
  SendCodeEmailResponseData,
  sendCodeEmailReq,
  UserInfoResponseData,
  ForgetReqData,
  ForgetResponseData
} from './type'

//项目用户相关的请求地址
enum API {
  //login
  LOGIN = '/login',
  //logout
  LOGOUT = '/logout',
  //register
  REGISTER = '/register',
  //forget
  FORGET = '/forget/password',
  //注册 - 发送邮箱验证码
  SEND_CODE_EMAIL = '/send/register/code',
  //忘记密码 - 发送邮箱验证码
  SEND_FORGET_CODE_EMAIL = '/send/forget/password/code',
  //获取用户信息
  USER_INFO = '/user/info'
}

//login
export const login = (data: LoginReqData) => request.post<any, LoginResponseData>(API.LOGIN, data)

//logout
export const logout = () => request.post<any, LogoutResponseData>(API.LOGOUT)

//register
export const register = (data: RegisterReqData) => request.post<any, RegisterResponseData>(API.REGISTER, data)

//forget
export const forget = (data: ForgetReqData) => request.post<any, ForgetResponseData>(API.FORGET, data)

//register - send code
export const sendCodeEmail = (data: sendCodeEmailReq) => request.post<any, SendCodeEmailResponseData>(API.SEND_CODE_EMAIL, data)

//forget - send code
export const sendForgetCodeEmail = (data: sendCodeEmailReq) => request.post<any, SendCodeEmailResponseData>(API.SEND_FORGET_CODE_EMAIL, data)

//获取用户信息
export const userInfo = () => request.get<any, UserInfoResponseData>(API.USER_INFO)