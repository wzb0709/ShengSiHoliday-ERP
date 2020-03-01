import React, { FC } from 'react'
import { Modal, Form, Select, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { IUserInfo } from '@/services/user'
import { IAuthItem } from '@/pages/system/auth/authTable'
import FormUpload from '@/component/upload/formUpload'

const FormItem = Form.Item
const Option = Select.Option

interface IProps {
  form: WrappedFormUtils
  readonly visible: boolean
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  readonly onOk: (values: IUserInfo) => void
  readonly initialValue: any
  readonly characterList:Array<IAuthItem>
  readonly deptList:any
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
      <FormItem label="所属部门" {...formItemLayout}>
        {getFieldDecorator('department_id', {
          initialValue: props.initialValue.department_id ? props.initialValue.department_id.toString() : undefined,
          rules: [
            {
              required: true,
              message: '请输入所属部门',
            },
          ],
        })(<Select placeholder='请输入所属部门' style={{ width: '70%' }}>
          {props.deptList.map((item:any) => {
            return <Option key={item.id}>{item.department_name}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem label="所属职位" {...formItemLayout}>
        {getFieldDecorator('position', {
          initialValue: props.initialValue.position,
          rules: [
            {
              required: true,
              message: '请输入职位',
            },
          ],
        })(<Input placeholder='请输入职位' style={{ width: '70%' }}/>)}
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

export default Form.create<IProps>()(UserModal)
