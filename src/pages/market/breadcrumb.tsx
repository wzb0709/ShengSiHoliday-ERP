import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/market', name: '营销中心' },
    { path: '/market/ad', name: '广告管理' },
    { path: '/market/coupon', name: '优惠券管理' },
    { path: '/market/help', name: '小贴士管理' },
    { path: '/market/comment', name: '评价管理' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
