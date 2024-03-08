import { ResponseData } from "../common"

export interface WebInfoReqData {
  link: string
}

export interface WebInfo {
  link: string,
  logo: string,
  title: string,
  keywords: string,
  desc: string
}

//响应格式
export interface getWebInfoResponseData extends ResponseData {
  data: WebInfo
}