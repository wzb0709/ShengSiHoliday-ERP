import React, { FC } from 'react'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { IAuthItem } from '@/pages/system/auth/authTable'

const FormItem = Form.Item
const Option = Select.Option

interface IProps {
  form:WrappedFormUtils
  readonly visible:boolean
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  readonly onOk: (values:IFormItem) => void
  readonly initialValue:any
  readonly authList:Array<IAuthItem>
}

export interface IFormItem {
  authList:Array<string>
}

const RoleModal:FC<IProps> = (props) => {

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
      title='添加/编辑权限'
      visible={props.visible}
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
      onCancel={props.onCancel}
    >
      <FormItem label="权限列表" {...formItemLayout}>
        {getFieldDecorator('authList', {
          initialValue: props.initialValue.authList,
          rules: [
            {
              required: false,
              message: '请选择权限',
            },
          ],
        })(<Select
          placeholder='请选择权限'
          style={{width:"70%"}}
          mode="multiple"
          labelInValue={true}
          showSearch={true}
          filterOption={(input, option:any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.authList.map(item=>{
            return(
              <Option key={item.id}>{item.title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(RoleModal)
