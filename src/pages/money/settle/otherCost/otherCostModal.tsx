import React, { FC } from 'react'
import { Modal, Form, InputNumber, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const SettleOtherCostModal:FC<IProps> = (props) => {
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
      title='添加/编辑成本'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='成本标题' {...formItemLayout}>
        {getFieldDecorator('cost_title', {
          initialValue:props.initialValue.cost_title,
          rules: [
            {
              required: true,
              message: '请填写成本标题',
            },
          ],
        })(<Input placeholder='请填写成本标题' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='数量' {...formItemLayout}>
        {getFieldDecorator('cost_count', {
          initialValue:props.initialValue.cost_count,
          rules: [
            {
              required: true,
              message: '请填写数量',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写数量' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='单价' {...formItemLayout}>
        {getFieldDecorator('cost_price', {
          initialValue:props.initialValue.cost_price,
          rules: [
            {
              required: true,
              message: '请填写单价',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写单价' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='备注' {...formItemLayout}>
        {getFieldDecorator('cost_notes', {
          initialValue:props.initialValue.cost_notes,
          rules: [
            {
              required: true,
              message: '请填写备注',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请填写备注' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(SettleOtherCostModal)

