import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'

import sell from '../views/reports/sell.vue'
import develop from '../views/reports/develop.vue'
import purchase from '../views/reports/purchase.vue'
import artist from '../views/reports/artist.vue'
import account from '../views/reports/account.vue'
import trending from '../views/reports/trending.vue'
import index from '../views/reports/index.vue'
import introduce from '../views/reports/introduce.vue'

import stock from '../views/data/stock.vue'
import pcost from '../views/data/pcost.vue'
import perform from '../views/data/perform.vue'
import psales from '../views/data/psales.vue'

import ebay from '../views/tool/ebay.vue'
import ebaysku from '../views/tool/ebaysku.vue'
import wishsku from '../views/tool/wishsku.vue'
import smtsku from '../views/tool/smtsku.vue'

import express from '../views/tinytool/express.vue'
import brand from '../views/tinytool/brand.vue'
import fyndiqzUpload from '../views/tinytool/fyndiqzUpload.vue'
import requirements from '../views/feedback/requirements.vue'
import goods from '../views/tinytool/goods.vue'

import deadFee from '../views/settings/deadFee.vue'
import operationFee from '../views/settings/operationFee.vue'
import exchange from '../views/settings/exchange.vue'

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
  path: '/site/index',
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
    path: '/v1/report/introduce',
    component: introduce,
    name: '推荐人毛利报表'
  },
  {
    path: '/v1/report/account',
    component: account,
    name: '账号产品利润报表'
  },
  {
    path: '/v1/report/sales-trend',
    component: trending,
    name: '销售额走势'
  },
  {
    path: '/index',
    component: index,
    hidden: true
  }
  ]
},
{
  path: '/v1/data-center/options',
  component: Home,
  name: '数据中心',
  iconCls: 'el-icon-message',
  children: [
    {
      path: '/v1/perform/cost',
      component: pcost,
      name: '平台物流费用'
    },
    {
      path: '/v1/data-center/out-of-stock-info',
      component: stock,
      name: '缺货产品分析'
    },
    {
      path: '/v1/perform/perform',
      component: perform,
      name: '新品开发表现'
    },
    {
      path: '/v1/perform/sales',
      component: psales,
      name: '销售变化表'
    }
  ]
},
{
  path: '/site/index',
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
  }
  ]
},
{
  path: '/v1/settings/options',
  component: Home,
  name: '设置中心',
  iconCls: 'el-icon-message',
  children: [
    {
      path: '/v1/settings/dev-dead-fee',
      component: deadFee,
      name: '死库费用'
    },
    {
      path: '/v1/settings/dev-operate-fee',
      component: operationFee,
      name: '运营杂费'
    },
    {
      path: '/v1/settings/exchange',
      component: exchange,
      name: '美元设置'
    }
  ]
},
{
  path: '/v1/feedback/index',
  component: Home,
  name: '反馈中心',
  iconCls: 'el-icon-message',
  children: [
    {
      path: '/v1/requirements/index',
      component: requirements,
      name: '需求管理'
    }
  ]
},
{
  path: '/v1/tiny-tool/options',
  component: Home,
  name: 'UR小工具',
  iconCls: 'el-icon-message',
  children: [
    {
      path: '/v1/tiny-tool/express',
      component: express,
      name: '物流查询网址'
    },
    {
      path: '/v1/tiny-tool/brand',
      component: brand,
      name: '品牌列表'
    },
    {
      path: '/v1/tiny-tool/goods-picture',
      component: goods,
      name: '产品一览表'
    },
    {
      path: '/v1/tiny-tool/fyndiqz-upload',
      component: fyndiqzUpload,
      name: '产品上传'
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
