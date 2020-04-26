import React, { FC } from 'react'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  couponList:any
}


const FormItem = Form.Item
const Option = Select.Option
const MemberModal:FC<IProps> = (props) => {
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
      title='赠送优惠券'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='优惠券' {...formItemLayout}>
        {getFieldDecorator('couponid', {
          rules: [
            {
              required: true,
              message: '请选择要赠送的优惠券',
            },
          ],
        })(<Select placeholder='请选择赠送优惠券' style={{width:"70%"}} >
          {props.couponList.map((item:any)=>{
            return(
              <Option key={item.id}>{item.coupon_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(MemberModal)
