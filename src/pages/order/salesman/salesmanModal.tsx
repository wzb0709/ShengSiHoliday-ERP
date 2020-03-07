import React, { FC } from 'react'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly memberList:any
}

const FormItem = Form.Item
const Option = Select.Option

const SalesmanModal:FC<IProps> = (props) => {
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
      title='更换业务员'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='业务员' {...formItemLayout}>
        {getFieldDecorator('salesman_id', {
          initialValue:props.initialValue.salesman_id,
          rules: [
            {
              required: true,
              message: '请选择要更换的业务员',
            },
          ],
        })(<Select placeholder='请选择要更换的业务员' style={{width:"70%"}} >
          {props.memberList.map((item:any) => {
            return(
              <Option key={item.id}>{item.name}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(SalesmanModal)

