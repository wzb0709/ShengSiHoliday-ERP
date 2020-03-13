import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/team', name: '团队中心' },
    { path: '/team/guide', name: '导游管理' },
    { path: '/team/guide/:id', name: '导游详情' },
    { path: '/team/manager', name: '团队管理' },
    { path: '/team/manager/:id', name: '团队详情' },
    { path: '/team/calendar', name: '导游日历' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
