import React, { FC } from 'react'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly pointList:any
}

const FormItem = Form.Item
const Option = Select.Option

const PointInfoModal:FC<IProps> = (props) => {
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
      title='更换取/还车点'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='取车点' {...formItemLayout}>
        {getFieldDecorator('get_car_point_id', {
          initialValue:props.initialValue.get_car_point_id,
          rules: [
            {
              required: true,
              message: '请选择取车点',
            },
          ],
        })(<Select placeholder='请选择取车点' style={{width:"70%"}} >
          {props.pointList.map((item:any) => {
            return(
              <Option key={item.id}>{item.point_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label='还车点' {...formItemLayout}>
        {getFieldDecorator('back_car_point_id', {
          initialValue:props.initialValue.back_car_point_id,
          rules: [
            {
              required: true,
              message: '请选择还车点',
            },
          ],
        })(<Select placeholder='请选择还车点' style={{width:"70%"}} >
          {props.pointList.map((item:any) => {
            return(
              <Option key={item.id}>{item.point_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(PointInfoModal)

