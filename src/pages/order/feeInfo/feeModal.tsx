import React, { FC } from 'react'
import { Modal, Form, Select, Input, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item
const Option = Select.Option

const FeeModal:FC<IProps> = (props) => {
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
      title='新增/编辑费用'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='费用类型' {...formItemLayout}>
        {getFieldDecorator('fee_type', {
          initialValue:props.initialValue.fee_type,
          rules: [
            {
              required: true,
              message: '请选择费用类型',
            },
          ],
        })(<Select placeholder='请选择费用类型' style={{width:"70%"}} >
          <Option value={1}>增加</Option>
          <Option value={2}>减少</Option>
        </Select>)}
      </FormItem>
      <FormItem label='费用金额' {...formItemLayout}>
        {getFieldDecorator('fee_price', {
          initialValue:props.initialValue.fee_price,
          rules: [
            {
              required: true,
              message: '请填写费用金额',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写费用金额' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='费用描述' {...formItemLayout}>
        {getFieldDecorator('fee_summary', {
          initialValue:props.initialValue.fee_summary,
          rules: [
            {
              required: true,
              message: '请填写费用描述',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请填写费用描述' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(FeeModal)

