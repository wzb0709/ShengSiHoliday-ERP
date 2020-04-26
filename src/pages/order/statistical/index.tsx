import React, { FC, useEffect, useState} from 'react'
import { Modal, Row, Col, Statistic } from 'antd'

import * as commonServices from '@/services/common'

interface IProps {
  params:any,
  visible:boolean,
  onCancel:any
}

const OrderStatistical:FC<IProps> = (props) => {

  const [info,setInfo] = useState<any>({})

  useEffect(() => {
      commonServices.getOrderStatistical({...props.params}).then(res=>{
        console.log(res)
        setInfo(res)
      })
  },[props.params])

  return (
    <Modal
      title='统计信息'
      footer={null}
      width={400}
      destroyOnClose={true}
      visible={props.visible}
      onCancel={props.onCancel}
    >
      <Row>
        <Col span={12}>订单数：{info.totalOrder}单</Col>
        {(props.params.order_type !== 2 && props.params.order_type !== 4) && <Col span={12}>总收客数：{info.totalPerson}人</Col>}
      </Row>
      <div style={{display:'flex',alignItems:'center'}}>营业款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={info.totalPrice} /></div>
      <div style={{display:'flex',alignItems:'center'}}>已收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'#00CD00'}} value={info.totalPaid} /></div>
      <div style={{display:'flex',alignItems:'center'}}>未收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={info.totalUnpaid} /></div>
    </Modal>
  )
}

export default OrderStatistical
