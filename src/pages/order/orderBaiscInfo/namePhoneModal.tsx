import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const NamePhoneModal:FC<IProps> = (props) => {
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
      title='编辑联系人信息'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='联系人姓名' {...formItemLayout}>
        {getFieldDecorator('contact_name', {
          initialValue:props.initialValue.contact_name,
          rules: [
            {
              required: true,
              message: '请输入联系人姓名',
            },
          ],
        })(<Input placeholder='请输入联系人姓名' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='联系人电话' {...formItemLayout}>
        {getFieldDecorator('contact_phone', {
          initialValue:props.initialValue.contact_phone,
          rules: [
            {
              required: true,
              message: '请输入联系人电话',
              pattern:/^1[3456789]\d{9}$/
            },
          ],
        })(<Input placeholder='请输入联系人电话' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(NamePhoneModal)
