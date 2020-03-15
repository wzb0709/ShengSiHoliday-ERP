import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/data', name: '数据中心' },
    { path: '/data/order', name: '订单报表' },
    { path: '/data/operation', name: '运营报表' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
