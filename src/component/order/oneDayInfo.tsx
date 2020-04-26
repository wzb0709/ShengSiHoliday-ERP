import React, { FC, useCallback, useEffect, useState } from 'react'
import * as oneDayOrderServices from '@/services/order/oneDay'
import * as commonServices from '@/services/common'
import { Card, Divider, Modal } from 'antd'
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
import Progress from '@/pages/order/progress'

interface IProps {
  id:string
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
}

const OneDayInfo:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})
  const [visible,setVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    Promise.all([oneDayOrderServices.getOneDayOrderInfo(props.id),commonServices.getBasicOrderInfo(props.id)])
      .then(res => {
        const obj = {
          ...res[0],
          ...res[1]
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
        <OrderBasicInfo cantEdit={true} type={1} showSale={true} onRefresh={getBasicInfo} basicInfo={basicInfo}/>
        <CarPoint cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <ProductInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        <SalesmanInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
        {basicInfo.id && <>
          <PackageInfo cantEdit={true} id={basicInfo.id} date_id={basicInfo.date_id}/>
          <OtherPackageInfo cantEdit={true} id={basicInfo.id} pro_id={basicInfo.product_id}/>
          <TouristInfo cantEdit={true} id={basicInfo.id}/>
          <FeeInfo cantEdit={true} id={basicInfo.id}/>
          <PaymentInfo cantEdit={true} id={basicInfo.id}/>
        </>}
        <NotesInfo cantEdit={true} basicInfo={basicInfo} onRefresh={getBasicInfo}/>
      </Card>

      {visible && <Progress id={basicInfo.order_id} visible={visible} onCancel={() => setVisible(false)}/>}
    </Modal>
  )
}

export default OneDayInfo
