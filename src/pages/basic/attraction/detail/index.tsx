import React, { FC, useCallback, useEffect, useState } from 'react'
import * as attractionServices from '@/services/attraction'
import { Card, Col, Divider, message, Modal, Row, Tag } from 'antd'
import { Link, router } from 'umi'
import AttractionModal from '@/pages/basic/attraction/attractionModal'


interface IProps {
  match: any
}

interface IBasicInfo {
  scenic_title: string,
  scenic_pics: Array<string>,
  scenic_address: string,
  scenic_time: string,
  scenic_phone:string
}

const AttractionDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      scenic_title: '',
      scenic_pics:['','','',''],
      scenic_address: '',
      scenic_time: '',
      scenic_phone:''
    })

  const [visible,setVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    attractionServices.getScenicInfo(props.match.params.id).then((res: any) => {
      res.scenic_pics = JSON.parse(res.scenic_pics)
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
      scenic_pics:JSON.stringify(values.scenic_pics),
    }
    attractionServices.updateScenic(params,props.match.params.id).then(() => {
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
        attractionServices.deleteScenic(id).then(() => {
          message.success('删除成功！')
          router.replace('/basic/attraction')
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
        <Row style={{ marginBottom: 10 }}>美食名称：{basicInfo.scenic_title}</Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={24}>
            营业时间：{basicInfo.scenic_time}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>营业地址：{basicInfo.scenic_address}</Row>
        <Row style={{ marginBottom: 10 }}>联系电话：{basicInfo.scenic_phone}</Row>
        <Row style={{ marginBottom: 10 }}>
          {basicInfo.scenic_pics.map((item,index)=>{
            return item !=='' && (
              <Col span={6} key={index} >
                <img src={item} alt="" style={{objectFit:'cover',width:'95%'}} />
              </Col>
            )
          })}
        </Row>
      </Card>
      <AttractionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
    </>
  )
}

export default AttractionDetail
