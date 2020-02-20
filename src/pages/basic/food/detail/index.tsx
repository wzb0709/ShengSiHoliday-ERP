import React, { FC, useCallback, useEffect, useState } from 'react'
import * as foodServices from '@/services/food'
import FoodModal from '@/pages/basic/food/foodModal'
import { Card, Col, Divider, message, Modal, Row, Tag } from 'antd'
import { Link, router } from 'umi'


interface IProps {
  match: any
}

interface IBasicInfo {
  food_title: string,
  food_pics: Array<string>,
  food_address: string,
  consumption: number,
  food_time: string,
  food_phones:string
}

const FoodDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      food_title: '',
      food_pics:['','','',''],
      food_address: '',
      consumption: 0,
      food_time: '',
      food_phones:''
    })

  const [visible,setVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    foodServices.getFoodInfo(props.match.params.id).then((res: any) => {
      res.food_pics = JSON.parse(res.food_pics)
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
  }, [getBasicInfo])

  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      food_pics:JSON.stringify(values.food_pics),
    }
    foodServices.updateFood(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该产品？",
      onOk:() => {
        foodServices.deleteFood(id).then(() => {
          message.success('删除成功！')
          router.replace('/basic/food')
        })
      }
    })
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <a onClick={handleUpdateModal} >编辑产品</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除产品</a>
        </>}
      >
        <Row style={{ marginBottom: 10 }}>美食名称：{basicInfo.food_title}</Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            营业时间：{basicInfo.food_time}
          </Col>
          <Col span={12}>
            人均消费：￥{basicInfo.consumption}/人
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>营业地址：{basicInfo.food_address}</Row>
        <Row style={{ marginBottom: 10 }}>联系电话：{basicInfo.food_phones}</Row>
        <Row style={{ marginBottom: 10 }}>
          {basicInfo.food_pics.map((item,index)=>{
            return item !=='' && (
              <Col span={6} key={index} >
                <img src={item} alt="" style={{objectFit:'cover',width:'95%'}} />
              </Col>
            )
          })}
        </Row>
      </Card>
      <FoodModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
    </>
  )
}

export default FoodDetail
