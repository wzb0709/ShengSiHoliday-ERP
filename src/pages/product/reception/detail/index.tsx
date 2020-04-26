import React, { FC, useCallback, useEffect, useState } from 'react'
import * as receptionServices from '@/services/reception'
import { Card, Col, Divider, message, Modal, Row } from 'antd'
import moment from  'moment'
import { Link, router } from 'umi'
import ReceptionModal from '@/pages/product/reception/receptionModal'
import { IUserInfo } from '@/models/login'
import { useSelector } from 'dva'
import { getAllList } from '@/utils/common'
import ChangeMember from '@/component/changeMember'

interface IProps {
  match:any
}

interface IBasicInfo {
  product_no:string,
  product_title:string,
  product_subtitle:string,
  travel_summary:string,
  create_id:string
}

const ReceptionDetail:FC<IProps> = (props) => {

  const [visible,setVisible] = useState<boolean>(false)
  const [changeVisible,setChangeVisible] = useState<boolean>(false)

  const [basicInfo,setBasicInfo] = useState<IBasicInfo>({
    product_no:'',
    product_title:'',
    product_subtitle:'',
    travel_summary:'',
    create_id:''
  })

  const [memberList,setMemberList] = useState<any>([])

  const userInfo: IUserInfo = useSelector((state: any) => state.login.userInfo)

  const getBasicInfo = useCallback(() => {
    receptionServices.getReceptionInfo(props.match.params.id).then((res:any)=>{
      setBasicInfo(res)
    })
  },[props.match.params.id])
  useEffect(() =>{
    getBasicInfo()
    getAllList().then(res=>{
      setMemberList(res)
    })
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

  const handleCopyProduct = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要复制该产品?',
      onOk:() => {
        receptionServices.copyProduct(props.match.params.id).then(() => {
          message.success('操作成功！')
          router.replace('/product/reception')
        })
      }
    })
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={userInfo.issale && <>
          <a onClick={() => setVisible(true)}>编辑产品</a>
          <Divider type='vertical' />
          <a onClick={handleCopyProduct} >复制产品</a>
          <Divider type='vertical'/>
          <a onClick={() => setChangeVisible(true)} >转让产品</a>
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
        <Row>
          <Col span={12}>计调姓名：{memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).name : ''}</Col>
          <Col span={12}>联系方式：{memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).phone : ''}</Col>
        </Row>
      </Card>

      <ReceptionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
      <ChangeMember
        visible={changeVisible}
        onCancel={() => setChangeVisible(false)}
        memberList={memberList}
        type={1}
      />
    </>
  )
}

export default ReceptionDetail
