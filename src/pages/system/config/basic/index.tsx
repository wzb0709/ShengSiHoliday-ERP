import React, { FC } from 'react'
import { Card, Form, Row, Col, Input, Modal } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps {
  form:WrappedFormUtils
  readonly initialValue:any
  readonly onOk:(values:any) => void
}

const FormItem = Form.Item

const ConfigBasic:FC<IProps> = (props) => {

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
        title='客服配置'
        extra={<a onClick={handleConfirm}>保存</a>}
      >
        <Row>
          <Col span={12}>
            <FormItem label='联系电话' {...formItemLayout}>
              {getFieldDecorator('service_phone', {
                initialValue:props.initialValue.service_phone,
                rules: [
                  {
                    required: true,
                    message: '请填写联系电话',
                    pattern:/^1[3456789]\d{9}$/
                  },
                ],
              })(<Input placeholder='请填写联系电话' style={{width:"70%"}} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='微信号' {...formItemLayout}>
              {getFieldDecorator('service_wechat', {
                initialValue:props.initialValue.service_wechat,
                rules: [
                  {
                    required: true,
                    message: '请填写微信号',
                  },
                ],
              })(<Input placeholder='请填写微信号' style={{width:"70%"}} />)}
            </FormItem>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Form.create<IProps>()(ConfigBasic)
