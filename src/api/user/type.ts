import { ResponseData } from "../common"

export interface LoginReqData {
  email: string,
  password: string
}

export interface RegisterReqData {
  email: string,
  code: string,
  password: string,
  password_confirmation: string
}

export interface ForgetReqData {
  email: string,
  code: string,
  password: string,
  password_confirmation: string
}

export interface sendCodeEmailReq {
  email: string
}

export interface LoginResponseData extends ResponseData {

}

export interface LogoutResponseData extends ResponseData {

}

export interface RegisterResponseData extends ResponseData {

}

export interface ForgetResponseData extends ResponseData {

}

export interface SendCodeEmailResponseData extends ResponseData {

}

export interface UserInfoResponseData extends ResponseData {

}

