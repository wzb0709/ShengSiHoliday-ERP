import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'

interface IProps {
  form:WrappedFormUtils
  initialValue:ICarSearch
  onSearch:(values:ICarSearch) => void
  carList:any
  carTypeList:any
}

export interface ICarSearch {
  search:string,
  carid:string,
  price_type:number,
  getId:string,
  backId:string,
  status:number,
  start_time:string,
  end_time:string,
}

const FormItem = Form.Item
const Option = Select.Option

const CarOrderSearch:FC<IProps> = (props) => {

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
        {getFieldDecorator('carid', {
          initialValue:props.initialValue.carid || undefined,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择租赁车辆' style={{width:150}} >
          <Option value={undefined} >全部</Option>
          {props.carTypeList.map((item:any)=>{
            return <Option key={item.id}>{item.car_title}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('price_type', {
          initialValue:props.initialValue.price_type,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择计价方式' style={{width:150}} >
          <Option value={0}>全部计价方式</Option>
          <Option value={1}>按天</Option>
          <Option value={2}>按时</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('getId', {
          initialValue:props.initialValue.getId || undefined,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择借车点' style={{width:150}} >
          <Option value={undefined} >全部</Option>
          {props.carList.map((item:any)=>{
            return <Option key={item.id}>{item.point_title}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('backId', {
          initialValue:props.initialValue.backId || undefined,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择还车点' style={{width:150}} >
          <Option value={undefined} >全部</Option>
          {props.carList.map((item:any)=>{
            return <Option key={item.id}>{item.point_title}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('status', {
          initialValue:props.initialValue.status,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择订单状态' style={{width:150}} >
          <Option value={-1}>全部订单状态</Option>
          <Option value={0}>待付款</Option>
          <Option value={1}>已付款</Option>
          <Option value={3}>已确认</Option>
          <Option value={4}>已提车</Option>
          <Option value={5}>已还车</Option>
          <Option value={6}>订单完成</Option>
          <Option value={9}>已取消</Option>
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

export default Form.create<IProps>()(CarOrderSearch)
