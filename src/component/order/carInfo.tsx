import React, { FC, useCallback, useEffect, useState } from 'react'
import * as commonServices from '@/services/common'
import { Card, Divider, Modal } from 'antd'
import OrderBasicInfo from '@/pages/order/orderBaiscInfo'
import FeeInfo from '@/pages/order/feeInfo'
import PaymentInfo from '@/pages/order/payment'
import NotesInfo from '@/pages/order/notes'
import RentalInfo from '@/pages/order/car/rental'
import PointInfo from '@/pages/order/car/point'
import * as carOrderServices from '@/services/order/car'
import CarInfo from '@/pages/order/car/carInfo'

interface IProps {
  id:string
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
}

const CarOrderInfo:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})
  const [visible,setVisible] = useState<boolean>(false)
  const [infoVisible,setInfoVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    Promise.all([carOrderServices.getCarOrderInfo(props.id),commonServices.getBasicOrderInfo(props.id)])
      .then(res => {
        const obj = {
          ...res[1],
          ...res[0],
        }
        setBasicInfo(obj)
      })
    setVisible(true)
    setVisible(false)
  },[props.id])

  useEffect(() => {
    getBasicInfo()
  },[getBasicInfo])

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='订单详情'
      width={1200}
      destroyOnClose={true}
      footer={null}
    >
      <Card
        title='订单信息'
      >
        <OrderBasicInfo cantEdit={true} type={4} showSale={false} onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <CarInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <RentalInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <PointInfo basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.order_id && !visible && <>
          <FeeInfo cantEdit={true} id={basicInfo.order_id}/>
          <PaymentInfo cantEdit={true} id={basicInfo.order_id}/>
        </>}
        <NotesInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>

    </Modal>
  )
}

export default CarOrderInfo
