import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select,DatePicker } from 'antd'
import moment from 'moment'

interface IProps {
  form:WrappedFormUtils
  initialValue:IOrderChartSearch
  onSearch:(values:IOrderChartSearch) => void
}

export interface IOrderChartSearch {
  groupbytype:number,
  ordertype:number,
  start_time:string,
  end_time:string,
}

const FormItem = Form.Item
const Option = Select.Option

const OrderChartSearch:FC<IProps> = (props) => {

  const {getFieldDecorator} = props.form

  const handleConfirm = () => {
    props.form.validateFields((err,values)=>{
      if(!err){
        props.onSearch(values)
      }
    })
  }

  return (
    <>
      {/*<FormItem style={{width:150}}>*/}
      {/*  {getFieldDecorator('groupbytype', {*/}
      {/*    initialValue:props.initialValue.groupbytype,*/}
      {/*    rules: [*/}
      {/*      {*/}
      {/*        required: false,*/}
      {/*      },*/}
      {/*    ],*/}
      {/*  })(<Select placeholder='请选择显示方式' style={{width:150}} >*/}
      {/*    <Option value={1}>按天</Option>*/}
      {/*    <Option value={2}>按月</Option>*/}
      {/*  </Select>)}*/}
      {/*</FormItem>*/}
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('ordertype', {
          initialValue:props.initialValue.ordertype,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择订单类型' style={{width:150}} >
          <Option value={1}>一日游</Option>
          <Option value={2}>购物</Option>
          <Option value={3}>定制游</Option>
          <Option value={4}>汽车租赁</Option>
          <Option value={5}>一团一议</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}} >
        {getFieldDecorator('start_time', {
          initialValue:props.initialValue.start_time === '' ? undefined : moment(props.initialValue.start_time),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker  placeholder='请选择开始时间' style={{width:150}} />)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}} >
        {getFieldDecorator('end_time', {
          initialValue:props.initialValue.end_time === '' ? undefined : moment(props.initialValue.end_time),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker placeholder='请选择结束时间' style={{width:150}} />)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(OrderChartSearch)
