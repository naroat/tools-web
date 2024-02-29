import { ResponseData } from "../common"

export interface ToolsReqData {
  cateId: number,
  title: string,
  route: string,
}

//tools
export interface ToolsInfo {
  id: number,
  title: string,
  logo: string,
  desc: string,
  url: string,
  cate: string
}

//tools cate
export interface ToolCate {
  id: number,
  title: string,
  img: string,
  desc: string,
  url: string,
  cate: string,
  list: ToolsInfo[]
}

export interface CollectReqData {
  toolId: number
}

//tools list response
export interface ToolsResponseData extends ResponseData {
  data: ToolsInfo[]
}

//tools cate response
export interface ToolCateResponseData extends ResponseData {
  data: ToolCate[]
}

//tools recommend response
export interface ToolRecommendResponseData extends ResponseData {
  data: ToolsInfo[]
}

//tools collect response
export interface ToolCollectResponseData extends ResponseData {

}

//get collect response
export interface GetToolCollectResponseData extends ResponseData {

}