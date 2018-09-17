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

export function getRequirements() {
  return request({
    url: '/requirements',
    method: 'get'
  })
}

export function createRequirements(data) {
  return request({
    url: '/requirements',
    method: 'post',
    data
  })
}

