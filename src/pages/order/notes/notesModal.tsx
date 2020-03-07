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

const NotesModal:FC<IProps> = (props) => {
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
      title='编辑备注'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='备注' {...formItemLayout}>
        {getFieldDecorator('notes', {
          initialValue:props.initialValue.notes,
          rules: [
            {
              required: true,
              message: '请填写备注',
            },
          ],
        })(<Input.TextArea rows={3} style={{width:'70%'}} placeholder='请填写备注' />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(NotesModal)

