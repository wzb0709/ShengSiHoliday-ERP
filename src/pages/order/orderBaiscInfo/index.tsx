import React, { FC, useState } from 'react'
import { Badge, Card, Col, Icon, message, Modal, Row, Statistic } from 'antd'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import moment from 'moment'

import NamePhoneModal from '@/pages/order/orderBaiscInfo/namePhoneModal'
import * as commonServices from '@/services/common'

interface IProps {
  basicInfo:any,
  onRefresh:any,
  showSale:boolean,
  type:number,
  cantEdit?:boolean,
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

  const handleChangeOrder = (status:number) => {
    Modal.confirm({
      title:'提示',
      content:'是否要进行该操作?',
      onOk:() => {
        commonServices.updateOrderStatus(props.basicInfo.id,status).then(res=>{
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
              {!props.cantEdit && <a onClick={() => setVisible(true)}>编辑</a>}
            </Row>
            <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <Row type='flex' align='middle'>
                <Icon style={{marginRight:10}} type="phone" />
                <div>{props.basicInfo.contact_phone}</div>
              </Row>
              {!props.cantEdit && <a>发送短信</a>}
            </Row>
            {props.type === 1 && <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <div>订单状态：{props.basicInfo.status === 0 ? <Badge status='warning' text='待付款' />
                : props.basicInfo.status === 1 ?  <Badge status='processing' text='已付款' />
                  : props.basicInfo.status === 2 ?  <Badge status='processing' text='已确认' />
                      : props.basicInfo.status === 3 ? <Badge status='success' text='已评价' />
                        :  <Badge status='default' text='已取消' />
              }</div>
              {(props.basicInfo.status === 1) && !props.cantEdit && <a style={{marginRight:10}} onClick={() => handleChangeOrder(2)}>确认订单</a>}
              {(props.basicInfo.status === 0 || props.basicInfo.status === 1 || props.basicInfo.status === 2) && !props.cantEdit &&  <a style={{color:'red'}} onClick={() => handleChangeOrder(9)}>取消订单</a>}
            </Row>}
            {props.type === 2 && <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <div>订单状态：{props.basicInfo.status === 0 ? <Badge status='warning' text='待付款' />
                : props.basicInfo.status === 1 ?  <Badge status='processing' text='已付款' />
                  : props.basicInfo.status === 2 ?  <Badge status='processing' text='已发货' />
                    : props.basicInfo.status === 3 ? <Badge status='success' text='确认收货' />
                      : props.basicInfo.status === 4 ? <Badge status='success' text='已评价' />
                        :  <Badge status='default' text='已取消' />
              }</div>
              {(props.basicInfo.status === 1) && !props.cantEdit &&  <a style={{marginRight:10}} onClick={() => handleChangeOrder(2)}>订单发货</a>}
              {(props.basicInfo.status === 0 || props.basicInfo.status === 1) && !props.cantEdit &&  <a style={{color:'red'}} onClick={() => handleChangeOrder(9)}>取消订单</a>}
            </Row>}
            {props.type === 3 && <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <div>订单状态：{props.basicInfo.status === 0 ? <Badge status='warning' text='待付款' />
                : props.basicInfo.status === 1 ?  <Badge status='processing' text='已付款' />
                  : props.basicInfo.status === 2 ?  <Badge status='processing' text='已确认' />
                    : props.basicInfo.status === 3 ? <Badge status='success' text='已评价' />
                      :  <Badge status='default' text='已取消' />
              }</div>
              {(props.basicInfo.status === 1) && !props.cantEdit &&  <a style={{marginRight:10}} onClick={() => handleChangeOrder(2)}>确认订单</a>}
              {(props.basicInfo.status === 0 || props.basicInfo.status === 1 || props.basicInfo.status === 2) && !props.cantEdit &&  <a style={{color:'red'}} onClick={() => handleChangeOrder(9)}>取消订单</a>}
            </Row>}
            {props.type === 4 && <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <div>订单状态：{props.basicInfo.status === 0 ? <Badge status='warning' text='待付款' />
                : props.basicInfo.status === 1 ?  <Badge status='processing' text='已付款' />
                  : props.basicInfo.status === 3 ?  <Badge status='processing' text='已确认' />
                    : props.basicInfo.status === 4 ?  <Badge status='processing' text='已提车' />
                      : props.basicInfo.status === 5 ? <Badge status='processing' text='已还车' />
                        : props.basicInfo.status === 6 ? <Badge status='success' text='订单完成' />
                          :  <Badge status='default' text='已取消' />
              }</div>
              {(props.basicInfo.status === 1) && !props.cantEdit &&  <a style={{marginRight:10}} onClick={() => handleChangeOrder(3)}>确认订单</a>}
              {(props.basicInfo.status === 3) && !props.cantEdit &&  <a style={{marginRight:10}} onClick={() => handleChangeOrder(4)}>提车</a>}
              {(props.basicInfo.status === 4) && !props.cantEdit &&  <a style={{marginRight:10}} onClick={() => handleChangeOrder(5)}>还车</a>}
              {(props.basicInfo.status === 0 || props.basicInfo.status === 1 || props.basicInfo.status === 3) && !props.cantEdit &&  <a style={{color:'red'}} onClick={() => handleChangeOrder(9)}>取消订单</a>}
            </Row>}
            {props.type === 5 && <Row style={{marginTop:10}} type='flex' align='middle' justify='space-between'>
              <div>订单状态：{props.basicInfo.status === 0 ? <Badge status='warning' text='待付款' />
                : props.basicInfo.status === 1 ?  <Badge status='processing' text='已确认' />
                  : props.basicInfo.status === 2 ?  <Badge status='processing' text='已付款' />
                    :  <Badge status='default' text='已取消' />
              }</div>
              {(props.basicInfo.status === 1) && !props.cantEdit &&  <a style={{marginRight:10}} onClick={() => handleChangeOrder(2)}>确认订单</a>}
              {(props.basicInfo.status === 0 || props.basicInfo.status === 1 || props.basicInfo.status === 2) && !props.cantEdit &&  <a style={{color:'red'}} onClick={() => handleChangeOrder(9)}>取消订单</a>}
            </Row>}
          </div>
        </Col>
        <Col span={8}>
          <div style={{border:'1px solid #eee',height:125,boxSizing:'border-box',padding:20}}>
            <div>订单编号：{props.basicInfo.order_no}</div>
            <div style={{marginTop:10}}>下单时间：{moment(props.basicInfo.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
            {props.showSale && <div style={{marginTop:10}}>销售：{
              // @ts-ignore
              memberList.find(item => item.id === props.basicInfo.sale_id) ? memberList.find(item => item.id === props.basicInfo.sale_id).name : ''
            }</div>}
          </div>
        </Col>
        <Col span={8}>
          <div style={{border:'1px solid #eee',height:125,boxSizing:'border-box',padding:20}}>
            <div style={{display:'flex',alignItems:'center'}}>营业款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={props.basicInfo.total_price} /></div>
            <div style={{display:'flex',alignItems:'center',marginTop:8}}>已收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'#00CD00'}} value={props.basicInfo.paid} /></div>
            <div style={{display:'flex',alignItems:'center',marginTop:8}}>未收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={props.basicInfo.total_price - props.basicInfo.paid} /></div>
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
