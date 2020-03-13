import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/product', name: '产品中心' },
    { path: '/product/car', name: '汽车租赁' },
    { path: '/product/car/:id', name: '租赁详情' },
    { path: '/product/oneDay', name: '一日游' },
    { path: '/product/oneDay/:id', name: '一日游详情' },
    { path: '/product/oneDay/:id/edit', name: '编辑基本信息' },
    { path: '/product/oneDay/:id/img', name: '编辑图文详情' },
    { path: '/product/oneDay/:id/plan', name: '计划管理' },
    { path: '/product/oneDay/:id/plan/add', name: '批量添加计划' },
    { path: '/product/oneDayManager', name: '一日游管理' },
    { path: '/product/oneDayManager/:id', name: '计划详情' },
    { path: '/product/oneDayManager/:id/edit', name: '编辑计划' },
    { path: '/product/shopping', name: '当地购物' },
    { path: '/product/shopping/:id', name: '当地购物详情' },
    { path: '/product/shopping/:id/edit', name: '编辑基本信息' },
    { path: '/product/shopping/:id/img', name: '编辑图文详情' },
    { path: '/product/party', name: '定制游' },
    { path: '/product/party/:id', name: '定制游详情' },
    { path: '/product/party/:id/img', name: '编辑图文详情' },
    { path: '/product/reception', name: '一团一议' },
    { path: '/product/reception/:id', name: '一团一议详情' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
