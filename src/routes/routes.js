import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

import sell from '../views/reports/sell.vue'
import develop from '../views/reports/develop.vue'
import purchase from '../views/reports/purchase.vue'
import artist from '../views/reports/artist.vue'
import ebaysell from '../views/reports/ebaysell.vue'
import trending from '../views/reports/trending.vue'
import fixed from '../views/reports/fixed.vue'
import operate from '../views/reports/operate.vue'
import dollar from '../views/reports/dollar.vue'
import warehouse from '../views/reports/warehouse.vue'

const routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
},
{
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
},
{
    path: '/',
    component: Home,
    name: '毛利率报表',
    iconCls: 'el-icon-message',
    children: [{
        path: '/sell',
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
        path: '/ebaysell',
        component: ebaysell,
        name: 'ebay销售毛利润报表'
    },
    {
        path: '/trending',
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
    }
        // {
        //   path: '/warehouse',
        //   component: warehouse,
        //   name: '仓储'
        // }
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
