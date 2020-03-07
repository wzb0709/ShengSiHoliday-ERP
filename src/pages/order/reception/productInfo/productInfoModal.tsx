import React, { FC } from 'react'
import { Modal, Form, DatePicker } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const ProductInfoModal:FC<IProps> = (props) => {
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
      title='更换出行日期'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='出行日期' {...formItemLayout}>
        {getFieldDecorator('travel_date', {
          initialValue:props.initialValue.travel_date ? moment(props.initialValue.travel_date) : undefined,
          rules: [
            {
              required: true,
              message: '请选择要更换出行日期',
            },
          ],
        })(<DatePicker placeholder='请选择要更换出行日期' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ProductInfoModal)

