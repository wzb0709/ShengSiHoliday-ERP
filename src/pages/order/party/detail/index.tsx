import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider } from 'antd'

import * as partyOrderServices from '@/services/order/party'
import * as commonServices from '@/services/common'
import OrderBasicInfo from '@/pages/order/orderBaiscInfo'
import ProductInfo from '@/pages/order/party/productInfo'
import SalesmanInfo from '@/pages/order/salesman'
import TouristInfo from '@/pages/order/touristInfo'
import FeeInfo from '@/pages/order/feeInfo'
import PaymentInfo from '@/pages/order/payment'
import NotesInfo from '@/pages/order/notes'
import Progress from '@/pages/order/progress'

interface IProps {
  match:any
}

const PartyOrderDetail:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})
  const [visible,setVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    Promise.all([partyOrderServices.getPartyOrderInfo(props.match.params.id),commonServices.getBasicOrderInfo(props.match.params.id)])
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
          <a onClick={() => setVisible(true)}>跟踪记录</a>
          <Divider type='vertical' />
          <a>转让订单</a>
        </>}
      >
        <OrderBasicInfo type={3} showSale={true} onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <ProductInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <SalesmanInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.id && <>
          <TouristInfo id={basicInfo.order_id}/>
          <FeeInfo id={basicInfo.order_id}/>
          <PaymentInfo id={basicInfo.order_id}/>
        </>}
        <NotesInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>

      {visible && <Progress id={basicInfo.order_id} visible={visible} onCancel={() => setVisible(false)}/>}
    </>
  )
}

export default PartyOrderDetail
