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
    auth:10,
    children: [
      {
        title: '待办事项',
        children: [],
        id:47,
        path:'todo',
        auth:11,
      },{
        title: '公告管理',
        children: [],
        id:48,
        path:'notice',
        auth:12,
      },{
        title: '通讯录',
        children: [],
        id:49,
        path:'addressBook',
        auth:13
      },{
        title: '个人资料',
        children: [],
        id:54,
        path:'person',
        auth:14
      }
    ],
  },
  {
    title: '产品中心',
    icon:'appstore',
    id:2,
    path:'product',
    auth:2,
    children: [{
      title: '一日游',
      children: [],
      id:3,
      path:'oneDay',
      auth:15,
    },{
      title: '一日游计划管理',
      children: [],
      id:4,
      path:'oneDayManager',
      auth:16,
    },{
      title: '汽车租赁',
      children: [],
      id:5,
      path:'car',
      auth:17,
    },{
      title: '当地购物',
      children: [],
      id:6,
      path:'shopping',
      auth:18,
    },{
      title: '定制游',
      children: [],
      id:7,
      path:'party',
      auth:19,
    },{
      title: '一团一议',
      children: [],
      id:45,
      path:'reception',
      auth:20,
    }],
  },
  {
    title: '订单中心',
    icon:'profile',
    id:8,
    path:'order',
    auth:3,
    children: [{
      title: '未认领订单',
      children: [],
      id:9,
      path:'get',
      auth:21,
    },{
      title: '一日游',
      children: [],
      id:10,
      path:'oneDay',
      auth:22,
    },{
      title: '汽车租赁',
      children: [],
      id:11,
      path:'car',
      auth:23,
    },{
      title: '当地购物',
      children: [],
      id:12,
      path:'shopping',
      auth:24,
    },{
      title: '定制游',
      children: [],
      id:13,
      path:'party',
      auth:25,
    },{
      title: '一团一议',
      children: [],
      id:51,
      path:'reception',
      auth:26,
    }],
  },
  {
    title: '会员中心',
    icon:'user',
    id:14,
    path:'member',
    auth:3,
    children: [{
      title: '会员管理',
      children: [],
      id:15,
      auth:3,
      path:'manager',
    }]
  },
  {
    title: '营销中心',
    icon:'rocket',
    id:16,
    path:'market',
    auth:27,
    children: [{
      title: '优惠券管理',
      children: [],
      id:17,
      path:'coupon',
      auth:28,
    },{
      title: '广告管理',
      children: [],
      id:18,
      path:'ad',
      auth:29,
    },{
      title: '小贴士管理',
      children: [],
      id:19,
      path:'help',
      auth:30,
    },{
      title: '评价管理',
      children: [],
      id:20,
      path:'comment',
      auth:31,
    },{
      title: '常见问题',
      children: [],
      id:53,
      path:'question',
      auth:32,
    }]
  },
  {
    title: '财务中心',
    icon:'pay-circle',
    id:21,
    path:'money',
    auth:33,
    children: [{
      title: '订单收款',
      children: [],
      id:22,
      path:'collection',
      auth:34,
    },{
      title: '订单退款',
      children: [],
      id:23,
      path:'refund',
      auth:35,
    },{
      title: '提现审核',
      children: [],
      id:24,
      path:'withdraw',
      auth:36,
    },{
      title: '报销管理',
      children: [],
      id:55,
      path:'expense',
      auth:37,
    },{
      title: '我的报销',
      children: [],
      id:56,
      path:'myExpense',
      auth:38,
    },{
      title: '三清单',
      children: [],
      id:25,
      path:'settle',
      auth:39,
    }]
  },{
    title: '分销中心',
    icon:'apartment',
    id:26,
    path:'distribution',
    auth:5,
    children: [{
      title: '分销商管理',
      children: [],
      id:27,
      path:'manager',
      auth:5,
    }]
  },{
    title: '数据中心',
    icon:'bar-chart',
    id:28,
    path:'data',
    auth:40,
    children: [{
      title: '订单报表',
      children: [],
      id:29,
      path:'order',
      auth:41,
    },{
      title: '运营报表',
      children: [],
      id:30,
      path:'operation',
      auth:42,
    }]
  },{
    title: '团队中心',
    icon:'team',
    id:31,
    path:'team',
    auth:43,
    children: [{
      title: '导游管理',
      children: [],
      id:32,
      path:'guide',
      auth:44,
    },{
      title: '团队管理',
      children: [],
      id:33,
      path:'manager',
      auth:45,
    },{
      title: '导游日历',
      children: [],
      id:52,
      path:'calendar',
      auth:46,
    }]
  },{
    title: '基础数据',
    icon:'read',
    id:34,
    path:'basic',
    auth:47,
    children: [{
      title: '美食林',
      children: [],
      id:35,
      path:'food',
      auth:48,
    },{
      title: '景点景区',
      children: [],
      id:36,
      path:'attraction',
      auth:49,
    },{
      title: '上车点',
      children: [],
      id:37,
      path:'point',
      auth:50,
    },{
      title: '公交信息',
      children: [],
      id:39,
      path:'bus',
      auth:51,
    }]
  },{
    title: '系统管理',
    icon:'setting',
    id:40,
    path:'system',
    auth:7,
    children: [{
      title: '权限管理',
      children: [],
      id:41,
      path:'auth',
      auth:52,
    },{
      title: '角色管理',
      children: [],
      id:42,
      path:'character',
      auth:53,
    },{
      title: '部门管理',
      children: [],
      id:50,
      path:'department',
      auth:54,
    },{
      title: '用户管理',
      children: [],
      id:43,
      path:'member',
      auth:55,
    },{
      title: '配置管理',
      children: [],
      id:44,
      path:'setting',
      auth:56,
    }]
  }
]
