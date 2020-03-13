import React, { FC, useCallback, useEffect, useState } from 'react'
import { Calendar, Card } from 'antd'
import * as oneDayServices from '@/services/onDay'
import moment from 'moment'
import PackageTable from '@/pages/product/oneDayManager/detail/packageTable'
import { Link } from 'umi'

interface IProps {
  match: any
}

const DatePlanDetail:FC<IProps> = (props) => {

  const [datePlan,setDataPlan] = useState<any>([])
  const [dateId,setDateId] = useState<string>('')
  const [packageList,setPackageList] = useState<any>([])
  const [visible,setVisible] = useState<boolean>(false)

  const getDatePlan = useCallback(() => {
    oneDayServices.getPlan(props.match.params.id).then(res=>{
      setDataPlan(res)
    })
  },[props.match.params.id])
  useEffect(() => {
    getDatePlan()
  },[getDatePlan])

  const handleRender = (date:any) => {
    const a = datePlan.find((item:any) => date.format('YYYY-MM-DD') === moment(item.start_date).format('YYYY-MM-DD'))
    if(a){
      return <div style={{height:'100%',width:'100%'}} onClick={() => handleShowPackage(a.id)}>
        <div style={{color:'#F60'}}>￥{a.min_price}</div>
        <div>数量：{a.site}</div>
      </div>
    }else{
      return <></>
    }
  }

  const handleShowPackage = (id:string) => {
    setVisible(false)
    oneDayServices.getPackageList(props.match.params.id).then(res=>{
      setPackageList(res)
      setDateId(id)
      setVisible(true)
    })
  }

  const handleDisable = (date:any) => {
    const a = datePlan.find((item:any) => date.format('YYYY-MM-DD') === moment(item.start_date).format('YYYY-MM-DD'))
    if(a){
      return false
    }else{
      return true
    }
  }



  return (
    <>
      <Card
        title='计划管理'
        extra={<Link to={`/product/oneDay/${props.match.params.id}/plan/add`} >批量添加计划</Link>}
      >
        <Card
          title='计划日历'
        >
          <Calendar disabledDate={handleDisable} dateCellRender={handleRender} />
        </Card>
        {visible && <PackageTable id={dateId} canEdit={true} packageList={packageList} />}
      </Card>

    </>
  )
}

export default DatePlanDetail
