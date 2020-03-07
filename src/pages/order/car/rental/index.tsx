import React, { FC, useState } from 'react'
import { Card, message, Row } from 'antd'
import moment from 'moment'

import * as commonServices from '@/services/order/car'
import RentalInfoModal from '@/pages/order/car/rental/rentalModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
}

const RentalInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      start_time:values.start_time.format('YYYY-MM-DD HH:mm:ss'),
      end_time:values.end_time.format('YYYY-MM-DD HH:mm:ss')
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
        title={<div>租赁信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>编辑</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row>
          <div>车牌号：{props.basicInfo.plate_number}</div>
          <div style={{marginTop:20}}>计费方式：{props.basicInfo.price_type === 1 ? '按天计费':'按时计费'}</div>
          <div style={{marginTop:20}}>租赁时间：
            {`${moment(props.basicInfo.start_time).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(props.basicInfo.end_time).format('YYYY-MM-DD HH:mm:ss')}`}
          </div>
        </Row>
      </Card>

      <RentalInfoModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
      />
    </>
  )
}

export default RentalInfo
