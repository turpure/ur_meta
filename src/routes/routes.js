import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'

import sell from '../views/reports/sell.vue'
import develop from '../views/reports/develop.vue'
import purchase from '../views/reports/purchase.vue'
import artist from '../views/reports/artist.vue'
import account from '../views/reports/account.vue'
import trending from '../views/reports/trending.vue'
import fixed from '../views/reports/fixed.vue'
import operate from '../views/reports/operate.vue'
import dollar from '../views/reports/dollar.vue'
import index from '../views/reports/index.vue'

import ebay from '../views/tool/ebay.vue'
import ebaysku from '../views/tool/ebaysku.vue'
import wishsku from '../views/tool/wishsku.vue'
import smtsku from '../views/tool/smtsku.vue'
import inlineEditTable from '../views/tool/inlineEditTable.vue'
import wishskuEdit from '../views/tool/wishskuEdit.vue'


const routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
},
{
    path: '/404',
    component: NotFound,
    name: '主页'
},
{
    path: '/',
    component: Home,
    name: '毛利润报表',
    iconCls: 'el-icon-message',
    children: [{
        path: '/v1/report/sales',
        component: sell,
        name: '销售毛利润报表'
    },  
    {
        path: '/develop',
        component: develop,
        name: '开发毛利润报表'
    },
    {
        path: '/purchase',
        component: purchase,
        name: '采购毛利润报表'
    },
    {
        path: '/artist',
        component: artist,
        name: '美工毛利润报表'
    },
    {
        path: '/v1/report/account',
        component: account,
        name: '账号产品利润报表',
    },
    {
        path: '/v1/report/sales-trend',
        component: trending,
        name: '销售额走势'
    },
    {
        path: '/fixed',
        component: fixed,
        name: '死库费用'
    },
    {
        path: '/operate',
        component: operate,
        name: '运营杂费'
    },
    {
        path: '/dollar',
        component: dollar,
        name: '美元汇率'
    },
    {
        path: '/index',
        component: index,
        hidden: true
    }
    ]
},
{
    path: '/',
    component: Home,
    name: '销售工具',
    iconCls: 'el-icon-message',
    children: [{
        path: '/v1/tool/ebay-template',
        component: ebay,
        name: 'eBay销售工具'
    },
    {
        path: '/v1/tool/ebaysku-template',
        component: ebaysku,
        name: 'eBay工具'
    },
    {
        path: '/v1/tool/wishsku-template',
        component: wishsku,
        name: 'Wish工具'
    },
    {
        path: '/v1/tool/smtsku-template',
        component: smtsku,
        name: 'SMT工具'
    },
    {
        path: '/inlineEditTable',
        component: inlineEditTable,
        hidden: true
    },
    {
        path: '/wishskuEdit',
        component: wishskuEdit,
        hidden: true
    }
    ]
},
{
    path: '*',
    hidden: true,
    redirect: {
        path: '/404'
    }
}
]

export default routes
