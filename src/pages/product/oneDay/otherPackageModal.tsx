import React, { FC } from 'react'
import { Form, Input, InputNumber, Modal, TimePicker } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const OtherPackageModal:FC<IProps> = (props) => {

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
      title='添加/编辑附加产品套餐'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='套餐名称' {...formItemLayout}>
        {getFieldDecorator('package_title', {
          initialValue:props.initialValue.package_title,
          rules: [
            {
              required: true,
              message: '请输入套餐名称',
            },
          ],
        })(<Input placeholder='请输入套餐名称' style={{width:"90%"}} />)}
      </FormItem>
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
    </Modal>
  )
}

export default Form.create<IProps>()(OtherPackageModal)
