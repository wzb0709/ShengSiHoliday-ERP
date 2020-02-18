import React, { FC, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, InputNumber, Row, Select, Col } from 'antd'

import { WrappedFormUtils } from 'antd/es/form/Form'
import BlockUpload from '@/component/upload/blockUpload'

export interface IProps {
  form: WrappedFormUtils
  readonly initialValue: any
}

const FormItem = Form.Item

const OneDayForm: FC<IProps> = (props, refs) => {

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
            {getFieldDecorator('product_title', {
              initialValue: props.initialValue.product_title,
              rules: [
                {
                  required: true,
                  message: '请输入产品标题',
                },
              ],
            })(<Input placeholder='请输入产品标题' style={{ width: '90%' }}/>)}
          </FormItem>
          <FormItem label='产品副标题' {...formItemLayout}>
            {getFieldDecorator('product_sub_title', {
              initialValue: props.initialValue.product_sub_title,
              rules: [
                {
                  required: true,
                  message: '请输入产品副标题',
                },
              ],
            })(<Input placeholder='请输入产品副标题' style={{ width: '90%' }}/>)}
          </FormItem>
          <FormItem label='产品标签' {...formItemLayout}>
            {getFieldDecorator('product_tag', {
              initialValue: props.initialValue.product_tag,
              rules: [
                {
                  required: true,
                  message: '请输入产品标签',
                },
              ],
            })(<Select placeholder='请输入产品标签' mode='tags' style={{ width: '90%' }}/>)}
          </FormItem>
          <FormItem label='游玩人数' {...formItemLayout}>
            {getFieldDecorator('travel_person', {
              initialValue: props.initialValue.travel_person,
              rules: [
                {
                  required: true,
                  message: '请输入游玩人数',
                },
              ],
            })(<InputNumber placeholder='请输入游玩人数' style={{ width: '90%' }}/>)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem>
            {getFieldDecorator('product_img', {
              initialValue: props.initialValue.product_img,
              rules: [
                {
                  required: true,
                },
              ],
            })(<BlockUpload/>)}
          </FormItem>
        </Col>
      </Row>

      <FormItem label='费用说明' {...formItemLayout1}>
        {getFieldDecorator('fee_desc', {
          initialValue: props.initialValue.fee_desc,
          rules: [
            {
              required: true,
              message: '请输入费用说明',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入费用说明' style={{ width: '90%' }}/>)}
      </FormItem>
      <FormItem label='预定须知' {...formItemLayout1}>
        {getFieldDecorator('announcements', {
          initialValue: props.initialValue.announcements,
          rules: [
            {
              required: true,
              message: '请输入预定须知',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入费用说明' style={{ width: '90%' }}/>)}
      </FormItem>
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

export default Form.create<IProps>()(forwardRef(OneDayForm))
