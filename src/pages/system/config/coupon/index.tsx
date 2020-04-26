import React, { FC } from 'react'
import { Card, Form, Select, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps {
  form:WrappedFormUtils
  readonly initialValue:any
  readonly onOk:(values:any) => void
  couponList:any
}

const FormItem = Form.Item
const Option = Select.Option

const ConfigCoupon:FC<IProps> = (props) => {

  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }

  const handleConfirm = () => {
    props.form.validateFields((err,values)=>{
      if(!err){
        props.onOk(values)
      }
    })
  }

  return (
    <>
      <Card
        title='优惠券配置'
        extra={<a onClick={handleConfirm}>保存</a>}
        style={{marginTop:20}}
      >
        <FormItem label='是否允许使用优惠券' {...formItemLayout}>
          {getFieldDecorator('is_can_usecoupon', {
            initialValue:props.initialValue.is_can_usecoupon,
            rules: [
              {
                required: true,
                message: '请选择是否允许使用优惠券'
              },
            ],
          })(<Radio.Group style={{width:"70%"}} >
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label='注册赠送优惠券' {...formItemLayout}>
          {getFieldDecorator('register_coupons', {
            initialValue:props.initialValue.register_coupons === '' ? undefined : props.initialValue.register_coupons,
            rules: [
              {
                required: false,
                message: '请选择注册赠送优惠券'
              },
            ],
          })(<Select mode='multiple' placeholder='请选择注册赠送优惠券' style={{width:"70%"}} >
            {props.couponList.map((item:any)=>{
              return(
                <Option key={item.id}>{item.coupon_title}</Option>
                )
            })}
          </Select>)}
        </FormItem>
        <FormItem label='一日游下单赠送优惠券' {...formItemLayout}>
          {getFieldDecorator('group_order_coupons', {
            initialValue:props.initialValue.group_order_coupons === '' ? undefined : props.initialValue.group_order_coupons,
            rules: [
              {
                required: false,
                message: '请选择一日游下单赠送优惠券'
              },
            ],
          })(<Select mode='multiple' placeholder='请选择一日游下单赠送优惠券' style={{width:"70%"}} >
            {props.couponList.map((item:any)=>{
              return(
                <Option key={item.id}>{item.coupon_title}</Option>
              )
            })}
          </Select>)}
        </FormItem>
        <FormItem label='购物下单赠送优惠券' {...formItemLayout}>
          {getFieldDecorator('shop_order_coupons', {
            initialValue:props.initialValue.shop_order_coupons  === '' ? undefined : props.initialValue.shop_order_coupons,
            rules: [
              {
                required: false,
                message: '请选择购物下单赠送优惠券'
              },
            ],
          })(<Select mode='multiple' placeholder='请选择购物下单赠送优惠券' style={{width:"70%"}} >
            {props.couponList.map((item:any)=>{
              return(
                <Option key={item.id}>{item.coupon_title}</Option>
              )
            })}
          </Select>)}
        </FormItem>
        <FormItem label='租赁下单赠送优惠券' {...formItemLayout}>
          {getFieldDecorator('car_order_coupons', {
            initialValue:props.initialValue.car_order_coupons === '' ? undefined : props.initialValue.car_order_coupons,
            rules: [
              {
                required: false,
                message: '请选择租赁下单赠送优惠券'
              },
            ],
          })(<Select mode='multiple' placeholder='请选择租赁下单赠送优惠券' style={{width:"70%"}} >
            {props.couponList.map((item:any)=>{
              return(
                <Option key={item.id}>{item.coupon_title}</Option>
              )
            })}
          </Select>)}
        </FormItem>
      </Card>
    </>
  )
}

export default Form.create<IProps>()(ConfigCoupon)
