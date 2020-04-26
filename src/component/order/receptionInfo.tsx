import React, { FC, useCallback, useEffect, useState } from 'react'
import * as commonServices from '@/services/common'
import { Card, Divider, Modal } from 'antd'
import OrderBasicInfo from '@/pages/order/orderBaiscInfo'
import FeeInfo from '@/pages/order/feeInfo'
import PaymentInfo from '@/pages/order/payment'
import NotesInfo from '@/pages/order/notes'
import ProductInfo from '@/pages/order/reception/productInfo'
import SalesmanInfo from '@/pages/order/salesman'
import TouristInfo from '@/pages/order/touristInfo'
import * as receptionOrderServices from '@/services/order/reception'

interface IProps {
  id:string
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
}

const ReceptionOrderInfo:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})

  const getBasicInfo = useCallback(() => {
    Promise.all([receptionOrderServices.getReceptionInfo(props.id),commonServices.getBasicOrderInfo(props.id)])
      .then(res => {
        const obj = {
          ...res[1],
          ...res[0],
        }
        setBasicInfo(obj)
      })
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
        <OrderBasicInfo cantEdit={true} type={5} showSale={true} onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <ProductInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <SalesmanInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.id && <>
          <TouristInfo cantEdit={true} id={basicInfo.order_id}/>
          <FeeInfo cantEdit={true} id={basicInfo.order_id}/>
          <PaymentInfo cantEdit={true} id={basicInfo.order_id}/>
        </>}
        <NotesInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>

    </Modal>
  )
}

export default ReceptionOrderInfo
