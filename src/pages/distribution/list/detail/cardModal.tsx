import React, { FC } from 'react'
import { Modal, Form, Input} from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const CardModal:FC<IProps> = (props) => {
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
      title='添加/编辑银行卡'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='银行卡号' {...formItemLayout}>
        {getFieldDecorator('card_number', {
          initialValue:props.initialValue.card_number,
          rules: [
            {
              required: true,
              message: '请输入银行卡号',
            },
          ],
        })(<Input placeholder='请输入银行卡号' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='账户名' {...formItemLayout}>
        {getFieldDecorator('card_account', {
          initialValue:props.initialValue.card_account,
          rules: [
            {
              required: true,
              message: '请输入账户名',
            },
          ],
        })(<Input placeholder='请输入账户名' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='开户行' {...formItemLayout}>
        {getFieldDecorator('card_bank', {
          initialValue:props.initialValue.card_bank,
          rules: [
            {
              required: true,
              message: '请输入开户行',
            },
          ],
        })(<Input placeholder='请输入开户行' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(CardModal)
