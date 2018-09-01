import request from '@/utils/request'

// section 部门 http://192.168.0.134:8089/v1/condition/index
export function getSection() {
  return request({
    url: '/condition/department',
    method: 'get'
  })
}

// platform 平台 http://192.168.0.134:8089/v1/condition/plat
export function getPlatform() {
  return request({
    url: '/condition/plat',
    method: 'get'
  })
}
// member 销售员 http://192.168.0.134:8089/v1/condition/member
export function getMember() {
  return request({
    url: '/condition/member',
    method: 'get'
  })
}

// store 仓库 http://192.168.0.134:8089/v1/condition/store

export function getStore() {
  return request({
    url: '/condition/store',
    method: 'get'
  })
}

// account 账号 http://192.168.0.134:8089/v1/condition/account

export function getAccount() {
  return request({
    url: '/condition/account',
    method: 'get'
  })
}

export function getExchange() {
  return request({
    url: '/upload/exchange',
    method: 'get'
  })
}
// name:sales method:post url:http://192.168.0.134:8089/v1/report/sales

export function getSales(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/sales',
    method: 'post',
    data
  })
}

export function getDevelop(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/develop',
    method: 'post',
    data
  })
}

export function getPurchase(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/purchase',
    method: 'post',
    data
  })
}

export function getPossess(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/possess',
    method: 'post',
    data
  })
}
export function getEbaysales(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/ebay-sales',
    method: 'post',
    data
  })
}
export function getSalestrend(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/sales-trend',
    method: 'post',
    data
  })
}
export function getArtist(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/artist',
    method: 'post',
    data
  })
}
export function getaccount(param) {
  const data = { 'condition': param }
  return request({
    url: '/report/account',
    method: 'post',
    data
  })
}

export function getSalesdeadfee(param) {
  const data = { 'condition': param }
  return request({
    url: '/upload/sales-dead-fee',
    method: 'post',
    data
  })
}
export function getUpdateexchange(param) {
  const data = { 'condition': param }
  return request({
    url: '/upload/exchange',
    method: 'post',
    data
  })
}
export function getToolaccount(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/account',
    method: 'post',
    data
  })
}
export function getToolsite() {
  return request({
    url: '/tool/site',
    method: 'post'
  })
}
export function getToolsize() {
  return request({
    url: '/tool/size',
    method: 'post'
  })
}
export function getToolcolor() {
  return request({
    url: '/tool/color',
    method: 'post'
  })
}
export function geteBaytemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/ebay-template',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  }).then(res => {
    debugger
    const blob = new Blob([res.data], { 'type': 'application/vnd.ms-excel;charset=UTF-8' })
    const objectUrl = URL.createObjectURL(blob)
    return objectUrl
  })
}

export function geteBaysku(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/ebaysku',
    method: 'post',
    data
  })
}

export function geteBayskutemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/ebaysku-template',
    method: 'post',
    data
  })
}
export function getsmtsku(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/smtsku',
    method: 'post',
    data
  })
}
export function getsmtskutemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/smtsku-template',
    method: 'post',
    data
  })
}
export function getwishsku(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/wishsku',
    method: 'post',
    data
  })
}
export function getwishskutemplate(param) {
  const data = { 'condition': param }
  return request({
    url: '/tool/wishsku-template',
    method: 'post',
    data
  })
}
