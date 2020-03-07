import React, { FC, useEffect, useState } from 'react'
import { Card, message } from 'antd'

import * as pointServices from '@/services/point'
import CarPointModal from '@/pages/order/carPoint/carPointModal'
import * as oneDayOrderServices from '@/services/order/oneDay'

interface IProps {
  basicInfo:any,
  onRefresh:any
}

const CarPoint:FC<IProps> = (props) => {

  const [carList,setCarList] = useState<any>([])
  const [visible,setVisible] =useState<boolean>(false)

  useEffect(() => {
    pointServices.getPointList().then(res=>{
      setCarList(res)
    })
  },[])

  const handleConfirm = (values:any) => {
    oneDayOrderServices.changeCarPoint(props.basicInfo.id,values.car_point_id).then(() => {
      message.success('操作成功！')
      setVisible(false)
      props.onRefresh()
    })
  }

  return (
    <>
     <Card
      title='上车点'
      extra={<a onClick={() => setVisible(true)}>更换上车点</a>}
      style={{marginTop:20}}
     >
       {
         carList.find((item:any) => item.id === props.basicInfo.car_point_id) ? carList.find((item:any) => item.id === props.basicInfo.car_point_id).point_title
           : ''
       }
     </Card>
      <CarPointModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        carList={carList}
      />
    </>
  )
}

export default CarPoint
