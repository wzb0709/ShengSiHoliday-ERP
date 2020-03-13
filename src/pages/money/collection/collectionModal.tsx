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
const CollectionModal:FC<IProps> = (props) => {
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
      title='审核'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='拒绝理由' {...formItemLayout}>
        {getFieldDecorator('status_summary', {
          rules: [
            {
              required: true,
              message: '请输入拒绝理由',
            },
          ],
        })(<Input placeholder='请输入拒绝理由' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(CollectionModal)
