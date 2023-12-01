//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  IpReqData,
  getIpResponseData
} from './type'

//项目用户相关的请求地址

enum API {
  //获取ip
  GET_IP = '/openapi/ip'
}
//获取ip
export const getIp = (data: IpReqData) => request.post<any, getIpResponseData>(API.GET_IP, data)