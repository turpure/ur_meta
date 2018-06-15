import request from '@/utils/request'


export function getUserName(){
    return request({
        url: 'v1/user/user-profile',
        method: 'get',
    })
}

export function getLeftSide(){
    return request({
        url: '/v1/menu',
        method: 'get',
    })
}