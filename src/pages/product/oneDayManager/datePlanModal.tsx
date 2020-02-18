import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Form, InputNumber, Modal } from 'antd'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const DatePlanModal:FC<IProps> = (props) => {

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
      title='编辑套餐'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='套餐价格' {...formItemLayout}>
        {getFieldDecorator('package_price', {
          initialValue:props.initialValue.package_price,
          rules: [
            {
              required: true,
              message: '请输入套餐价格',
            },
          ],
        })(<InputNumber placeholder='请输入套餐价格' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='分销佣金' {...formItemLayout}>
        {getFieldDecorator('package_commission', {
          initialValue:props.initialValue.package_commission,
          rules: [
            {
              required: true,
              message: '请输入分销佣金',
            },
          ],
        })(<InputNumber placeholder='请输入分销佣金' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='数量' {...formItemLayout}>
        {getFieldDecorator('package_count', {
          initialValue:props.initialValue.package_count,
          rules: [
            {
              required: true,
              message: '请输入数量',
            },
          ],
        })(<InputNumber placeholder='请输入数量' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(DatePlanModal)
