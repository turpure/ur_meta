import request from '@/utils/request'

// http://192.168.0.134:8089/v1/user/login 

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/v1/user/login',
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

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}