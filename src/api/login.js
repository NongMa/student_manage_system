import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/pinfo/userLogin.do',
    method: 'post',
    data: {
      pAdmi: username,
      pPawo: password
    }
  })
}

export function register (username, password, college, sclass, type) {
  return request({
    url: '/pinfo/registerUser.do',
    method: 'post',
    data: {
      pAdmi: username,
      pPawo: password,
      pPost: college,
      pClass: sclass,
      type: type
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/pinfo/getUserInfo.do',
    method: 'post',
    data: { token }
  })
}

export function logout () {
  return request({
    url: '/pinfo/cancelUserInfo.do',
    method: 'post'
  })
}
