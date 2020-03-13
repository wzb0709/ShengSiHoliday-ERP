import React, { FC } from 'react'
import { Modal, Form, Input, DatePicker } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const SettleModal:FC<IProps> = (props) => {
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
      title='添加/编辑三清单'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='三清单标题' {...formItemLayout}>
        {getFieldDecorator('settle_title', {
          initialValue:props.initialValue.settle_title,
          rules: [
            {
              required: true,
              message: '请输入三清单标题',
            },
          ],
        })(<Input placeholder='请输入三清单标题' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='结算月份' {...formItemLayout}>
        {getFieldDecorator('settle_date', {
          initialValue:props.initialValue.settle_date,
          rules: [
            {
              required: true,
              message: '请输入结算月份',
            },
          ],
        })(<DatePicker.MonthPicker placeholder='请输入结算月份' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(SettleModal)
