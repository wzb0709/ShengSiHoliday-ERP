import React, { FC } from 'react'
import { Modal, Form, Select, Input, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  source:any
}

const FormItem = Form.Item
const Option = Select.Option

const PaymentModal:FC<IProps> = (props) => {
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
      title='新增/编辑收退款'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='来源' {...formItemLayout}>
        {getFieldDecorator('payment_source', {
          initialValue:props.initialValue.payment_source,
          rules: [
            {
              required: true,
              message: '请选择来源',
            },
          ],
        })(<Select placeholder='请选择来源' style={{width:"70%"}} >
          {props.source.map((item:any) => {
            return <Option key={item.id}>{item.source_title}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem label='款项类型' {...formItemLayout}>
        {getFieldDecorator('pay_type', {
          initialValue:props.initialValue.pay_type,
          rules: [
            {
              required: true,
              message: '请选择款项类型',
            },
          ],
        })(<Select placeholder='请选择款项类型' style={{width:"70%"}} >
          <Option value={1}>收款</Option>
          <Option value={2}>退款</Option>
        </Select>)}
      </FormItem>
      <FormItem label='款项金额' {...formItemLayout}>
        {getFieldDecorator('payment_money', {
          initialValue:props.initialValue.payment_money,
          rules: [
            {
              required: true,
              message: '请填写款项金额',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写款项金额' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='款项描述' {...formItemLayout}>
        {getFieldDecorator('remark', {
          initialValue:props.initialValue.remark,
          rules: [
            {
              required: true,
              message: '请填写款项描述',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请填写款项描述' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(PaymentModal)

