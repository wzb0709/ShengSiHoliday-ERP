import React, { FC } from 'react'
import { Modal, Form, Input,DatePicker } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item

const InfoModal:FC<IProps> = (props) => {
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
      title='更改基本信息'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label="用户账号" {...formItemLayout}>
        {getFieldDecorator('account', {
          initialValue: props.initialValue.account,
          rules: [
            {
              required: true,
              message: '请输入用户账号',
            },
          ],
        })(<Input placeholder='请输入用户账号' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label="姓名" {...formItemLayout}>
        {getFieldDecorator('user_name', {
          initialValue: props.initialValue.user_name,
          rules: [
            {
              required: true,
              message: '请输入姓名',
            },
          ],
        })(<Input placeholder='请输入姓名' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label="用户电话" {...formItemLayout}>
        {getFieldDecorator('phone', {
          initialValue: props.initialValue.phone,
          rules: [
            {
              required: true,
              message: '请输入用户电话',
              pattern:/^1[3456789]\d{9}$/
            },
          ],
        })(<Input placeholder='请输入用户电话' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label="生日" {...formItemLayout}>
        {getFieldDecorator('birth_day', {
          initialValue: props.initialValue.birth_day ? moment(props.initialValue.birth_day) : undefined,
          rules: [
            {
              required: true,
              message: '请选择生日',
            },
          ],
        })(<DatePicker placeholder='请选择生日' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label='头像' {...formItemLayout}>
        {getFieldDecorator('head_img', {
          initialValue:props.initialValue.head_img,
          normalize: value => {
            if (typeof value === 'string') {
              return value
            } else if (Array.isArray(value)) {
              return value.length > 0 ? value.slice(-1)[0] : ''
            }
          },
          rules: [
            {
              required: true,
              message: '请上传头像',
            },
          ],
        })(<FormUpload
          accept="image/jpeg,image/jpg,image/png"
          action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
          listType={'picture'}
        />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(InfoModal)
