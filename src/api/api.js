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
  // const token = getMyToken()
  // return baseUrl + url + '?token=' + token
  return baseUrl + url
}

export function getHeaders() {
  const headers = Object
  headers.Authorization = 'Bearer ' + getMyToken()
  return headers
}
