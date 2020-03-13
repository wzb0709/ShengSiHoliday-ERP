import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/money', name: '财务中心' },
    { path: '/money/collection', name: '订单收款' },
    { path: '/money/withdraw', name: '提现管理' },
    { path: '/money/refund', name: '订单退款' },
    { path: '/money/settle', name: '三清单管理' },
    { path: '/money/settle/:id', name: '三清单详情' },
    { path: '/money/expense', name: '报销管理' },
    { path: '/money/expense/:id', name: '报销详情' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
