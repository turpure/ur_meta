import request from '@/utils/request'

export function goodsList(param) {
  const data = { 'condition': param }
  return request({
    url: '/oa-goods/list?page='+param.page,
    method: 'post',
    data
  })
}
export function goodsCreate(param) {
  const data = { 'condition': param }
  return request({
    url: '/oa-goods/create',
    method: 'post',
    data
  })
}
export function goodsUpdate(param) {
  const data = { 'condition': param }
  return request({
    url: '/oa-goods/update',
    method: 'put',
    data
  })
}
export function goodsInfo(param) {
  const data = { 'condition': param }
  return request({
    url: '/oa-goods/info',
    method: 'post',
    data
  })
}
export function goodsDelete(param) {
  const data = { 'condition': param }
  return request({
    url: '/oa-goods/delete',
    method: 'delete',
    data
  })
}
export function goodsClaim(param) {
  const data = { 'condition': param }
  return request({
    url: '/oa-goods/claim',
    method: 'post',
    data
  })
}