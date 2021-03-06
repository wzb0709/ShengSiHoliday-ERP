import React, { FC, useEffect, useState } from 'react'
import { Card, Divider, message, Row } from 'antd'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import moment from 'moment'
import ProductInfoModal from '@/pages/order/party/productInfo/productInfoModal'
import * as partyOrderServices from '@/services/order/party'

interface IProps {
  basicInfo:any,
  onRefresh:any,
  cantEdit?:boolean
}

const ProductInfo:FC<IProps> = (props) => {

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const [visible,setVisible] =useState<boolean>(false)



  const handleConfirm = (values:any) => {
    const prams = {
      ...values,
      travel_date:values.travel_date.format('YYYY-MM-DD')
    }
    partyOrderServices.updatePartyOrder({...prams},props.basicInfo.id).then(() => {
      message.success('操作成功！')
      setVisible(false)
      props.onRefresh()
    })
  }

  return (
    <>
      <Card
        title={<div>产品信息 {props.basicInfo.travel_date && <span style={{fontSize:14,marginLeft:20}}>出游日期:{moment(props.basicInfo.travel_date).format('YYYY-MM-DD')}</span>}</div>}
        extra={ !props.cantEdit &&
          <>
            <a onClick={() => setVisible(true)}>更换出游日期</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          <div>产品编号：{props.basicInfo.product_no}</div>
          <div style={{marginLeft:20}}>产品名称：{props.basicInfo.product_title}</div>
        </Row>
        <Row type='flex' align='middle'>
          <div style={{marginTop:20}}>产品计调：{
            // @ts-ignore
            memberList.find(item => item.id === props.basicInfo.sale_id) ? memberList.find(item => item.id === props.basicInfo.sale_id).name : ''}
          </div>
        </Row>
      </Card>

      <ProductInfoModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
      />
    </>
  )
}

export default ProductInfo
