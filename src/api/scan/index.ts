//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  ScanReqData,
  UpdateTagReqData,
  getScanResponseData,
  getScanTagResponseData,
  updateTagResponseData,
  ScanInfoReqData,
  ScanFileInfo
} from './type'

//项目用户相关的请求地址

enum API {
  //获取scan列表
  SCAN_FILE = '/scans',
  //获取scan信息
  SCAN_FILE_INFO = '/scans',
  //获取标签
  SCAN_TAGS = '/scan/tags',
  //更新标签
  UPDATE_TAG = '/scan/tag/updates',
}
//获取scan file
export const getList = (data: ScanReqData) => request.get<any, getScanResponseData>(API.SCAN_FILE, {
  params: data
})
//获取scan file
export const getInfo = (data: ScanInfoReqData) => request.get<any, ScanFileInfo>(API.SCAN_FILE_INFO + '/' + data.fileId)
//获取scan tags
export const getTags = () => request.get<any, getScanTagResponseData>(API.SCAN_TAGS)
//更新标签
export const updateTag = (data: UpdateTagReqData) => request.post<any, updateTagResponseData>(API.UPDATE_TAG, data)