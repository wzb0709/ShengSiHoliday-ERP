import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider } from 'antd'

import * as carOrderServices from '@/services/order/car'
import * as commonServices from '@/services/common'
import OrderBasicInfo from '@/pages/order/orderBaiscInfo'
import FeeInfo from '@/pages/order/feeInfo'
import PaymentInfo from '@/pages/order/payment'
import NotesInfo from '@/pages/order/notes'
import CarInfo from '@/pages/order/car/carInfo'
import RentalInfo from '@/pages/order/car/rental'
import PointInfo from '@/pages/order/car/point'
import Progress from '@/pages/order/progress'

interface IProps {
  match:any
}

const CarOrderDetail:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})
  const [visible,setVisible] = useState<boolean>(false)
  const [infoVisible,setInfoVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    Promise.all([carOrderServices.getCarOrderInfo(props.match.params.id),commonServices.getBasicOrderInfo(props.match.params.id)])
      .then(res => {
        const obj = {
          ...res[1],
          ...res[0],
        }
        setBasicInfo(obj)
      })
    setVisible(true)
    setVisible(false)
  },[props.match.params.id])

  useEffect(() => {
    getBasicInfo()
  },[getBasicInfo])

  return (
    <>
      <Card
        title='订单信息'
        extra={<>
          <a onClick={() => setInfoVisible(true)}>跟踪记录</a>
          <Divider type='vertical' />
          <a>查看合同</a>
        </>}
      >
        <OrderBasicInfo type={4} showSale={false} onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <CarInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <RentalInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <PointInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.order_id && !visible && <>
          <FeeInfo id={basicInfo.order_id}/>
          <PaymentInfo id={basicInfo.order_id}/>
        </>}
        <NotesInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>

      {infoVisible && <Progress id={basicInfo.order_id} visible={visible} onCancel={() => setInfoVisible(false)}/>}
    </>
  )
}

export default CarOrderDetail
