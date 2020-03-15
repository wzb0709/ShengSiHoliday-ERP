import React, { FC } from 'react'
import { Modal, Form, Input, Select} from 'antd'
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
const DistributionModal:FC<IProps> = (props) => {
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
      title='添加/编辑分销商'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='分销商姓名' {...formItemLayout}>
        {getFieldDecorator('distribution_name', {
          initialValue:props.initialValue.distribution_name,
          rules: [
            {
              required: true,
              message: '请输入分销商姓名',
            },
          ],
        })(<Input placeholder='请输入分销商姓名' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='联系人' {...formItemLayout}>
        {getFieldDecorator('contact_name', {
          initialValue:props.initialValue.contact_name,
          rules: [
            {
              required: true,
              message: '请输入联系人',
            },
          ],
        })(<Input placeholder='请输入联系人' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='联系方式' {...formItemLayout}>
        {getFieldDecorator('contact_phone', {
          initialValue:props.initialValue.contact_phone,
          rules: [
            {
              required: true,
              message: '请输入联系方式',
              pattern:/^1[3456789]\d{9}$/
            },
          ],
        })(<Input placeholder='请输入联系方式' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='账号' {...formItemLayout}>
        {getFieldDecorator('login_account', {
          initialValue:props.initialValue.login_account,
          rules: [
            {
              required: true,
              message: '请输入账号',
            },
          ],
        })(<Input placeholder='请输入账号' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(DistributionModal)
