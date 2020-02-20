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
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: './index' },
        { path: '/login', component: './login/index' },
        { path: '/market', component: './market/breadcrumb' ,routes:[
            {path:'/market/ad',component:'./market/ad/adLocation'},
            {path:'/market/ad/:id',component:'./market/ad/adInfo/adInfo'}
          ]
        },
        { path: '/product', component: './product/breadcrumb' ,routes:[
            {path:'/product/oneDay',component:'./product/oneDay/oneDay'},
            {path:'/product/oneDay/:id',component:'./product/oneDay/oneDayDetail'},
            {path:'/product/oneDay/:id/plan',component:'./product/oneDayManager/datePlan'},
            {path:'/product/oneDay/:id/edit',component:'./product/oneDay/oneDayEdit'},
            {path:'/product/oneDay/:id/img',component:'./imgList'},
            {path:'/product/oneDayManager',component:'./product/oneDayManager/oneDayManager'},
            {path:'/product/oneDayManager/:id',component:'./product/oneDayManager/detail'},
            {path:'/product/oneDayManager/:id/edit',component:'./product/oneDayManager/detail/detailEdit'},
            {path:'/product/party',component:'./product/party/party'},
            {path:'/product/party/:id',component:'./product/party/partyDetail'},
            {path:'/product/party/:id/img',component:'./imgList'},
            {path:'/product/car',component:'./product/car/car'},
            // {path:'/product/car/:id',component:'./product/car/car'}
          ]
        },
        { path: '/basic', component: './basic/breadcrumb' ,routes:[
            {path:'/basic/food',component:'./basic/food'},
            {path:'/basic/food/:id',component:'./basic/food/detail'},
            {path:'/basic/attraction',component:'./basic/attraction'},
            {path:'/basic/attraction/:id',component:'./basic/attraction/detail'},
          ]},
        { path: '/system', component: './system/breadcrumb' ,routes:[
            {path:'/system/auth',component:'./system/auth'},
            {path:'/system/character',component:'./system/character'},
            {path:'/system/member',component:'./system/user'},
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
