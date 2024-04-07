//请求响应的公共数据
export interface ResponseData {
  code: number,
  message: string,
}

//分页
export interface PageData {
  current_page: number,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
  to: number,
  total: number,
}