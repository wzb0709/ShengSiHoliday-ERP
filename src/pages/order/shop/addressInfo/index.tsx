import React, { FC, useEffect, useState } from 'react'
import { Card, message, Row } from 'antd'

import * as commonServices from '@/services/order/shopping'
import AddressInfoModal from '@/pages/order/shop/addressInfo/addressInfoModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
}

const ShoppingAddressInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)

  const handleConfirm = (values: any) => {
    commonServices.updateShoppingOrder({ ...values},props.basicInfo.id).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }


  return (
    <>
      <Card
        title={<div>收货信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>编辑收货信息</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          <div>收货人：{props.basicInfo.consignee_name}</div>
          <div style={{marginLeft:20}}>联系方式：{props.basicInfo.consignee_phone}</div>
        </Row>
        <div style={{marginTop:20}}>收货地址:{props.basicInfo.consignee_address}</div>
      </Card>

      <AddressInfoModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
      />
    </>
  )
}

export default ShoppingAddressInfo
