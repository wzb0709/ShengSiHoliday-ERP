import React, { FC } from 'react'
import { Modal, Form, Select, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { IUserInfo } from '@/services/user'
import { IAuthItem } from '@/pages/system/auth/authTable'

const FormItem = Form.Item
const Option = Select.Option

interface IProps {
  form: WrappedFormUtils
  readonly visible: boolean
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  readonly onOk: (values: IUserInfo) => void
  readonly initialValue: any
  readonly characterList:Array<IAuthItem>
}

const UserModal: FC<IProps> = (props) => {

  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const handleConfirm = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onOk(values)
      }
    })
  }

  return (
    <Modal
      title='添加/编辑用户'
      visible={props.visible}
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
      onCancel={props.onCancel}
    >
      <FormItem label="用户姓名" {...formItemLayout}>
        {getFieldDecorator('user_name', {
          initialValue: props.initialValue.user_name,
          rules: [
            {
              required: true,
              message: '请输入用户姓名',
            },
          ],
        })(<Input placeholder='请输入用户姓名' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label="所属公司" {...formItemLayout}>
        {getFieldDecorator('company', {
          initialValue: props.initialValue.company,
          rules: [
            {
              required: true,
              message: '请输入所属公司',
            },
          ],
        })(<Input placeholder='请输入所属公司' style={{ width: '70%' }}/>)}
      </FormItem>
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
      <FormItem label="用户密码" {...formItemLayout}>
        {getFieldDecorator('pwd', {
          initialValue: props.initialValue.pwd,
          rules: [
            {
              required: true,
              message: '请输入用户密码',
            },
          ],
        })(<Input placeholder='请输入用户密码' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label="用户电话" {...formItemLayout}>
        {getFieldDecorator('phone', {
          initialValue: props.initialValue.phone,
          rules: [
            {
              required: true,
              message: '请输入用户电话',
            },
          ],
        })(<Input placeholder='请输入用户电话' style={{ width: '70%' }}/>)}
      </FormItem>
      <FormItem label="所属角色" {...formItemLayout}>
        {getFieldDecorator('roleList', {
          initialValue: props.initialValue.roleList,
          rules: [
            {
              required: true,
              message: '请输入所属角色',
            },
          ],
        })(<Select
          placeholder='请输入所属角色'
          style={{ width: '70%' }}
          mode="multiple"
          labelInValue={true}
          showSearch={true}
          filterOption={(input, option:any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.characterList.map(item => {
            return (
              <Option key={item.id}>{item.title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(UserModal)
