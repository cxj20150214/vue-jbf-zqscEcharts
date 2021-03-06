import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
export function getfoodList(data) {
  return request({
    url: '/vue-admin-template/food/list',
    method: 'get',
    data
  })
}

export function getModelInfo(data) {
  return request({
    url: 'http://172.20.10.5:10001/engine/getModelInfo?modelId=1',
    method: 'get',
    data
  })
}

export function getCode(data) {
  return request({
    url: '/vue-admin-template/food/list',
    method: 'get',
    data
  })
}