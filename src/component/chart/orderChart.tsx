import React, { FC, useCallback, useEffect, useState } from 'react'
import { Row } from 'antd'
import OperationSearch from '@/component/chart/operationChartSearch'
import axios from 'axios'
import OrderChartSearch from '@/component/chart/orderChartSearch'

const OrderChart:FC = (props) => {

  const [dataSource,setDataSource] = useState<any>([])
  const [params,setParams] = useState<any>({
    groupbytype:1,
    ordertype:1,
    start_time:'',
    end_time:''
  })

  const getChartSource = useCallback(() => {
    axios.get(`/orderReport?groupbytype=${params.groupbytype}&ordertype=${params.ordertype}&start_time=${params.start_time}&end_time=${params.end_time}`)
      .then(res=>{
        console.log(res)
        setDataSource(res)
      })
  },[])
  useEffect(() => {
    getChartSource()
  },[getChartSource])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.start_time)values.start_time = values.start_time.format('YYYY-MM-DD')
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    console.log(values)
    setParams({ ...values })
  }


  return (
    <>
      <Row style={{marginTop:20}} type='flex' align='middle'>
        <OrderChartSearch initialValue={params} onSearch={handleSearch} />
      </Row>
    </>
  )
}

export default OrderChart
