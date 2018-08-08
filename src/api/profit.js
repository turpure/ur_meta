import request from '@/utils/request'

// section 部门 http://192.168.0.134:8089/v1/condition/index
export function getSection() {
    return request({
        url: '/condition/department',
        method: 'get',
    })
}

// platform 平台 http://192.168.0.134:8089/v1/condition/plat 
export function getPlatform() {
    return request({
        url: '/condition/plat',
        method: 'get',
    })
}
//member 销售员 http://192.168.0.134:8089/v1/condition/member 
export function getMember() {
    return request({
        url: '/condition/member',
        method: 'get',
    })
}

//store 仓库 http://192.168.0.134:8089/v1/condition/store 

export function getStore() {
    return request({
        url: '/condition/store',
        method: 'get',
    })
}

// account 账号 http://192.168.0.134:8089/v1/condition/account

export function getAccount() {
    return request({
        url: '/condition/account',
        method: 'get',
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
    const data = { 'formdata': param }
    return request({
        url: '/upload/sales-dead-fee',
        method: 'post',
        data
    })
}