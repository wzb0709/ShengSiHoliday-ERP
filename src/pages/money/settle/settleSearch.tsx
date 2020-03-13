import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'
import { IMember } from '@/models/login'

interface IProps {
  form:WrappedFormUtils
  initialValue:ISettleSearch
  onSearch:(values:ISettleSearch) => void
  memberList:Array<IMember>
}

export interface ISettleSearch {
  search:string,
  status:number,
  settle_date:string,
  opid:string,
}

const FormItem = Form.Item
const Option = Select.Option

const SettleSearch:FC<IProps> = (props) => {

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
        })(<Select placeholder='请选择状态' style={{width:150}} >
          <Option value={-1}>全部状态</Option>
          <Option value={0}>未审核</Option>
          <Option value={1}>已通过</Option>
          <Option value={2}>未通过</Option>
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
        {getFieldDecorator('settle_date', {
          initialValue:props.initialValue.settle_date === '' ? undefined : moment(props.initialValue.settle_date),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker.MonthPicker placeholder='请选择结算月份' style={{width:150}} />)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(SettleSearch)
