import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select,DatePicker } from 'antd'
import moment from 'moment'

interface IProps {
  form:WrappedFormUtils
  initialValue:ICouponSearch
  onSearch:(values:ICouponSearch) => void
  sourceList:any
}

export interface ICouponSearch {
  groupbytype:number,
  operatingtype:number,
  start_time:string,
  end_time:string,
  source_id:string,
}

const FormItem = Form.Item
const Option = Select.Option

const OperationSearch:FC<IProps> = (props) => {

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
      {/*<Select placeholder='请选择区间' style={{width:150}} >*/}
      {/*  <Option value={1}>最近三个月</Option>*/}
      {/*  <Option value={2}>会员数</Option>*/}
      {/*  <Option value={3}>订单数</Option>*/}
      {/*</Select>*/}
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('operatingtype', {
          initialValue:props.initialValue.operatingtype,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择报表类型' style={{width:150}} >
          <Option value={1}>访问量</Option>
          <Option value={2}>会员数</Option>
          <Option value={3}>订单数</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('source_id', {
          initialValue:props.initialValue.source_id,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择商户' style={{width:150}} >
          {props.sourceList.map((item:any) => {
            return (
              <Option key={item.id}>{item.distribution_name}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      {(props.initialValue.groupbytype === 1) && <>
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
      </>}
      {props.initialValue.groupbytype  === 2 && <>
        <FormItem style={{width:150,marginLeft:20}} >
          {getFieldDecorator('start_time', {
            initialValue:props.initialValue.start_time === '' ? undefined : moment(props.initialValue.start_time),
            rules: [
              {
                required: false,
              },
            ],
          })(<DatePicker.MonthPicker  placeholder='请选择开始时间' style={{width:150}} />)}
        </FormItem>
        <FormItem style={{width:150,marginLeft:20}} >
          {getFieldDecorator('end_time', {
            initialValue:props.initialValue.end_time === '' ? undefined : moment(props.initialValue.end_time),
            rules: [
              {
                required: false,
              },
            ],
          })(<DatePicker.MonthPicker placeholder='请选择结束时间' style={{width:150}} />)}
        </FormItem>
      </>}
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(OperationSearch)
