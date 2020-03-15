import { IConfig } from 'umi-types'

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  sass: {},
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'frame',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
    }],
  ],
  externals: { BMap: 'BMap' },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: './index' },
        { path: '/login', component: './login/index' },
        { path: '/market', component: './market/breadcrumb' ,routes:[
            {path:'/market/coupon',component:'./market/coupon'},
            {path:'/market/ad',component:'./market/ad/adLocation'},
            {path:'/market/ad/:id',component:'./market/ad/adInfo/adInfo'},
            {path:'/market/comment',component:'./market/comment'},
            {path:'/market/help',component:'./market/help'},
            {path:'/market/question',component:'./market/question'},
          ]
        },
        { path: '/money', component: './money/breadcrumb' ,routes:[
            {path:'/money/collection',component:'./money/collection'},
            {path:'/money/refund',component:'./money/refund'},
            {path:'/money/withdraw',component:'./money/withdraw'},
            {path:'/money/expense',component:'./money/expense'},
            {path:'/money/expense/:id',component:'./money/expense/detail'},
            {path:'/money/settle',component:'./money/settle'},
            {path:'/money/settle/:id',component:'./money/settle/detail'},
          ]
        },
        { path: '/order', component: './order/breadcrumb' ,routes:[
            {path:'/order/get',component:'./order/get'},
            {path:'/order/oneDay',component:'./order/oneDay'},
            {path:'/order/oneDay/:id',component:'./order/oneDay/detail'},
            {path:'/order/car',component:'./order/car'},
            {path:'/order/car/:id',component:'./order/car/detail'},
            {path:'/order/shopping',component:'./order/shop'},
            {path:'/order/shopping/:id',component:'./order/shop/detail'},
            {path:'/order/party',component:'./order/party'},
            {path:'/order/party/:id',component:'./order/party/detail'},
            {path:'/order/reception',component:'./order/reception'},
            {path:'/order/reception/:id',component:'./order/reception/detail'},
          ]
        },
        { path: '/product', component: './product/breadcrumb' ,routes:[
            {path:'/product/oneDay',component:'./product/oneDay/oneDay'},
            {path:'/product/oneDay/:id',component:'./product/oneDay/oneDayDetail'},
            {path:'/product/oneDay/:id/plan',component:'./product/oneDayManager/datePlanDetail'},
            {path:'/product/oneDay/:id/plan/add',component:'./product/oneDayManager/datePlan'},
            {path:'/product/oneDay/:id/edit',component:'./product/oneDay/oneDayEdit'},
            {path:'/product/oneDay/:id/img',component:'./imgList'},
            {path:'/product/oneDayManager',component:'./product/oneDayManager/oneDayManager'},
            {path:'/product/oneDayManager/:id',component:'./product/oneDayManager/detail'},
            {path:'/product/oneDayManager/:id/edit',component:'./product/oneDayManager/detail/detailEdit'},
            {path:'/product/shopping',component:'./product/shopping'},
            {path:'/product/shopping/:id',component:'./product/shopping/detail'},
            {path:'/product/shopping/:id/edit',component:'./product/shopping/detail/detailEdit'},
            {path:'/product/shopping/:id/img',component:'./imgList'},
            {path:'/product/party',component:'./product/party/party'},
            {path:'/product/party/:id',component:'./product/party/partyDetail'},
            {path:'/product/party/:id/img',component:'./imgList'},
            {path:'/product/car',component:'./product/car/car'},
            {path:'/product/reception',component:'./product/reception'},
            {path:'/product/reception/:id',component:'./product/reception/detail'},
          ]
        },
        { path: '/distribution', component: './distribution/breadcrumb' ,routes:[
            {path:'/distribution/manager',component:'./distribution/list'},
            {path:'/distribution/manager/:id',component:'./distribution/list/detail'},
          ]},
        { path: '/member', component: './member/breadcrumb' ,routes:[
            {path:'/member/manager',component:'./member/memberList'},
          ]},
        { path: '/administrative', component: './administrative/breadcrumb' ,routes:[
            {path:'/administrative/todo',component:'./administrative/todo'},
            {path:'/administrative/notice',component:'./administrative/notice'},
            {path:'/administrative/addressBook',component:'./administrative/addressBook'},
            {path:'/administrative/person',component:'./administrative/person'},
          ]},
        { path: '/data', component: './data/breadcrumb' ,routes:[
            {path:'/data/order',component:'./data/order'},
            {path:'/data/operation',component:'./data/operation'},
          ]},
        { path: '/team', component: './team/breadcrumb' ,routes:[
            {path:'/team/manager',component:'./team/manager'},
            {path:'/team/manager/:id',component:'./team/manager/detail'},
            {path:'/team/guide',component:'./team/guide'},
            {path:'/team/guide/:id',component:'./team/guide/detail'},
          ]},
        { path: '/basic', component: './basic/breadcrumb' ,routes:[
            {path:'/basic/bus',component:'./basic/bus'},
            {path:'/basic/point',component:'./basic/point'},
            {path:'/basic/food',component:'./basic/food'},
            {path:'/basic/food/:id',component:'./basic/food/detail'},
            {path:'/basic/attraction',component:'./basic/attraction'},
            {path:'/basic/attraction/:id',component:'./basic/attraction/detail'},
            {path:'/basic/attraction/:id/img',component:'./imgList'},
          ]},
        { path: '/system', component: './system/breadcrumb' ,routes:[
            {path:'/system/auth',component:'./system/auth'},
            {path:'/system/setting',component:'./system/config'},
            {path:'/system/character',component:'./system/character'},
            {path:'/system/member',component:'./system/user'},
            {path:'/system/department',component:'./system/department'},
          ]},
        { path: '/main/list', component: './main/index' },
        { path: '/sub', component: './sub/breadcrumb', routes: [
            { path: '/sub/list', component: './sub/index' },
            { path: '/sub/list/detail/:id', component: './sub/detail' },
          ],
        },
      ],
    },
  ],
}

export default config
