import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Row, Select } from 'antd'
import OperationSearch from '@/component/chart/operationChartSearch'
import axios from 'axios'
import * as commonServices from '@/services/common'
import moment from 'moment'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

interface IProps {
  id:string | undefined,
  type:number
}

const OperationChart:FC<IProps> = (props) => {

  const [dataSource,setDataSource] = useState<any>([])
  const [sourceList,setSourceList] = useState<any>([])
  const [buttonIndex,setButtonIndex] = useState<number>(0)
  const [params,setParams] = useState<any>({
    groupbytype:1,
    operatingtype:1,
    source_id:props.id,
    start_time:moment().subtract(10,'days').format('YYYY-MM-DD'),
    end_time:moment().format('YYYY-MM-DD'),
  })

  const cols = {
    date_str: {
      range: [0, 1]
    },
    count: {
      min: 0
    }
  };

  const getChartSource = useCallback(() => {
    axios.get(`/operating?groupbytype=${params.groupbytype}&operatingtype=${params.operatingtype}&source_id=${params.source_id}&start_time=${params.start_time}&end_time=${params.end_time}`)
      .then(res=>{
        setDataSource(res)
      })
  },[params])
  useEffect(() => {
    getChartSource()
    commonServices.getDistributionList().then(res=>{
      setSourceList(res)
    })
  },[getChartSource])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.start_time){values.start_time = values.start_time.format('YYYY-MM-DD')}
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    setParams({...params, ...values })
  }

  const handleSearch1 = (type: number) => {
    if(type === 0){
      setParams({
        ...params,
        start_time:moment().format('YYYY-MM-DD'),
        end_time:moment().format('YYYY-MM-DD')
      })
      setButtonIndex(0)
    }else if(type === 1){
      setParams({
        ...params,
        start_time:moment().subtract(1,'days').format('YYYY-MM-DD'),
        end_time:moment().subtract(1,'days').format('YYYY-MM-DD')
      })
      setButtonIndex(1)
    }else if(type === 2){
      setParams({
        ...params,
        start_time:moment().startOf('week').format('YYYY-MM-DD'),
        end_time:moment().format('YYYY-MM-DD')
      })
      setButtonIndex(2)
    }else if(type === 3){
      setParams({
        ...params,
        start_time:moment().startOf('month').format('YYYY-MM-DD'),
        end_time:moment().format('YYYY-MM-DD')
      })
      setButtonIndex(3)
    }
  }

  const handleChangeButton = (index:number) => {
    if(index === 0){
      setParams({
        ...params,
        groupbytype:1,
        start_time:moment().format('YYYY-MM-DD'),
        end_time:moment().format('YYYY-MM-DD')
      })
      setButtonIndex(0)
    }else{
      setParams({
        ...params,
        groupbytype:2,
        start_time:moment().format('YYYY-MM'),
        end_time:moment().format('YYYY-MM')
      })
      setButtonIndex(1)
    }
  }

  const handleSelect = (val:number) => {
    setParams({
      ...params,
      ordertype:val
    })
  }


  return (
    <>
      {props.type === 2 && <Row style={{marginTop:20}} type='flex' align='middle'>
        <Button.Group>
          <Button onClick={() => handleSearch1(0)} type={buttonIndex === 0 ? 'primary' : 'default'}>今日</Button>
          <Button onClick={() => handleSearch1(1)} type={buttonIndex === 1 ? 'primary' : 'default'}>昨日</Button>
          <Button onClick={() => handleSearch1(2)} type={buttonIndex === 2 ? 'primary' : 'default'}>本周</Button>
          <Button onClick={() => handleSearch1(3)} type={buttonIndex === 3 ? 'primary' : 'default'}>本月</Button>
        </Button.Group>
        <Select onChange={handleSelect} placeholder='请选择报表类型' style={{width:150,marginLeft:20}} >
          <Select.Option value={1}>访问量</Select.Option>
          <Select.Option value={2}>会员数</Select.Option>
          <Select.Option value={3}>订单数</Select.Option>
        </Select>
      </Row>}
      {props.type === 1 && <Row style={{marginTop:20}} type='flex' align='middle'>
        <Button.Group style={{marginBottom:24}}>
          <Button onClick={() => handleChangeButton(0)} type={buttonIndex === 0 ? 'primary' : 'default'}>按天</Button>
          <Button onClick={() => handleChangeButton(1)} type={buttonIndex === 1 ? 'primary' : 'default'}>按月</Button>
        </Button.Group>
        <OperationSearch sourceList={sourceList} initialValue={params} onSearch={handleSearch} />
      </Row>}
      <Row style={{marginTop:20}}>
        <Chart style={{marginLeft:-60}} height={400} data={dataSource} scale={cols} forceFit={true}>
          <Axis name="date_str" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="date_str*count" size={2} />
          <Geom
            type="point"
            position="date_str*count"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </Row>
    </>
  )
}

export default OperationChart
