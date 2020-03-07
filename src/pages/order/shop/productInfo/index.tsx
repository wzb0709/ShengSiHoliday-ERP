import React, { FC, useEffect, useState } from 'react'
import { Card, message, Row } from 'antd'

import * as commonServices from '@/services/order/shopping'
import CarInfoModal from '@/pages/order/car/carInfo/carInfoModal'
import * as shopServices from '@/services/shopping'
import ProductInfoModal from '@/pages/order/shop/productInfo/productInfoModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
}

const ShoppingProductInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)
  const [shopList,setShopList] = useState<any>([])

  useEffect(() => {
    shopServices.getShoppingList('',-1,1,10000).then(res=>{
      setShopList(res.data)
    })
  },[])


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
        title={<div>商品信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>更换商品</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          <div>商品名称：{props.basicInfo.product_title}</div>
        </Row>
      </Card>

      <ProductInfoModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        shopList={shopList}
      />
    </>
  )
}

export default ShoppingProductInfo
