import request from '@/utils/request'

// section 部门 http://192.168.0.134:8089/v1/condition/index
export function getSection(){
    return request({
        url: '/condition/index',
        method: 'get',
    })
}

// platform 平台 http://192.168.0.134:8089/v1/condition/plat 
export function getPlatform(){
    return request({
        url: '/condition/plat',
        method: 'get',
    })
}
//member 销售员 http://192.168.0.134:8089/v1/condition/member 
export function getMember(){
    return request({
        url: '/condition/member',
        method: 'get',
    })
}

//store 仓库 http://192.168.0.134:8089/v1/condition/store 

export function getStore(){
    return request({
        url: '/condition/store',
        method: 'get',
    })
}

// account 账号 http://192.168.0.134:8089/v1/condition/account

export function getAccount(){
    return request({
        url: '/condition/account',
        method: 'get',
    })
}