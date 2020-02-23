import React, { FC, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, InputNumber, Row, Select, Col } from 'antd'

import { WrappedFormUtils } from 'antd/es/form/Form'
import BlockUpload from '@/component/upload/blockUpload'

export interface IProps {
  form: WrappedFormUtils
  readonly initialValue: any
}

const FormItem = Form.Item

const ShoppingForm: FC<IProps> = (props, refs) => {

  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const formItemLayout1 = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  }

  useImperativeHandle(refs, () => ({}))

  return (
    <Form>
      <Row>
        <Col span={12}>
          <FormItem label='产品标题' {...formItemLayout}>
            {getFieldDecorator('shop_title', {
              initialValue: props.initialValue.shop_title,
              rules: [
                {
                  required: true,
                  message: '请输入产品标题',
                },
              ],
            })(<Input placeholder='请输入产品标题' style={{ width: '90%' }}/>)}
          </FormItem>
          <FormItem label='产品副标题' {...formItemLayout}>
            {getFieldDecorator('shop_subtitle', {
              initialValue: props.initialValue.shop_subtitle,
              rules: [
                {
                  required: true,
                  message: '请输入产品副标题',
                },
              ],
            })(<Input placeholder='请输入产品副标题' style={{ width: '90%' }}/>)}
          </FormItem>
          <FormItem label='产品标签' {...formItemLayout}>
            {getFieldDecorator('shop_tags', {
              initialValue: props.initialValue.shop_tags,
              rules: [
                {
                  required: true,
                  message: '请输入产品标签',
                },
              ],
            })(<Select placeholder='请输入产品标签' mode='tags' style={{ width: '90%' }}/>)}
          </FormItem>
          <FormItem label='购买人数' {...formItemLayout}>
            {getFieldDecorator('buy_person', {
              initialValue: props.initialValue.buy_person,
              rules: [
                {
                  required: true,
                  message: '请输入购买人数',
                },
              ],
            })(<InputNumber placeholder='请输入购买人数' style={{ width: '90%' }}/>)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem>
            {getFieldDecorator('shop_pics', {
              initialValue: props.initialValue.shop_pics,
              rules: [
                {
                  required: true,
                },
              ],
            })(<BlockUpload/>)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label='温馨提示' {...formItemLayout1}>
        {getFieldDecorator('warm_prompt', {
          initialValue: props.initialValue.warm_prompt,
          rules: [
            {
              required: true,
              message: '请输入温馨提示',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入温馨提示' style={{ width: '90%' }}/>)}
      </FormItem>
    </Form>
  )
}

export default Form.create<IProps>()(forwardRef(ShoppingForm))
