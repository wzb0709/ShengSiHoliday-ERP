import React, { FC, Fragment } from 'react'
import CBreadcrumb, { IRouterItem } from '@/component/breadcrumb'

const BreadcrumbLayout: FC = (props) => {

  const breadCrumb: Array<IRouterItem> = [
    { path: '/basic', name: '基础数据' },
    { path: '/basic/food', name: '美食林' },
    { path: '/basic/food/:id', name: '美食林详情' },
    { path: '/basic/attraction', name: '景点景区' },
    { path: '/basic/attraction/:id', name: '景点景区详情' },
    { path: '/basic/point', name: '汽车租赁点' },
    { path: '/basic/bus', name: '公交信息' },
  ]

  return (
    <Fragment>
      <CBreadcrumb routerList={breadCrumb}/>
      {props.children}
    </Fragment>
  )
}

export default BreadcrumbLayout
