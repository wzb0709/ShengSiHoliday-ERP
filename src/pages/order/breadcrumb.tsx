import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/order', name: '订单中心' },
    { path: '/order/get', name: '待认领订单' },
    { path: '/order/oneDay', name: '一日游订单' },
    { path: '/order/oneDay/:id', name: '一日游订单详情' },
    { path: '/order/car', name: '汽车租赁订单' },
    { path: '/order/car/:id', name: '汽车租赁订单详情' },
    { path: '/order/shopping', name: '当地购物订单' },
    { path: '/order/shopping/:id', name: '当地购物订单详情' },
    { path: '/order/party', name: '定制游订单' },
    { path: '/order/party/:id', name: '定制游订单详情' },
    { path: '/order/reception', name: '一团一议订单' },
    { path: '/order/reception/:id', name: '一团一议订单详情' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
