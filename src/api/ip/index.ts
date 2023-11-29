//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  getIpResponseData
} from './type'

//项目用户相关的请求地址

enum API {
  //获取ip
  GET_IP = '/v1/ip/get?ip='
}
//获取ip
export const getIp = (ip:string) => request.get<any, getIpResponseData>(API.GET_IP + ip)