import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Col, Divider, message, Modal, Row, Tag } from 'antd'

import * as partyServices from '@/services/party'
import PartyModal from '@/pages/product/party/partyModal'
import { router, Link } from 'umi'
import { IUserInfo } from '@/models/login'
import { useSelector } from 'dva'
import { getAllList } from '@/utils/common'
import ChangeMember from '@/component/changeMember'

interface IProps {
  match: any
}

interface IBasicInfo {
  travel_title: string,
  travel_subtitle: string,
  travel_tags: Array<string>,
  travel_recommend: string,
  travel_person: number,
  travel_price: number,
  travel_pics: Array<string>,
  create_id:string
}

const PartyDetail: FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      travel_title: '',
      travel_subtitle: '',
      travel_tags: [],
      travel_recommend: '',
      travel_person: 0,
      travel_price: 0,
      travel_pics: [],
      create_id:''
    })

  const [visible,setVisible] = useState<boolean>(false)
  const [memberList,setMemberList] = useState<any>([])
  const [changeVisible,setChangeVisible] = useState<boolean>(false)

  const userInfo: IUserInfo = useSelector((state: any) => state.login.userInfo)

  const tagColor = ['magenta', 'red', 'volcano']

  const getBasicInfo = useCallback(() => {
    partyServices.getCustomerDetails(props.match.params.id).then((res: any) => {
      res.travel_tags = JSON.parse(res.travel_tags)
      res.travel_pics = JSON.parse(res.travel_pics)
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
    getAllList().then(res=>{
      setMemberList(res)
    })
  }, [getBasicInfo])

  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      travel_pics:JSON.stringify(values.travel_pics),
      travel_tags:JSON.stringify(values.travel_tags),
      create_id:localStorage.getItem('id')
    }
    partyServices.updateCustomer(params,props.match.params.id).then(() => {
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
        partyServices.deleteCustomer(id).then(() => {
          message.success('删除成功！')
          router.replace('/product/party')
        })
      }
    })
  }

  const handleCopyProduct = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要复制该产品?',
      onOk:() => {
        partyServices.copyProduct(props.match.params.id).then(() => {
          message.success('操作成功！')
          router.replace('/product/party')
        })
      }
    })
  }


  return (
    <>
      <Card
        title='基本信息'
        extra={userInfo.issale && <>
          <a onClick={handleUpdateModal} >编辑产品</a>
          <Divider type='vertical' />
          <Link to={`/product/party/${props.match.params.id}/img`} >图文编辑</Link>
          <Divider type='vertical' />
          <a onClick={handleCopyProduct} >复制产品</a>
          <Divider type='vertical'/>
          <a onClick={() => setChangeVisible(true)} >转让产品</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除产品</a>
        </>}
      >
        <Row>
          <Col span={12}>
            <Row style={{ marginBottom: 10 }}>产品标题：{basicInfo.travel_title}</Row>
            <Row style={{ marginBottom: 10 }}>产品副标题：{basicInfo.travel_subtitle}</Row>
            <Row style={{ marginBottom: 10 }}>产品标签：{basicInfo.travel_tags.map(item => {
              return (<Tag key={item} color={tagColor[Math.floor((Math.random() * tagColor.length))]}>{item}</Tag>)
            })}</Row>
            <Row style={{ marginBottom: 10 }}>游玩人数：{basicInfo.travel_person}人</Row>
            <Row style={{ marginBottom: 10 }}>预期价格：{basicInfo.travel_price}元</Row>
            <Row style={{ marginBottom: 10 }}>推荐理由：{basicInfo.travel_recommend}</Row>
          </Col>
          <Col span={12}>
            {basicInfo.travel_pics.map((item,index)=>{
              return item !=='' && (
                <Col span={6} key={index} >
                  <img src={item} alt="" style={{objectFit:'cover',width:'95%'}} />
                </Col>
              )
            })}
          </Col>
        </Row>
      </Card>
      <Card
        title='计调信息'
        style={{ marginTop: 20 }}
      >
        <Row>
          <Col span={12}>计调姓名：{memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).name : ''}</Col>
          <Col span={12}>联系方式：{memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).phone : ''}</Col>
        </Row>
      </Card>
      <PartyModal
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

export default PartyDetail
