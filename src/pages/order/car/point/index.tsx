import React, { FC, useEffect, useState } from 'react'
import { Card, message, Row } from 'antd'
import moment from 'moment'

import * as commonServices from '@/services/order/car'
import RentalInfoModal from '@/pages/order/car/rental/rentalModal'
import * as pointServices from '@/services/point'
import PointInfoModal from '@/pages/order/car/point/pointModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
  cantEdit?:boolean
}

const PointInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)
  const [point,setPoint] = useState<any>([])

  useEffect(() => {
    pointServices.getPointList().then(res=>{
      setPoint(res)
    })
  },[])


  const handleConfirm = (values: any) => {
    const params = {
      ...values,
    }
    commonServices.updateOrder({ ...params},props.basicInfo.id).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }


  return (
    <>
      <Card
        title={<div>取/还车点</div>}
        extra={!props.cantEdit &&
          <>
            <a onClick={() => setVisible(true)}>编辑</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          <div>取车点：{point.find((item:any) => item.id === props.basicInfo.get_car_point_id) ? point.find((item:any) => item.id === props.basicInfo.get_car_point_id).point_title : ''}</div>
          <div style={{marginLeft:20}}>还车点：{point.find((item:any) => item.id === props.basicInfo.back_car_point_id) ? point.find((item:any) => item.id === props.basicInfo.back_car_point_id).point_title : ''}</div>
        </Row>
      </Card>

      <PointInfoModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        pointList={point}
      />
    </>
  )
}

export default PointInfo
