import request from '@/utils/request'
import store from '@/store'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getMyToken() {
  return store.getters.token
}

export function isAdmin() {
  return store.getters.admin
}

export function uploadImage(avatar) {
  const data = {
    avatar
  }
  return request({
    url: '/user/avatar',
    method: 'post',
    data
  })
}

export function uploadFile() {
  const baseUrl = process.env.BASE_API
  const url = '/upload/sales-dead-fee'
  return baseUrl + url
}

export function getHeaders() {
  const headers = {}
  headers.Authorization = 'Bearer ' + getMyToken()
  return headers
}

export function getAvatarUrl() {
  const baseUrl = process.env.BASE_API
  const url = '/user/avatar'
  const token = getMyToken()
  return baseUrl + url + '?token=' + token
}

export function fyndiqz() {
  const baseUrl = process.env.BASE_API
  const url = '/tiny-tool/fyndiqz-upload'
  return baseUrl + url
}

export function getRequirementsDeal(condition) {
  return request({
    url: 'requirements/deal-list?name=' + condition.name + '&page=' + condition.page + '&pageSize=' + condition.pageSize + '&flag=' + condition.flag + '&type=' + condition.type + '&priority=' + condition.priority + '&status=' + condition.status + '&processingPerson=' + condition.processingPerson + '&creator=' + condition.creator + '&detail=' + condition.detail,
    method: 'get'
  })
}

export function getRequirementsIndex(condition) {
  return request({
    url: 'requirements/index?name=' + condition.name + '&page=' + condition.page + '&pageSize=' + condition.pageSize + '&flag=' + condition.flag + '&type=' + condition.type + '&priority=' + condition.priority + '&schedule=' + condition.schedule + '&detail=' + condition.detail,
    method: 'get'
  })
}

export function getRequirementsExamine(condition) {
  return request({
    url: 'requirements/examine-list?name=' + condition.name + '&page=' + condition.page + '&pageSize=' + condition.pageSize + '&flag=' + condition.flag + '&type=' + condition.type + '&priority=' + condition.priority + '&creator=' + condition.creator + '&detail=' + condition.detail,
    method: 'get'
  })
}

export function getExamine(data) {
  return request({
    url: '/requirements/examine',
    method: 'post',
    data
  })
}

export function createRequirements(data) {
  return request({
    url: '/requirements',
    method: 'post',
    data
  })
}

export function editRequirements(data) {
  return request({
    url: 'requirements/' + data.id,
    method: 'put',
    data
  })
}

export function deleteRequirements(id) {
  return request({
    url: 'requirements/' + id,
    method: 'delete'
  })
}

export function ShangHaiTarget() {
  return request({
    url: 'site/index',
    method: 'get'
  })
}

export function ZhengZhouTarget() {
  return request({
    url: 'site/sales',
    method: 'get'
  })
}

export function DepartTarget() {
  return request({
    url: 'site/depart',
    method: 'get'
  })
}

export function DeveloperTarget() {
  return request({
    url: 'site/develop',
    method: 'get'
  })
}

export function IndexPermission() {
  return request({
    url: 'site/permission',
    method: 'get'
  })
}
export function Risk() {
  return request({
    url: 'tiny-tool/risky-order',
    method: 'get'
  })
}
