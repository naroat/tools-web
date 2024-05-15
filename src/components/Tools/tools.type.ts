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
export interface ToolsResponseData {
  data: ToolsInfo[]
}

//tools cate response
export interface ToolCateResponseData{
  data: ToolCate[]
}

//tools recommend response
export interface ToolRecommendResponseData{
  data: ToolsInfo[]
}