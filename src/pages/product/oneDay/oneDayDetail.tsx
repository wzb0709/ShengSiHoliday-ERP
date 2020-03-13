import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Col, Divider, Row, Calendar, Tag, message, Modal } from 'antd'
import { Link, router } from 'umi'
import * as oneDayServices from '@/services/onDay'
import PackageInfo from '@/pages/product/oneDay/packageInfo'
import OtherPackageInfo from '@/pages/product/oneDay/otherPackageInfo'
import { IMember, IUserInfo } from '@/models/login'
import { useSelector } from 'dva'
import ChangeMember from '@/component/changeMember'
import moment from 'moment'

interface IProps {
  match: any
}

export interface IBasicInfo {
  product_title:string,
  product_sub_title:string,
  product_img:Array<string>,
  fee_desc:string,
  announcements:string,
  warm_prompt:string,
  product_tag:Array<string>,
  travel_person:number,
  create_id:string
}

const OneDayDetail: FC<IProps> = (props) => {
  const tagColor = ['magenta', 'red', 'volcano']
  const [basicInfo,setBasicInfo] = useState<IBasicInfo>({
    product_title:'',
    product_sub_title:'',
    product_img:[],
    fee_desc:'',
    announcements:'',
    warm_prompt:'',
    product_tag:[],
    travel_person:0,
    create_id:''
  })
  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const [changeVisible,setChangeVisible] = useState<boolean>(false)
  const [datePlan,setDataPlan] = useState<any>([])

  const userInfo: IUserInfo = useSelector((state: any) => state.login.userInfo)

  const getBasicInfo = useCallback(() => {
    oneDayServices.getOneDayInfo(props.match.params.id).then((res:any)=>{
      res.product_tag = JSON.parse(res.product_tag)
      res.product_img = JSON.parse(res.product_img)
      setBasicInfo(res)
    })
    oneDayServices.getPlan(props.match.params.id).then(res=>{
      setDataPlan(res)
    })
  },[props.match.params.id])
  useEffect(() => {
    getBasicInfo()
  }, [getBasicInfo])


  const handleDelete = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该产品?',
      onOk:() => {
        oneDayServices.deleteOneDay(props.match.params.id).then(() => {
          message.success('操作成功！')
          router.replace('/product/oneDay')
        })
      }
    })
  }

  const handleCopyProduct = () => {
    Modal.confirm({
      title:'提示',
      content:'是否要复制该产品?',
      onOk:() => {
        oneDayServices.copyProduct(props.match.params.id).then(() => {
          message.success('操作成功！')
        })
      }
    })
  }

  const handleRender = (date:any) => {
    const a = datePlan.find((item:any) => date.format('YYYY-MM-DD') === moment(item.start_date).format('YYYY-MM-DD'))
    if(a){
      return <>
        <div style={{color:'#F60'}}>￥{a.min_price}</div>
        <div>数量：{a.site}</div>
      </>
    }else{
      return <></>
    }
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={userInfo.issale && <>
          <Link to={`/product/oneDay/${props.match.params.id}/edit`}>编辑产品</Link>
          <Divider type='vertical'/>
          <Link to={`/product/oneDay/${props.match.params.id}/img`}>图文编辑</Link>
          <Divider type='vertical'/>
          <Link to={`/product/oneDay/${props.match.params.id}/plan`}>计划管理</Link>
          <Divider type='vertical'/>
          <a onClick={handleCopyProduct} >复制产品</a>
          <Divider type='vertical'/>
          <a onClick={() => setChangeVisible(true)} >转让产品</a>
          <Divider type='vertical'/>
          <a onClick={handleDelete} style={{ color: 'red' }}>删除产品</a>
        </>}
      >
        <Row>
          <Col span={11}>
            <Calendar className='plan' dateCellRender={handleRender}  />
          </Col>
          <Col span={9} style={{marginTop:70}}>
            <Row style={{ marginBottom: 20 }}>产品标题：{basicInfo.product_title}</Row>
            <Row style={{ marginBottom: 20 }}>产品副标题：{basicInfo.product_sub_title}</Row>
            <Row style={{ marginBottom: 20 }}>产品标签：{basicInfo.product_tag.map(item => {
              return (<Tag key={item} color={tagColor[Math.floor((Math.random() * tagColor.length))]}>{item}</Tag>)
            })}</Row>
            <Row style={{ marginBottom: 20 }}>游玩人数：{basicInfo.travel_person}人</Row>
          </Col>
        </Row>
      </Card>

      <Card
        title='附加信息'
        style={{ marginTop: 20 }}
      >
        <Row style={{ marginBottom: 20 }}>费用说明：{basicInfo.fee_desc}</Row>
        <Row style={{ marginBottom: 20 }}>预定须知：{basicInfo.announcements}</Row>
        <Row style={{ marginBottom: 20 }}>温馨提示：{basicInfo.warm_prompt}</Row>
      </Card>

      <Card
        title='计调信息'
        style={{ marginTop: 20 }}
      >
        <Row style={{ marginBottom: 20 }}>
          <Col span={12} >计调姓名：{
            // @ts-ignore
            memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).name : ''}</Col>
          <Col span={12} >联系方式：{
            // @ts-ignore
            memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).phone : ''}</Col>
        </Row>
      </Card>

      <PackageInfo id={props.match.params.id} canEdit={false}/>

      <OtherPackageInfo id={props.match.params.id} canEdit={false}/>

      <ChangeMember
        visible={changeVisible}
        onCancel={() => setChangeVisible(false)}
        memberList={memberList}
        type={1}
      />
    </>
  )
}

export default OneDayDetail
