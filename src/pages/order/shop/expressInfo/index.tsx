import React, { FC, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Timeline } from 'antd'

import * as commonServices from '@/services/common'
import * as shopServices from '@/services/order/shopping'
import ExpressModal from '@/pages/order/shop/expressInfo/expressModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
}

const ShoppingExpressInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)
  const [expressVisible, setExpressVisible] = useState<boolean>(false)
  const [expressList,setExpressList] = useState<any>([])
  const [expressInfo,setExpressInfo] = useState<any>([])

  useEffect(() => {
    commonServices.getExpressList().then(res=>{
      setExpressList(res)
    })
  },[])


  const handleConfirm = (values: any) => {
    shopServices.updateShoppingOrder({ ...values},props.basicInfo.id).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }

  const handleViewExpress = () => {
    if(props.basicInfo.logistics_no && props.basicInfo.logistics_no !== ''){
      commonServices.getExpressInfo(props.basicInfo.logistics_no).then((res:any)=>{
        if(res.result.list){
          setExpressInfo(res.result.list)
          setExpressVisible(true)
        }else{
          message.warning('查询不到快递信息')
        }
      })
    }
  }


  return (
    <>
      <Card
        title={<div>物流信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>编辑物流信息</a>
            <Divider type='vertical' />
            <a onClick={handleViewExpress}>查看物流</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          <div>快递公司：{expressList.find((item:any) => item.id.toString() === props.basicInfo.logistics_company_id) ? expressList.find((item:any) => item.id.toString() === props.basicInfo.logistics_company_id).title : ''}</div>
          <div style={{marginLeft:20}}>快递单号：{props.basicInfo.logistics_no}</div>
        </Row>
      </Card>

      <ExpressModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        expressList={expressList}
      />

      <Modal
        visible={expressVisible}
        width={800}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setExpressVisible(false)}
        title='物流信息'
      >
        <Timeline>
          {expressInfo.map((item:any) => {
            return(
              <Timeline.Item key={item.time}>{`${item.time} ${item.status} `}</Timeline.Item>
            )
          })}
        </Timeline>
      </Modal>
    </>
  )
}

export default ShoppingExpressInfo
