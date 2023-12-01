import { ResponseData } from "../common"

export interface IpReqData {
  ip: string
}

export interface IpInfo {
  ip: string,
  pos: string,
  isp: string
}

//响应格式
export interface getIpResponseData extends ResponseData {
  data: IpInfo
}