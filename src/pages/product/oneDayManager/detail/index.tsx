import React, { FC, useCallback, useEffect, useState } from 'react'
import * as planServices from '@/services/oneDayManager'
import { Card, Col, Row } from 'antd'
import moment from  'moment'
import PackageTable from '@/pages/product/oneDayManager/detail/packageTable'
import { Link } from 'umi'

interface IProps {
  match:any
}

interface IBasicInfo {
  product_no:string,
  product_title:string,
  start_date:string,
  package_count:number,
  status:number,
  op_id:string
}

const DetailEdit:FC<IProps> = (props) => {

  const [basicInfo,setBasicInfo] = useState<IBasicInfo>({
    product_no:'',
    product_title:'',
    start_date:'',
    package_count:0,
    status:-1,
    op_id:''
  })


  const getBasicInfo = useCallback(() => {
    planServices.getPlanInfo(props.match.params.id).then((res:any)=>{
      setBasicInfo(res)
    })
  },[props.match.params.id])
  useEffect(() =>{
    getBasicInfo()
  },[getBasicInfo])

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <Link to={`/product/oneDayManager/${props.match.params.id}/edit`} >编辑计划</Link>
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
            上架状态：{basicInfo.status === 1 ? '已上架' : '未上架'}
          </Col>
        </Row>
      </Card>
      <PackageTable id={props.match.params.id} canEdit={false}/>
    </>
  )
}

export default DetailEdit
