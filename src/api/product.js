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
export function forwardList(param) {
  const data = { 'condition': param }
  return request({
    url: '/forward-develop/list?page='+param.page1,
    method: 'post',
    data
  })
}
export function forwardCreate(param) {
  const data = { 'condition': param }
  return request({
    url: '/forward-develop/create',
    method: 'post',
    data
  })
}
export function forwardUpdate(param) {
  const data = { 'condition': param }
  return request({
    url: '/forward-develop/update',
    method: 'put',
    data
  })
}
export function forwardSubmit(param) {
  const data = { 'condition': param }
  return request({
    url: '/forward-develop/submit',
    method: 'post',
    data
  })
}
export function reverseList(param) {
  const data = { 'condition': param }
  return request({
    url: '/backward-develop/list?page='+param.page2,
    method: 'post',
    data
  })
}
export function reverseCreate(param) {
  const data = { 'condition': param }
  return request({
    url: '/backward-develop/create',
    method: 'post',
    data
  })
}
export function reverseUpdate(param) {
  const data = { 'condition': param }
  return request({
    url: '/backward-develop/update',
    method: 'put',
    data
  })
}