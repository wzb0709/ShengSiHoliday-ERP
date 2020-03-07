import React, { FC, useEffect, useState } from 'react'
import { Card, Divider, message, Row } from 'antd'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import moment from 'moment'

import ChangeDateModal from '@/pages/order/productInfo/changeDateModal'
import ChangeProModal from '@/pages/order/productInfo/changeProModal'
import * as oneDayServices from '@/services/onDay'
import * as oneDayManagerServices from '@/services/oneDayManager'
import * as oneDayOrderServices from '@/services/order/oneDay'

interface IProps {
  basicInfo:any,
  onRefresh:any
}

const ProductInfo:FC<IProps> = (props) => {

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const [visible,setVisible] =useState<boolean>(false)
  const [dateVisible,setDateVisible] = useState<boolean>(false)
  const [proList,setProList] = useState<any>([])
  const [dateList,setDateList] = useState<any>([])

  useEffect(() => {
    oneDayServices.getOneDayList({page:1,size:10000,search:'',op_id:'',start_time:'',end_time:'',status:-1}).then(res=>{
      setProList(res.data)
    })
    oneDayManagerServices.getPlanList('',-1,'','','',1,10000).then(res=>{
      setDateList(res.data)
    })
  },[])

  const handleConfirmDate = (values:any) => {
    oneDayOrderServices.changeProduct(props.basicInfo.id,'',values.date_id).then(() => {
      message.success('操作成功！')
      setVisible(false)
      props.onRefresh()
    })
  }

  const handleConfirmPro = (values:any) => {
    oneDayOrderServices.changeProduct(props.basicInfo.id,values.product_id,'').then(() => {
      message.success('操作成功！')
      setVisible(false)
      props.onRefresh()
    })
  }

  return (
    <>
      <Card
        title={<div>产品信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>更换产品</a>
            <Divider type='vertical' />
            <a onClick={() => setDateVisible(true)}>更换发团日期</a>
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

      <ChangeDateModal
        visible={dateVisible}
        onOk={handleConfirmDate}
        onCancel={() => setDateVisible(false)}
        initialValue={props.basicInfo}
        dateList={dateList}
      />

      <ChangeProModal
        visible={visible}
        onOk={handleConfirmPro}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        proList={proList}
      />
    </>
  )
}

export default ProductInfo
