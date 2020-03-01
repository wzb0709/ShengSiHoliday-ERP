import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/system', name: '系统管理' },
    { path: '/system/auth', name: '权限管理' },
    { path: '/system/department', name: '部门管理' },
    { path: '/system/character', name: '角色管理' },
    { path: '/system/user', name: '用户管理' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
