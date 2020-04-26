import React, { FC, useCallback, useEffect, useState } from 'react'
import * as planServices from '@/services/oneDayManager'
import { Card, Col, Divider, message, Modal, Row } from 'antd'
import moment from  'moment'
import PackageTable from '@/pages/product/oneDayManager/detail/packageTable'
import { Link, router } from 'umi'
import { getAllList } from '@/utils/common'
import CopyModal from '@/pages/product/oneDayManager/detail/copyModal'

interface IProps {
  match:any
}

interface IBasicInfo {
  product_no:string,
  product_title:string,
  start_date:string,
  package_count:number,
  is_show:number,
  op_id:string
}

const DetailEdit:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<IBasicInfo>({
    product_no:'',
    product_title:'',
    start_date:'',
    package_count:0,
    is_show:-1,
    op_id:''
  })
  const [memberList,setMemberList] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)

  const getBasicInfo = useCallback(() => {
    planServices.getPlanInfo(props.match.params.id).then((res:any)=>{
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
      content:'是否要删除该产品?',
      onOk:() => {
        planServices.deletePlan(props.match.params.id).then(() => {
          message.success('操作成功！')
          router.replace('/product/oneDayManager')
        })
      }
    })
  }

  const handleConfirm = (values:any) => {
    const date = [values.date]
    planServices.copy(props.match.params.id,date).then(()=>{
      message.success('操作成功！')
      setVisible(false)
      router.replace('/product/oneDayManager')
    })
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <Link to={`/product/oneDayManager/${props.match.params.id}/edit`} >编辑计划</Link>
          <Divider type='vertical' />
          <a onClick={() => setVisible(true)}>复制计划</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除计划</a>
        </>}
      >
        <Row>
          <Col span={12}>
            产品编号：{basicInfo.product_no}
          </Col>
          <Col span={12}>
            产品名称：{basicInfo.product_title}
          </Col>
        </Row>
        <Row style={{marginTop:20}}>
          <Col span={12}>
            发团时间：{basicInfo.start_date !== '' ? moment(basicInfo.start_date).format('YYYY-MM-DD') : ''}
          </Col>
          <Col span={12}>
            上架状态：{basicInfo.is_show === 1 ? '已上架' : '未上架'}
          </Col>
        </Row>
      </Card>

      <Card
        title='计调信息'
        style={{ marginTop: 20 }}
      >
        <Row>
          <Col span={12}>计调姓名：{memberList.find((item:any) => item.id === basicInfo.op_id) ? memberList.find((item:any) => item.id === basicInfo.op_id).name : ''}</Col>
          <Col span={12}>联系方式：{memberList.find((item:any) => item.id === basicInfo.op_id) ? memberList.find((item:any) => item.id === basicInfo.op_id).phone : ''}</Col>
        </Row>
      </Card>

      <CopyModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
      />

      <PackageTable id={props.match.params.id} canEdit={false}/>
    </>
  )
}

export default DetailEdit
