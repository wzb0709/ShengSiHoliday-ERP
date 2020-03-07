import React, { FC } from 'react'
import { Modal, Form, Select, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly expressList:any
}

const FormItem = Form.Item
const Option = Select.Option

const ExpressModal:FC<IProps> = (props) => {
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
      title='编辑物流信息'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='快递公司' {...formItemLayout}>
        {getFieldDecorator('logistics_company_id', {
          initialValue:props.initialValue.logistics_company_id === '' ? undefined : props.initialValue.logistics_company_id,
          rules: [
            {
              required: true,
              message: '请选择快递公司',
            },
          ],
        })(<Select placeholder='请选择快递公司' style={{width:"70%"}} >
          {props.expressList.map((item:any) => {
            return(
              <Option key={item.id}>{item.title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label='快递单号' {...formItemLayout}>
        {getFieldDecorator('logistics_no', {
          initialValue:props.initialValue.logistics_no,
          rules: [
            {
              required: true,
              message: '请填写快递单号',
            },
          ],
        })(<Input placeholder='请填写快递单号' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ExpressModal)

