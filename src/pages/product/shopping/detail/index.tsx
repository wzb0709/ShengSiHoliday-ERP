import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Col, Divider, message, Modal, Row, Tag } from 'antd'

import * as shoppingServices from '@/services/shopping'
import { router, Link } from 'umi'
import ShoppingPackageInfo from '@/pages/product/shopping/detail/shoppingPackage'
import { getAllList } from '@/utils/common'
import { IUserInfo } from '@/models/login'
import { useSelector } from 'dva'
import ChangeMember from '@/component/changeMember'

interface IProps {
  match: any
}

interface IBasicInfo {
  shop_title: string,
  shop_subtitle: string,
  shop_tags: Array<string>,
  warm_prompt: string,
  buy_person: number,
  shop_pics: Array<string>,
  product_no:string,
  create_id:string,
}

const ShoppingDetail: FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      shop_title: '',
      shop_subtitle: '',
      shop_tags: [],
      warm_prompt: '',
      buy_person: 0,
      shop_pics: [],
      product_no:'',
      create_id:'',
    })

  const [memberList,setMemberList] = useState<any>([])
  const [changeVisible,setChangeVisible] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector((state: any) => state.login.userInfo)

  const tagColor = ['magenta', 'red', 'volcano']

  const getBasicInfo = useCallback(() => {
    shoppingServices.getShoppingInfo(props.match.params.id).then((res: any) => {
      res.shop_tags = JSON.parse(res.shop_tags)
      res.shop_pics = JSON.parse(res.shop_pics)
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
    getAllList().then(res=>{
      setMemberList(res)
    })
  }, [getBasicInfo])

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该产品？",
      onOk:() => {
        shoppingServices.deleteShopping(id).then(() => {
          message.success('删除成功！')
          router.replace('/product/shopping')
        })
      }
    })
  }

  const handleCopyProduct = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要复制该产品?',
      onOk:() => {
        shoppingServices.copyProduct(props.match.params.id).then(() => {
          message.success('操作成功！')
          router.replace('/product/shopping')
        })
      }
    })
  }


  return (
    <>
      <Card
        title='基本信息'
        extra={userInfo.issale && <>
          <Link to={`/product/shopping/${props.match.params.id}/edit`} >编辑产品</Link>
          <Divider type='vertical' />
          <Link to={`/product/shopping/${props.match.params.id}/img`} >图文编辑</Link>
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
            <Row style={{ marginBottom: 10 }}>产品标题：{basicInfo.shop_title}</Row>
            <Row style={{ marginBottom: 10 }}>产品副标题：{basicInfo.shop_subtitle}</Row>
            <Row style={{ marginBottom: 10 }}>产品标签：{basicInfo.shop_tags.map(item => {
              return (<Tag key={item} color={tagColor[Math.floor((Math.random() * tagColor.length))]}>{item}</Tag>)
            })}</Row>
            <Row style={{ marginBottom: 10 }}>购买人数：{basicInfo.buy_person}人</Row>
            <Row style={{ marginBottom: 10 }}>温馨提示：{basicInfo.warm_prompt}</Row>
          </Col>
          <Col span={12}>
            {basicInfo.shop_pics.map((item,index)=>{
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
      <ShoppingPackageInfo id={props.match.params.id} canEdit={false}/>
      <ChangeMember
        visible={changeVisible}
        onCancel={() => setChangeVisible(false)}
        memberList={memberList}
        type={1}
      />
    </>
  )
}

export default ShoppingDetail
