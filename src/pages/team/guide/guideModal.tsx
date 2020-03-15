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
const GuideModal:FC<IProps> = (props) => {
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
      title='添加/编辑导游'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='导游姓名' {...formItemLayout}>
        {getFieldDecorator('tour_name', {
          initialValue:props.initialValue.tour_name,
          rules: [
            {
              required: true,
              message: '请输入导游姓名',
            },
          ],
        })(<Input placeholder='请输入导游姓名' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='导游类型' {...formItemLayout}>
        {getFieldDecorator('tour_type', {
          initialValue:props.initialValue.tour_type,
          rules: [
            {
              required: true,
              message: '请选择导游类型',
            },
          ],
        })(<Select placeholder='请选择导游类型' style={{width:"90%"}} >
          <Option value={1}>自有</Option>
          <Option value={2}>外借</Option>
        </Select>)}
      </FormItem>
      <FormItem label='联系方式' {...formItemLayout}>
        {getFieldDecorator('tour_phone', {
          initialValue:props.initialValue.tour_phone,
          rules: [
            {
              required: true,
              message: '请输入联系方式',
              pattern:/^1[3456789]\d{9}$/
            },
          ],
        })(<Input placeholder='请输入联系方式' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='导游星级' {...formItemLayout}>
        {getFieldDecorator('tour_start', {
          initialValue:props.initialValue.tour_start,
          rules: [
            {
              required: true,
              message: '请输入导游星级',
            },
          ],
        })(<Input placeholder='请输入导游星级' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(GuideModal)
