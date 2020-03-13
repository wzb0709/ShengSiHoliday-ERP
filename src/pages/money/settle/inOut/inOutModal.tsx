import React, { FC } from 'react'
import { Modal, Form, InputNumber, Input, Select } from 'antd'
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

const SettleInOutModal:FC<IProps> = (props) => {
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
      title='添加/编辑收入支出'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='名称' {...formItemLayout}>
        {getFieldDecorator('title', {
          initialValue:props.initialValue.title,
          rules: [
            {
              required: true,
              message: '请填写名称',
            },
          ],
        })(<Input placeholder='请填写名称' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='类型' {...formItemLayout}>
        {getFieldDecorator('type', {
          initialValue:props.initialValue.type,
          rules: [
            {
              required: true,
              message: '请选择类型',
            },
          ],
        })(<Select placeholder='请选择类型' style={{width:"70%"}} >
          <Option value={1}>收入</Option>
          <Option value={2}>支出</Option>
        </Select>)}
      </FormItem>
      <FormItem label='金额' {...formItemLayout}>
        {getFieldDecorator('total_price', {
          initialValue:props.initialValue.total_price,
          rules: [
            {
              required: true,
              message: '请填写金额',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写金额' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='备注' {...formItemLayout}>
        {getFieldDecorator('remark', {
          initialValue:props.initialValue.remark,
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

export default Form.create<IProps>()(SettleInOutModal)

