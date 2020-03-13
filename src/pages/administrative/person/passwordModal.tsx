import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
}


const FormItem = Form.Item

const PasswordModal:FC<IProps> = (props) => {
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
      title='更改密码'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='旧密码' {...formItemLayout}>
        {getFieldDecorator('oldpwd', {
          rules: [
            {
              required: true,
              message: '请输入旧密码',
            },
          ],
        })(<Input placeholder='请输入旧密码' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='新密码' {...formItemLayout}>
        {getFieldDecorator('newpwd', {
          rules: [
            {
              required: true,
              message: '请输入新密码',
            },
          ],
        })(<Input placeholder='请输入新密码' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(PasswordModal)
