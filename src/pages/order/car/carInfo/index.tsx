import React, { FC, useEffect, useState } from 'react'
import { Card, message, Row } from 'antd'

import * as commonServices from '@/services/order/car'
import CarInfoModal from '@/pages/order/car/carInfo/carInfoModal'
import * as carServices from '@/services/car'

interface IProps {
  basicInfo: any,
  onRefresh: any
}

const CarInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)
  const [carList,setCarList] = useState<any>([])

  useEffect(() => {
    carServices.getCarList('',-1,1,10000).then(res=>{
      setCarList(res.data)
    })
  },[])

  const handleConfirm = (values: any) => {
    commonServices.updateOrder({ ...values},props.basicInfo.id).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }


  return (
    <>
      <Card
        title={<div>车型信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>更换车型</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          <div>车型名称：{props.basicInfo.product_title}</div>
          <div style={{marginLeft:20}}>计费单位：{props.basicInfo.price_type === 1 ? '按天计费':'按时计费'}</div>
        </Row>
      </Card>

      <CarInfoModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        carList={carList}
      />
    </>
  )
}

export default CarInfo
