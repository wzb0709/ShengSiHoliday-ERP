import React, { FC, useState } from 'react'
import { Badge, Card, Col, Icon, message, Modal, Row, Statistic } from 'antd'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import moment from 'moment'

import NamePhoneModal from '@/pages/order/orderBaiscInfo/namePhoneModal'
import * as commonServices from '@/services/common'

interface IProps {
  basicInfo:any,
  onRefresh:any
}

const OrderBasicInfo:FC<IProps> = (props) => {

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const [visible,setVisible] = useState<boolean>(false)

  const handleConfirm = (values:any) => {
    commonServices.updateBasicOrderInfo({
      ...values,id:props.basicInfo.order_id
    }).then(()=>{
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }

  const handleCancelOrder = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要取消该订单?',
      onOk:() => {
        commonServices.updateOrderStatus(props.basicInfo.id,9).then(res=>{
          message.success('操作成功！')
          props.onRefresh()
        })
      }
    })
  }


  return (
    <>
      <Row gutter={32}>
        <Col span={8}>
          <div style={{border:'1px solid #eee',height:125,boxSizing:'border-box',padding:20}}>
            <Row type='flex' align='middle' justify='space-between'>
              <div style={{fontSize:16,fontWeight:'bold'}}>{props.basicInfo.contact_name}</div>
              <a onClick={() => setVisible(true)}>编辑</a>
            </Row>
            <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <Row type='flex' align='middle'>
                <Icon style={{marginRight:10}} type="phone" />
                <div>{props.basicInfo.contact_phone}</div>
              </Row>
              <a>发送短信</a>
            </Row>
            <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <div>订单状态：{props.basicInfo.status === 0 ? <Badge status='warning' text='待付款' />
                : props.basicInfo.status === 1 ?  <Badge status='processing' text='已付款' />
                  : props.basicInfo.status === 2 ?  <Badge status='processing' text='已确认' />
                    : props.basicInfo.status === 3 ? <Badge status='success' text='已出游' />
                      : props.basicInfo.status === 4 ? <Badge status='success' text='已评价' />
                        :  <Badge status='default' text='已取消' />
              }</div>
              <a style={{color:'red'}} onClick={handleCancelOrder}>取消订单</a>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div style={{border:'1px solid #eee',height:125,boxSizing:'border-box',padding:20}}>
            <div>订单编号：{props.basicInfo.order_no}</div>
            <div style={{marginTop:10}}>下单时间：{moment(props.basicInfo.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div style={{marginTop:10}}>操作：{
              // @ts-ignore
              memberList.find(item => item.id === props.basicInfo.operation_id) ? memberList.find(item => item.id === props.basicInfo.operation_id).name : ''
            }</div>
          </div>
        </Col>
        <Col span={8}>
          <div style={{border:'1px solid #eee',height:125,boxSizing:'border-box',padding:20}}>
            <div style={{display:'flex',alignItems:'center'}}>营业款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={props.basicInfo.total_price} /></div>
            <div style={{display:'flex',alignItems:'center',marginTop:8}}>已收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'#00CD00'}} value={props.basicInfo.paid} /></div>
            <div style={{display:'flex',alignItems:'center',marginTop:8}}>未收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={props.basicInfo.unpaid} /></div>
          </div>
        </Col>
      </Row>


      <NamePhoneModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
      />
    </>
  )
}

export default OrderBasicInfo
