import request from '@/utils/request'

export function login(username, password, type) {
    const data = {
        username,
        password,
        type
    }
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
}
export function queryUserInfo(token) {
    return request({
        url: '/user/queryUserInfo',
        method: 'post',
        params: {token}
    })
}
export function loginByCode(openid) {
    return request({
      url: '/user/loginByCode',
      method: 'post',
      data: {openid}
    })
}

export function logout(account) {
    return request({
        url: '/user/logout',
        method: 'post',
        params: {account}
    })
}
export function regAction(data) {
    return request({
        url: '/user/regAction',
        method: 'post',
        data
    })
}

