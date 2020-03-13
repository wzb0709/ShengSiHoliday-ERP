import React, { FC } from 'react'
import { Modal, Form, Select, InputNumber, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly memberList:any
}

const FormItem = Form.Item
const Option = Select.Option

const SettleSalesmanModal:FC<IProps> = (props) => {
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
      title='新增/编辑业务员提成'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='业务员' {...formItemLayout}>
        {getFieldDecorator('salesman_id', {
          initialValue:props.initialValue.salesman_id,
          rules: [
            {
              required: true,
              message: '请选择要更换的业务员',
            },
          ],
        })(<Select placeholder='请选择要更换的业务员' style={{width:"70%"}} >
          {props.memberList.map((item:any) => {
            return(
              <Option key={item.id}>{item.name}</Option>
            )
          })}
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

export default Form.create<IProps>()(SettleSalesmanModal)

