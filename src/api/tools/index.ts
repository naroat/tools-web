//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  ToolsReqData,
  ToolsResponseData,
  ToolCateResponseData,
  ToolRecommendResponseData,
  ToolCollectResponseData,
  CollectReqData,
  GetToolCollectResponseData
} from './type'

//项目用户相关的请求地址
enum API {
  //获取tools
  GET_TOOLS = '/tools',
  //获取tool cate
  GET_TOOL_CATES = '/tool/cates',
  //获取推荐
  GET_TOOL_RECOMMEND = '/tool/recommends',
  //收藏工具
  COLLECT = '/tool/collects',
  //我的收藏
  GET_TOOL_COLLECTS = '/get/tool/collects',
}
//获取tools
export const getTools = (data: ToolsReqData) => request.get<any, ToolsResponseData>(API.GET_TOOLS, {
  params: data
})
//获取tool cate
export const getToolCate = () => request.get<any, ToolCateResponseData>(API.GET_TOOL_CATES)
//获取推荐
export const getToolRecommend = () => request.get<any, ToolRecommendResponseData>(API.GET_TOOL_RECOMMEND)
//收藏工具
export const toolCollect = (data: CollectReqData) => request.post<any, ToolCollectResponseData>(API.COLLECT + '/' + data.toolId)
//我的收藏
export const getToolCollect = () => request.get<any, GetToolCollectResponseData>(API.GET_TOOL_COLLECTS)