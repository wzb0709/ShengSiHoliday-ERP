import React, { FC } from 'react'
import { Modal, Form, Input, Select, InputNumber, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import BlockUpload from '@/component/upload/blockUpload'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item

const AttractionModal:FC<IProps> = (props) => {
  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }
  const formItemLayout1 = {
    labelCol: {span: 3},
    wrapperCol: {span: 21},
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
      title='添加/编辑美食信息'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <Row>
        <Col span={12}>
          <FormItem label='景点名称' {...formItemLayout}>
            {getFieldDecorator('scenic_title', {
              initialValue:props.initialValue.scenic_title,
              rules: [
                {
                  required: true,
                  message: '请输入景点名称',
                },
              ],
            })(<Input placeholder='请输入景点名称' style={{width:"90%"}} />)}
          </FormItem>
          <FormItem label='营业时间' {...formItemLayout}>
            {getFieldDecorator('scenic_time', {
              initialValue:props.initialValue.scenic_time,
              rules: [
                {
                  required: true,
                  message: '请输入营业时间',
                },
              ],
            })(<Input placeholder='请输入营业时间' style={{width:"90%"}} />)}
          </FormItem>
          <FormItem label='联系电话' {...formItemLayout}>
            {getFieldDecorator('scenic_phone', {
              initialValue:props.initialValue.scenic_phone,
              rules: [
                {
                  required: true,
                  message: '请输入联系电话',
                },
              ],
            })(<Select placeholder='请输入联系电话' mode='tags' style={{ width: '90%' }}/>)}
          </FormItem>
        </Col>
        <Col span={12} >
          <FormItem>
            {getFieldDecorator('scenic_pics', {
              initialValue:props.initialValue.scenic_pics,
              rules: [
                {
                  required: true,
                },
              ],
            })(<BlockUpload />)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label='景点地址' {...formItemLayout1}>
        {getFieldDecorator('scenic_address', {
          initialValue:props.initialValue.scenic_address,
          rules: [
            {
              required: true,
              message: '请输入景点地址',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入景点地址' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(AttractionModal)
