import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'
import { IMember } from '@/models/login'

interface IProps {
  form:WrappedFormUtils
  initialValue:IGroupManagerSearch
  onSearch:(values:IGroupManagerSearch) => void
  guideList:any
  memberList:Array<IMember>
}

export interface IGroupManagerSearch {
  search:string,
  guideid:string,
  start_time:string,
  end_time:string,
  opid:string,
  month:string
}

const FormItem = Form.Item
const Option = Select.Option

const GroupManagerSearch:FC<IProps> = (props) => {

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
        {getFieldDecorator('guideid', {
          initialValue:props.initialValue.guideid || undefined,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择导游' style={{width:150}} >
          <Option value={undefined} >全部导游</Option>
          {props.guideList.map((item:any)=>{
            return <Option key={item.id}>{item.tour_name}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('opid', {
          initialValue:props.initialValue.opid === '' ? undefined : props.initialValue.opid,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择计调' style={{width:150}} >
          {props.memberList.map(item=>{
            return item.is_op && (
              <Option key={item.id}>{item.name}</Option>
            )
          })}
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
      <FormItem style={{width:150,marginLeft:20}} >
        {getFieldDecorator('month', {
          initialValue:props.initialValue.month === '' ? undefined : moment(props.initialValue.month),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker.MonthPicker placeholder='请选择月份' style={{width:150}} />)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(GroupManagerSearch)
