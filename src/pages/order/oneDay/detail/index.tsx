import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider } from 'antd'

import * as oneDayOrderServices from '@/services/order/oneDay'
import * as commonServices from '@/services/common'
import OrderBasicInfo from '@/pages/order/orderBaiscInfo'
import CarPoint from '@/pages/order/carPoint'
import ProductInfo from '@/pages/order/productInfo'
import SalesmanInfo from '@/pages/order/salesman'
import PackageInfo from '@/pages/order/packageInfo'
import OtherPackageInfo from '@/pages/order/otherPackageInfo'
import TouristInfo from '@/pages/order/touristInfo'
import FeeInfo from '@/pages/order/feeInfo'
import PaymentInfo from '@/pages/order/payment'
import NotesInfo from '@/pages/order/notes'

interface IProps {
  match:any
}

const OneDayOrderDetail:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})

  const getBasicInfo = useCallback(() => {
    Promise.all([oneDayOrderServices.getOneDayOrderInfo(props.match.params.id),commonServices.getBasicOrderInfo(props.match.params.id)])
      .then(res => {
       const obj = {
         ...res[0],
         ...res[1]
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
          <Divider type='vertical' />
          <a>转让订单</a>
          <Divider type='vertical' />
          <a>查看合同</a>
        </>}
      >
        <OrderBasicInfo onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <CarPoint basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <ProductInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <SalesmanInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.id && <>
          <PackageInfo id={basicInfo.id} date_id={basicInfo.date_id}/>
          <OtherPackageInfo id={basicInfo.id} pro_id={basicInfo.product_id}/>
          <TouristInfo id={basicInfo.id}/>
          <FeeInfo id={basicInfo.id}/>
          <PaymentInfo id={basicInfo.id}/>
        </>}
        <NotesInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>
    </>
  )
}

export default OneDayOrderDetail
