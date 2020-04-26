import React, { FC } from 'react'
import { Modal, Form, DatePicker, InputNumber, Input, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly proList:any
}

const FormItem = Form.Item
const Option = Select.Option

const ReceptionModal:FC<IProps> = (props) => {
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
      title='新增一团一议'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='产品名称' {...formItemLayout}>
        {getFieldDecorator('productid', {
          rules: [
            {
              required: true,
              message: '请选择产品名称',
            },
          ],
        })(<Select
          placeholder='请选择产品名称'
          style={{width:"70%"}}
          filterOption={(input, option) =>
            // @ts-ignore
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          showSearch={true}
          // @ts-ignore
        >
          {props.proList.map((item:any) => {
            return(
              <Option key={item.id}>{item.product_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label='成人数' {...formItemLayout}>
        {getFieldDecorator('adult', {
          rules: [
            {
              required: true,
              message: '请填写成人数',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写成人数' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='儿童数' {...formItemLayout}>
        {getFieldDecorator('child', {
          rules: [
            {
              required: true,
              message: '请填写儿童数',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写儿童数' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='联系人姓名' {...formItemLayout}>
        {getFieldDecorator('contact_name', {
          rules: [
            {
              required: true,
              message: '请填写联系人姓名',
            },
          ],
        })(<Input placeholder='请填写联系人姓名' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='联系电话' {...formItemLayout}>
        {getFieldDecorator('contact_phone', {
          rules: [
            {
              required: true,
              message: '请填写联系电话',
            },
          ],
        })(<Input placeholder='请填写联系电话' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='出行日期' {...formItemLayout}>
        {getFieldDecorator('travel_date', {
          rules: [
            {
              required: true,
              message: '请选择出行日期',
            },
          ],
        })(<DatePicker placeholder='请选择出行日期' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ReceptionModal)

