import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Row, Select } from 'antd'
import axios from 'axios'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import moment from 'moment'
import OrderChartSearch from '@/component/chart/orderChartSearch'

interface IProps {
  type:number
}

const Option = Select.Option

const OrderChart:FC<IProps> = (props) => {

  const [dataSource,setDataSource] = useState<any>([])
  const [params,setParams] = useState<any>({
    groupbytype:1,
    ordertype:1,
    start_time:moment().subtract(10,'days').format('YYYY-MM-DD'),
    end_time:moment().format('YYYY-MM-DD'),
  })
  const [buttonIndex,setButtonIndex] = useState<number>(0)

  const getChartSource = useCallback(() => {
    axios.get(`/orderReport?groupbytype=${params.groupbytype}&ordertype=${params.ordertype}&start_time=${params.start_time}&end_time=${params.end_time}`)
      .then(res=>{
        setDataSource(res)
      })
  },[params])
  useEffect(() => {
    getChartSource()
  },[getChartSource])

  //查询按钮点击事件
  const handleSearch = (type:number) => {
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

  const handleSearch1 = (values:any) => {
    if(values.start_time)values.start_time = values.start_time.format('YYYY-MM-DD')
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    setParams({ ...params, ...values  })
  }

  const cols = {
    date_str: {
      range: [0, 1]
    },
    total_price: {
      min: 0
    }
  };

  const handleSelect = (val:number) => {
    setParams({
      ...params,
      ordertype:val
    })
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


  return (
    <>
      <Row style={{marginTop:20}} type='flex' align='middle'>
        {props.type === 2 && <Button.Group>
          <Button onClick={() => handleSearch(0)} type={buttonIndex === 0 ? 'primary' : 'default'}>今日</Button>
          <Button onClick={() => handleSearch(1)} type={buttonIndex === 1 ? 'primary' : 'default'}>昨日</Button>
          <Button onClick={() => handleSearch(2)} type={buttonIndex === 2 ? 'primary' : 'default'}>本周</Button>
          <Button onClick={() => handleSearch(3)} type={buttonIndex === 3 ? 'primary' : 'default'}>本月</Button>
        </Button.Group>}
        {props.type === 2 && <Select defaultValue={1} onChange={handleSelect} placeholder='请选择订单类型' style={{width:150,marginLeft:20}} >
          <Option value={1}>一日游</Option>
          <Option value={2}>购物</Option>
          <Option value={3}>定制游</Option>
          <Option value={4}>汽车租赁</Option>
          <Option value={5}>一团一议</Option>
        </Select>}
       {props.type === 1 &&
         <>
           <Button.Group style={{marginBottom:24}}>
             <Button onClick={() => handleChangeButton(0)} type={buttonIndex === 0 ? 'primary' : 'default'}>按天</Button>
             <Button onClick={() => handleChangeButton(1)} type={buttonIndex === 1 ? 'primary' : 'default'}>按月</Button>
           </Button.Group>
           <OrderChartSearch initialValue={params} onSearch={handleSearch1} />
         </>
       }
      </Row>
      <Row style={{marginTop:20}}>
        <Chart style={{marginLeft:-60}} height={400} data={dataSource} scale={cols} forceFit={true}>
          <Axis name="date_str" />
          <Axis name="total_price" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="date_str*total_price" size={2} />
          <Geom
            type="point"
            position="date_str*total_price"
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

export default OrderChart
