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
            {path:'/product/oneDay/:id/edit',component:'./product/oneDay/oneDayEdit'},
            {path:'/product/oneDay/:id/img',component:'./imgList'},
            {path:'/product/party',component:'./product/party/party'},
            {path:'/product/party/:id',component:'./product/party/partyDetail'},
            {path:'/product/party/:id/img',component:'./imgList'},
            {path:'/product/car',component:'./product/car/car'},
            // {path:'/product/car/:id',component:'./product/car/car'}
          ]
        },
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
