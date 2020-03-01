import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'

interface IProps {
  form:WrappedFormUtils
  initialValue:IOneDayOrderSearch
  onSearch:(values:IOneDayOrderSearch) => void
}

export interface IOneDayOrderSearch {
  search:string,
  status:number,
  salesid:string,
  opid:string,
  issettle:number,
  start_time:string,
  end_time:string
}

const FormItem = Form.Item
const Option = Select.Option

const OneDayOrderSearch:FC<IProps> = (props) => {

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
      <FormItem>
        {getFieldDecorator('search', {
          initialValue:props.initialValue.search,
          rules: [
            {
              required: false,
            },
          ],
        })(<Input placeholder='搜索关键词' style={{width:200}} />)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('status', {
          initialValue:props.initialValue.status,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择订单状态' style={{width:200}} >
          <Option value={-1}>全部订单状态</Option>
          <Option value={0}>待付款</Option>
          <Option value={1}>已付款</Option>
          <Option value={2}>已确认</Option>
          <Option value={3}>已出游</Option>
          <Option value={4}>已评价</Option>
          <Option value={9}>已取消</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('issettle', {
          initialValue:props.initialValue.issettle,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择结算状态' style={{width:200}} >
          <Option value={-1}>全部结算状态</Option>
          <Option value={0}>未结算</Option>
          <Option value={1}>已结算</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('salesid', {
          initialValue:props.initialValue.salesid === '' ? undefined : props.initialValue.salesid,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择销售' style={{width:200}} />)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('opid', {
          initialValue:props.initialValue.opid === '' ? undefined : props.initialValue.opid,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择计调' style={{width:200}} />)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}} >
        {getFieldDecorator('start_time', {
          initialValue:props.initialValue.start_time === '' ? undefined : moment(props.initialValue.start_time),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker  placeholder='请选择开始时间' style={{width:200}} />)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}} >
        {getFieldDecorator('end_time', {
          initialValue:props.initialValue.end_time === '' ? undefined : moment(props.initialValue.end_time),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker placeholder='请选择结束时间' style={{width:200}} />)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(OneDayOrderSearch)
