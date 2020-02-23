import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Col, Form, Input, InputNumber, Modal } from 'antd'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const ReceptionModal:FC<IProps> = (props) => {

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
      title='添加/编辑一团一议'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
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
        {getFieldDecorator('product_subtitle', {
          initialValue: props.initialValue.product_subtitle,
          rules: [
            {
              required: true,
              message: '请输入产品副标题',
            },
          ],
        })(<Input placeholder='请输入产品副标题' style={{ width: '90%' }}/>)}
      </FormItem>
      <FormItem label='行程缩影' {...formItemLayout}>
        {getFieldDecorator('travel_summary', {
          initialValue:props.initialValue.travel_summary,
          rules: [
            {
              required: true,
              message: '请输入数量',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入数量' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ReceptionModal)
