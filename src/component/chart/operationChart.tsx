import React, { FC, useCallback, useEffect, useState } from 'react'
import { Row } from 'antd'
import OperationSearch from '@/component/chart/operationChartSearch'
import axios from 'axios'
import * as commonServices from '@/services/common'
import moment from 'moment'

const OperationChart:FC = (props) => {

  const [dataSource,setDataSource] = useState<any>([])
  const [sourceList,setSourceList] = useState<any>([])
  const [params,setParams] = useState<any>({
    groupbytype:1,
    operatingtype:1,
    source_id:'',
    start_time:moment().subtract(10,'days').format('YYYY-MM-DD'),
    end_time:moment().format('YYYY-MM-DD'),
  })

  const getChartSource = useCallback(() => {
    axios.get(`/operating?groupbytype=${params.groupbytype}&operatingtype=${params.operatingtype}&source_id=${params.source_id}&start_time=${params.start_time}&end_time=${params.end_time}`)
      .then(res=>{
        console.log(res)
        setDataSource(res)
      })
  },[])
  useEffect(() => {
    getChartSource()
    commonServices.getDistributionList().then(res=>{
      setSourceList(res)
    })
  },[getChartSource])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.start_time){
      values.start_time = values.start_time.format('YYYY-MM-DD')
    }
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    setParams({ ...values })
  }


  return (
    <>
      <Row style={{marginTop:20}} type='flex' align='middle'>
        <OperationSearch sourceList={sourceList} initialValue={params} onSearch={handleSearch} />
      </Row>
    </>
  )
}

export default OperationChart
