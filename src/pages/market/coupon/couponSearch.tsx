import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select,DatePicker } from 'antd'
import moment from 'moment'

interface IProps {
  form:WrappedFormUtils
  initialValue:ICouponSearch
  onSearch:(values:ICouponSearch) => void
}

export interface ICouponSearch {
  search:string,
  status:number,
  start_time:string,
  end_time:string,
  source:number,
  type:number
}

const FormItem = Form.Item
const Option = Select.Option

const CouponSearch:FC<IProps> = (props) => {

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
        })(<Input placeholder='搜索关键词' style={{width:150}} />)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('status', {
          initialValue:props.initialValue.status,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择显示状态' style={{width:150}} >
          <Option value={-1}>全部显示状态</Option>
          <Option value={0}>未显示</Option>
          <Option value={1}>已显示</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('source', {
          initialValue:props.initialValue.source,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择归属' style={{width:150}} >
          <Option value={0}>全部归属</Option>
          <Option value={1}>购物</Option>
          <Option value={2}>美食</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('type', {
          initialValue:props.initialValue.type,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择类型' style={{width:150}} >
          <Option value={0}>全部类型</Option>
          <Option value={1}>免单券</Option>
          <Option value={2}>满减券</Option>
          <Option value={2}>立减券</Option>
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

export default Form.create<IProps>()(CouponSearch)
