import React, { FC, useCallback, useEffect, useState } from 'react'
import * as receptionServices from '@/services/reception'
import { Card, Col, Divider, message, Modal, Row } from 'antd'
import moment from  'moment'
import { Link, router } from 'umi'
import ReceptionModal from '@/pages/product/reception/receptionModal'

interface IProps {
  match:any
}

interface IBasicInfo {
  product_no:string,
  product_title:string,
  product_subtitle:string,
  travel_summary:string,
  op_id:string
}

const ReceptionDetail:FC<IProps> = (props) => {

  const [visible,setVisible] = useState<boolean>(false)

  const [basicInfo,setBasicInfo] = useState<IBasicInfo>({
    product_no:'',
    product_title:'',
    product_subtitle:'',
    travel_summary:'',
    op_id:''
  })


  const getBasicInfo = useCallback(() => {
    receptionServices.getReceptionInfo(props.match.params.id).then((res:any)=>{
      setBasicInfo(res)
    })
  },[props.match.params.id])
  useEffect(() =>{
    getBasicInfo()
  },[getBasicInfo])


  const handleDelete = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该产品？',
      onOk:() => {
        receptionServices.deleteReception(props.match.params.id).then(()=>{
          message.success('操作成功')
          router.replace('/product/reception')
        })
      }
    })
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    receptionServices.updateReception(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <a onClick={() => setVisible(true)}>编辑产品</a>
          <Divider type='vertical' />
          <a>复制产品</a>
          <Divider type='vertical' />
          <a>转让产品</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除产品</a>
        </>}
      >
        <Row>
          产品编号：{basicInfo.product_no}
        </Row>
        <Row style={{marginTop:20}} >
          产品标题：{basicInfo.product_title}
        </Row>
        <Row style={{marginTop:20}} >
          产品副标题：{basicInfo.product_subtitle}
        </Row>
        <Row style={{marginTop:20}} >
          行程缩影：{basicInfo.travel_summary}
        </Row>
      </Card>
      <Card
        title='计调信息'
        style={{marginTop:20}}
      >

      </Card>

      <ReceptionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
    </>
  )
}

export default ReceptionDetail
