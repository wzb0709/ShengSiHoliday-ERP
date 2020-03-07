import React, { FC } from 'react'
import { Modal, Form, Select, Input,DatePicker } from 'antd'
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

const RentalInfoModal:FC<IProps> = (props) => {
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
      title='编辑租赁信息'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='车牌号' {...formItemLayout}>
        {getFieldDecorator('plate_number', {
          initialValue:props.initialValue.plate_number,
          rules: [
            {
              required: true,
              message: '请填写车牌号',
            },
          ],
        })(<Input placeholder='请填写车牌号' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='租赁方式' {...formItemLayout}>
        {getFieldDecorator('price_type', {
          initialValue:props.initialValue.price_type,
          rules: [
            {
              required: true,
              message: '请选择租赁方式',
            },
          ],
        })(<Select placeholder='请选择租赁方式' style={{width:"70%"}} >
          <Option value={1}>按天计价</Option>
          <Option value={2}>按时计价</Option>
        </Select>)}
      </FormItem>
      <FormItem label='开始时间' {...formItemLayout}>
        {getFieldDecorator('start_time', {
          initialValue:props.initialValue.start_time ? moment(props.initialValue.start_time) : undefined,
          rules: [
            {
              required: true,
              message: '请填写开始时间',
            },
          ],
        })(<DatePicker showTime={true} placeholder='请填写开始时间' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='结束时间' {...formItemLayout}>
        {getFieldDecorator('end_time', {
          initialValue:props.initialValue.end_time ? moment(props.initialValue.end_time) : undefined,
          rules: [
            {
              required: true,
              message: '请填写结束时间',
            },
          ],
        })(<DatePicker showTime={true} placeholder='请填写结束时间' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(RentalInfoModal)

