import React, { FC, useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select, Col, Row, DatePicker } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const Option = Select.Option

const CouponModal:FC<IProps> = (props) => {

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
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='添加/编辑优惠券'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='优惠券标题' {...formItemLayout}>
        {getFieldDecorator('coupon_title', {
          initialValue:props.initialValue.coupon_title,
          rules: [
            {
              required: true,
              message: '请输入优惠券标题',
            },
          ],
        })(<Input placeholder='请输入优惠券标题' style={{width:"70%"}} />)}
      </FormItem>
      <Row>
        <Col span={12} >
          <FormItem label='优惠券归属' {...formItemLayout}>
            {getFieldDecorator('coupon_use', {
              initialValue:props.initialValue.coupon_use,
              rules: [
                {
                  required: true,
                  message: '请选择优惠券归属',
                },
              ],
            })(<Select placeholder='请选择优惠券归属' style={{width:"70%"}} >
              <Option value={1}>购物</Option>
              <Option value={2}>美食</Option>
            </Select>)}
          </FormItem>
        </Col>
        <Col span={12} >
          <FormItem label='优惠券类型' {...formItemLayout}>
            {getFieldDecorator('coupon_type', {
              initialValue:props.initialValue.coupon_type,
              rules: [
                {
                  required: true,
                  message: '请选择优惠券类型',
                },
              ],
            })(<Select placeholder='请选择优惠券类型' style={{width:"70%"}} >
              <Option value={1}>免单券</Option>
              <Option value={2}>满减券</Option>
              <Option value={2}>立减券</Option>
            </Select>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <FormItem label='开始时间' {...formItemLayout}>
            {getFieldDecorator('start_time', {
              initialValue:props.initialValue.start_time ? moment(props.initialValue.start_time) : undefined,
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                },
              ],
            })(<DatePicker placeholder='请选择开始时间' style={{width:"70%"}} />)}
          </FormItem>
        </Col>
        <Col span={12} >
          <FormItem label='结束时间' {...formItemLayout}>
            {getFieldDecorator('end_time', {
              initialValue:props.initialValue.end_time ? moment(props.initialValue.end_time) : undefined,
              rules: [
                {
                  required: true,
                  message: '请选择结束时间',
                },
              ],
            })(<DatePicker placeholder='请选择结束时间' style={{width:"70%"}} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12} >
          <FormItem label='优惠券数量' {...formItemLayout}>
            {getFieldDecorator('coupon_count', {
              initialValue:props.initialValue.coupon_count,
              rules: [
                {
                  required: true,
                  message: '请填写优惠券数量',
                },
              ],
            })(<InputNumber placeholder='请填写优惠券数量' style={{width:"70%"}} />)}
          </FormItem>
        </Col>
        <Col span={12} >
          <FormItem label='用户最大领取数' {...formItemLayout}>
            {getFieldDecorator('coupon_maxtake', {
              initialValue:props.initialValue.coupon_maxtake,
              rules: [
                {
                  required: true,
                  message: '请填写用户最大领取数',
                },
              ],
            })(<InputNumber placeholder='请填写用户最大领取数' style={{width:"70%"}} />)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label='优惠券金额' {...formItemLayout}>
        {getFieldDecorator('coupon_moeny', {
          initialValue:props.initialValue.coupon_moeny,
          rules: [
            {
              required: true,
              message: '请填写优惠券金额',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写优惠券金额' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='优惠券描述' {...formItemLayout}>
        {getFieldDecorator('coupon_summary', {
          initialValue:props.initialValue.coupon_summary,
          rules: [
            {
              required: true,
              message: '请填写优惠券描述',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请填写优惠券描述' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(CouponModal)
