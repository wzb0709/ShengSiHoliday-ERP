export interface IMenuItem{
  title:string
  icon?:string
  id:number
  path:string
  children:Array<IMenuItem>
  auth?:number
}



export const menuList:Array<IMenuItem> = [
  {
    title: '首页',
    icon:'home',
    id:1,
    path:'/',
    children: [],
  },
  {
    title: '行政中心',
    icon:'notification',
    id:46,
    path:'administrative',
    children: [
      {
        title: '待办事项',
        children: [],
        id:47,
        path:'upcoming',
      },{
        title: '公告管理',
        children: [],
        id:48,
        path:'notice',
      },{
        title: '通讯录',
        children: [],
        id:49,
        path:'addressBook',
      }
    ],
  },
  {
    title: '产品中心',
    icon:'appstore',
    id:2,
    path:'product',
    children: [{
      title: '一日游',
      children: [],
      id:3,
      path:'oneDay',
    },{
      title: '一日游计划管理',
      children: [],
      id:4,
      path:'oneDayManager',
    },{
      title: '汽车租赁',
      children: [],
      id:5,
      path:'car',
    },{
      title: '当地购物',
      children: [],
      id:6,
      path:'shopping',
    },{
      title: '定制游',
      children: [],
      id:7,
      path:'party',
    },{
      title: '一团一议',
      children: [],
      id:45,
      path:'reception',
    }],
  },
  {
    title: '订单中心',
    icon:'profile',
    id:8,
    path:'order',
    children: [{
      title: '未认领订单',
      children: [],
      id:9,
      path:'get',
    },{
      title: '一日游',
      children: [],
      id:10,
      path:'oneDay',
    },{
      title: '汽车租赁',
      children: [],
      id:11,
      path:'car',
    },{
      title: '当地购物',
      children: [],
      id:12,
      path:'shopping',
    },{
      title: '定制游',
      children: [],
      id:13,
      path:'party',
    },{
      title: '一团一议',
      children: [],
      id:51,
      path:'reception',
    }],
  },
  {
    title: '会员中心',
    icon:'user',
    id:14,
    path:'member',
    children: [{
      title: '会员管理',
      children: [],
      id:15,
      path:'manager',
    }]
  },
  {
    title: '营销中心',
    icon:'rocket',
    id:16,
    path:'market',
    children: [{
      title: '优惠券管理',
      children: [],
      id:17,
      path:'coupon',
    },{
      title: '广告管理',
      children: [],
      id:18,
      path:'ad',
    },{
      title: '小贴士管理',
      children: [],
      id:19,
      path:'help',
    },{
      title: '评价管理',
      children: [],
      id:20,
      path:'comment',
    }]
  },
  {
    title: '财务中心',
    icon:'pay-circle',
    id:21,
    path:'money',
    children: [{
      title: '订单收款',
      children: [],
      id:22,
      path:'collection',
    },{
      title: '订单退款',
      children: [],
      id:23,
      path:'refund',
    },{
      title: '提现审核',
      children: [],
      id:24,
      path:'withdraw',
    },{
      title: '三清单',
      children: [],
      id:25,
      path:'threeList',
    }]
  },{
    title: '分销中心',
    icon:'apartment',
    id:26,
    path:'distribution',
    children: [{
      title: '分销商管理',
      children: [],
      id:27,
      path:'manager',
    }]
  },{
    title: '数据中心',
    icon:'bar-chart',
    id:28,
    path:'data',
    children: [{
      title: '订单报表',
      children: [],
      id:29,
      path:'order',
    },{
      title: '运营报表',
      children: [],
      id:30,
      path:'operation',
    }]
  },{
    title: '团队中心',
    icon:'team',
    id:31,
    path:'team',
    children: [{
      title: '导游排团',
      children: [],
      id:32,
      path:'guide',
    },{
      title: '团队管理',
      children: [],
      id:33,
      path:'manager',
    }]
  },{
    title: '基础数据',
    icon:'read',
    id:34,
    path:'basic',
    children: [{
      title: '美食林',
      children: [],
      id:35,
      path:'food',
    },{
      title: '景点景区',
      children: [],
      id:36,
      path:'attraction',
    },{
      title: '上车点',
      children: [],
      id:37,
      path:'point',
    },{
      title: '公交信息',
      children: [],
      id:39,
      path:'bus',
    }]
  },{
    title: '系统管理',
    icon:'setting',
    id:40,
    path:'system',
    children: [{
      title: '权限管理',
      children: [],
      id:41,
      path:'auth',
    },{
      title: '角色管理',
      children: [],
      id:42,
      path:'character',
    },{
      title: '部门管理',
      children: [],
      id:50,
      path:'department',
    },{
      title: '用户管理',
      children: [],
      id:43,
      path:'member',
    },{
      title: '配置管理',
      children: [],
      id:44,
      path:'setting',
    }]
  }
]
