import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:IModalData) => void
  readonly initialValue:IModalData
}
export interface IModalData {
  advertising_title:string
}


const FormItem = Form.Item
const AdLocationModal:FC<IProps> = (props) => {
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
      title='添加/编辑广告位'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='广告位标题' {...formItemLayout}>
        {getFieldDecorator('advertising_title', {
          initialValue:props.initialValue.advertising_title,
          rules: [
            {
              required: true,
              message: '请输入广告位标题',
            },
          ],
        })(<Input placeholder='请输入产品位标题' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(AdLocationModal)
