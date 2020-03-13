import React, { FC } from 'react'
import { Modal, Form, Select, Input, DatePicker, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item
const Option = Select.Option

const BackModal:FC<IProps> = (props) => {
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
      title='新增/编辑规则'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='出游剩余时间(≤小时)' {...formItemLayout}>
        {getFieldDecorator('remain_time', {
          initialValue:props.initialValue.remain_time,
          rules: [
            {
              required: true,
              message: '请填写出游剩余时间',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写出游剩余时间(≤小时)' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='退款比例(%)' {...formItemLayout}>
        {getFieldDecorator('refund_ratio', {
          initialValue:props.initialValue.refund_ratio,
          rules: [
            {
              required: true,
              message: '请填写退款比例',
            },
          ],
        })(<InputNumber min={0} max={100} placeholder='请填写退款比例(%)' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(BackModal)

