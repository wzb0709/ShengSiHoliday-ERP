import React, { FC, useState } from 'react'
import { Modal, Card, Col, Row, message, Divider } from 'antd'
import CarModal from '@/pages/product/car/carModal'
import * as carServices from '@/services/car'

interface IProps {
  visible:boolean,
  basicInfo:any,
  onCancel:any
  onRefresh:any
}

const CarInfoModal:FC<IProps> = (props) => {

  const [visible,setVisible] = useState<boolean>(false)

  const handleConfirm = (values:any) => {
    carServices.updateCar({...values},props.basicInfo.id).then(res=>{
      message.success('操作成功!')
      setVisible(false)
      props.onCancel()
      props.onRefresh()
    })
  }

  //删除汽车
  const handleDelete = () => {
    Modal.confirm({
      title: '是否确认删除该项？',
      onOk: () => {
        carServices.deleteCar(props.basicInfo.id).then(() => {
          message.success('删除成功')
          props.onCancel()
          props.onRefresh()
        })
      },
    })
  }



  return (
    <Modal
      title='汽车产品详情'
      width={800}
      destroyOnClose={true}
      footer={null}
      visible={props.visible}
      onCancel={props.onCancel}
    >
      <Card
        title='基本信息'
        extra={<>
          <a onClick={() => setVisible(true)}>编辑信息</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}} >删除产品</a>
        </>}
      >
        <Row>
          <Col span={4}>
            <img src={props.basicInfo.car_pic} style={{width:'100%'}} alt=""/>
          </Col>
          <Col span={19} style={{marginLeft:20}} >
            <div>车型名称：{props.basicInfo.car_title}</div>
            <div style={{marginTop:20}}>座位数：{props.basicInfo.car_site}座</div>
          </Col>
        </Row>
      </Card>
      <Card
        title='计价标准'
        style={{marginTop:20}}
      >
        <div>按天计价：￥{props.basicInfo.day_price}/天</div>
        <div style={{marginTop:20}}>按时计价：￥{props.basicInfo.time_price}/小时</div>
        <div>按天计价佣金：￥{props.basicInfo.day_commission}</div>
        <div style={{marginTop:20}}>按时计价佣金：￥{props.basicInfo.time_commission}</div>
      </Card>
      <CarModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={props.basicInfo}
      />
    </Modal>
  )
}

export default CarInfoModal
