import { ResponseData, PageData } from "../common"

export interface ScanReqData {
  title: string,
  tags: string
}

export interface ScanInfoReqData {
  fileId: number,
}

export interface UpdateTagReqData {
  fileId: number,
  tagId: number
}

export interface ScanTagInfo {
  id: number,
  title: string,
  pid: number,
}

//file info
export interface ScanFileInfo {
  id: number,
  title: string,
  path: string,
  dir: string,
  ext: string,
  tags: number[],
  scan_tag: ScanTagInfo[]
}

export interface ScanFilePage extends PageData {
  data: ScanFileInfo[],
}

//tag info
export interface ScanTagInfo {
  id: number,
  title: string,
  pid: number,
  childTags: ScanTagInfo[]
}

//响应格式 - scan file
export interface getScanResponseData extends ResponseData {
  data: ScanFileInfo
}

//响应格式 - scan tag
export interface getScanTagResponseData extends ResponseData {
  data: ScanTagInfo
}

//响应格式 - update tag
export interface updateTagResponseData extends ResponseData {
}