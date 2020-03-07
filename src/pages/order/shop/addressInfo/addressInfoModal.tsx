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

const AddressInfoModal:FC<IProps> = (props) => {
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
      title='编辑收货方式'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='收货人' {...formItemLayout}>
        {getFieldDecorator('consignee_name', {
          initialValue:props.initialValue.consignee_name,
          rules: [
            {
              required: true,
              message: '请填写收货人',
            },
          ],
        })(<Input placeholder='请填写收货人' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='联系方式' {...formItemLayout}>
        {getFieldDecorator('consignee_phone', {
          initialValue:props.initialValue.consignee_phone,
          rules: [
            {
              required: true,
              message: '请填写联系方式',
            },
          ],
        })(<Input placeholder='请填写联系方式' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='收货地址' {...formItemLayout}>
        {getFieldDecorator('consignee_address', {
          initialValue:props.initialValue.consignee_address,
          rules: [
            {
              required: true,
              message: '请填写收货地址',
            },
          ],
        })(<Input placeholder='请填写收货地址' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(AddressInfoModal)

