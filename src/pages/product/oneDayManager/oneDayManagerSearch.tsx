import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select,DatePicker } from 'antd'
import moment from 'moment'

interface IProps {
  form:WrappedFormUtils
  initialValue:IOneDayManagerSearch
  onSearch:(values:IOneDayManagerSearch) => void
}

export interface IOneDayManagerSearch {
  search:string,
  status:number,
  start_time:string,
  end_time:string,
  op_id:string,
}

const FormItem = Form.Item
const Option = Select.Option

const OneDayManagerSearch:FC<IProps> = (props) => {

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
        })(<Select placeholder='请选择上架状态' style={{width:200}} >
          <Option value={-1}>全部上架状态</Option>
          <Option value={0}>未上架</Option>
          <Option value={1}>已上架</Option>
        </Select>)}
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
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('op_id', {
          initialValue:props.initialValue.op_id === '' ? undefined : props.initialValue.op_id,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择计调' style={{width:200}} />)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(OneDayManagerSearch)
