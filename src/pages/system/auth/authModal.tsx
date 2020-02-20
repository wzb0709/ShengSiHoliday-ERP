import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps {
  readonly visible: boolean
  readonly onOk: (values:IFormItem) => void
  form:WrappedFormUtils
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  readonly initialValue:IFormItem
}

export interface IFormItem {
  title:string
}

const FormItem = Form.Item

const AuthModal: FC<IProps> = (props) => {

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
      title='添加/编辑产品分类'
      visible={props.visible}
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
      onCancel={props.onCancel}
    >
      <FormItem label='权限名' {...formItemLayout}>
        {getFieldDecorator('title', {
          initialValue:props.initialValue.title,
          rules: [
            {
              required: true,
              message: '请输入权限名',
            },
          ],
        })(<Input placeholder='请输入权限名' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(AuthModal)
