import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/administrative', name: '行政中心' },
    { path: '/administrative/todo', name: '待办事项' },
    { path: '/administrative/notice', name: '公告管理' },
    { path: '/administrative/addressBook', name: '通讯录' },
    { path: '/administrative/person', name: '个人资料' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
