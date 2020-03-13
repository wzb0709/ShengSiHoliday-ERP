import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider } from 'antd'

import * as shopOrderServices from '@/services/order/shopping'
import * as commonServices from '@/services/common'
import OrderBasicInfo from '@/pages/order/orderBaiscInfo'
import FeeInfo from '@/pages/order/feeInfo'
import PaymentInfo from '@/pages/order/payment'
import NotesInfo from '@/pages/order/notes'
import ShoppingPackageInfo from '@/pages/order/shop/packageInfo'
import ProductInfo from '@/pages/order/productInfo'
import ShoppingProductInfo from '@/pages/order/shop/productInfo'
import ShoppingAddressInfo from '@/pages/order/shop/addressInfo'
import ShoppingExpressInfo from '@/pages/order/shop/expressInfo'

interface IProps {
  match:any
}

const ShoppingOrderDetail:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})

  const getBasicInfo = useCallback(() => {
    Promise.all([shopOrderServices.getShoppingOrderInfo(props.match.params.id),commonServices.getBasicOrderInfo(props.match.params.id)])
      .then(res => {
        const obj = {
          ...res[1],
          ...res[0],
        }
        setBasicInfo(obj)
      })
  },[props.match.params.id])

  useEffect(() => {
    getBasicInfo()
  },[getBasicInfo])

  return (
    <>
      <Card
        title='订单信息'
        extra={<>
          <a>跟踪记录</a>
        </>}
      >
        <OrderBasicInfo type={2} showSale={false} onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <ShoppingProductInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <ShoppingAddressInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <ShoppingExpressInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.order_id && <>
          <ShoppingPackageInfo id={basicInfo.order_id} pro_id={basicInfo.product_id}/>
          <FeeInfo id={basicInfo.order_id}/>
          <PaymentInfo id={basicInfo.order_id}/>
        </>}
        <NotesInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>
    </>
  )
}

export default ShoppingOrderDetail
