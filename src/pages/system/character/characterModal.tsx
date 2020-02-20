import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

const FormItem = Form.Item

interface IProps {
  form:WrappedFormUtils
  readonly visible:boolean
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  readonly onOk: (values:IFormItem) => void
}

export interface IFormItem {
  title:string
}

const CharacterModal:FC<IProps> = (props) => {

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
      onOk={handleConfirm}
      width={800}
      title='添加角色'
      destroyOnClose={true}
    >
      <FormItem label='角色名' {...formItemLayout}>
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入角色名',
            },
          ],
        })(<Input placeholder='请输入角色名' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(CharacterModal)
