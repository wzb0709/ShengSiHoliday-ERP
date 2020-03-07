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

const TouristModal:FC<IProps> = (props) => {
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
      title='新增/编辑人员'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='人员类型' {...formItemLayout}>
        {getFieldDecorator('tourist_type', {
          initialValue:props.initialValue.tourist_type,
          rules: [
            {
              required: true,
              message: '请选择人员类型',
            },
          ],
        })(<Select placeholder='请选择人员类型' style={{width:"70%"}} >
          <Option value={1}>成人</Option>
          <Option value={2}>儿童</Option>
        </Select>)}
      </FormItem>
      <FormItem label='性别' {...formItemLayout}>
        {getFieldDecorator('tourist_sex', {
          initialValue:props.initialValue.tourist_sex,
          rules: [
            {
              required: true,
              message: '请选择性别',
            },
          ],
        })(<Select placeholder='请选择性别' style={{width:"70%"}} >
          <Option value={1}>男</Option>
          <Option value={2}>女</Option>
        </Select>)}
      </FormItem>
      <FormItem label='姓名' {...formItemLayout}>
        {getFieldDecorator('tourist_name', {
          initialValue:props.initialValue.tourist_name,
          rules: [
            {
              required: true,
              message: '请填写姓名',
            },
          ],
        })(<Input placeholder='请填写姓名' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='生日' {...formItemLayout}>
        {getFieldDecorator('tourist_birthday', {
          initialValue:props.initialValue.tourist_birthday ? moment(props.initialValue.tourist_birthday) : undefined,
          rules: [
            {
              required: true,
              message: '请选择生日',
            },
          ],
        })(<DatePicker placeholder='请选择生日' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='证件类型' {...formItemLayout}>
        {getFieldDecorator('certification_type', {
          initialValue:props.initialValue.certification_type,
          rules: [
            {
              required: true,
              message: '请选择证件类型',
            },
          ],
        })(<Select placeholder='请选择证件类型' style={{width:"70%"}} >
          <Option value={1}>身份证</Option>
          <Option value={2}>护照</Option>
          <Option value={3}>其他</Option>
        </Select>)}
      </FormItem>
      <FormItem label='证件号' {...formItemLayout}>
        {getFieldDecorator('certification_no', {
          initialValue:props.initialValue.certification_no,
          rules: [
            {
              required: true,
              message: '请填写证件号',
            },
          ],
        })(<Input placeholder='请填写证件号' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(TouristModal)

