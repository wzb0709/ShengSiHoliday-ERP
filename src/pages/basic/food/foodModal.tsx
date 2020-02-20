import React, { FC } from 'react'
import { Modal, Form, Input, Select, InputNumber, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'
import BlockUpload from '@/component/upload/blockUpload'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const Option = Select.Option

const FoodModal:FC<IProps> = (props) => {
  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }
  const formItemLayout1 = {
    labelCol: {span: 3},
    wrapperCol: {span: 21},
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
      title='添加/编辑美食信息'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <Row>
        <Col span={12}>
          <FormItem label='美食名称' {...formItemLayout}>
            {getFieldDecorator('food_title', {
              initialValue:props.initialValue.food_title,
              rules: [
                {
                  required: true,
                  message: '请输入美食名称',
                },
              ],
            })(<Input placeholder='请输入美食名称' style={{width:"90%"}} />)}
          </FormItem>
          <FormItem label='营业时间' {...formItemLayout}>
            {getFieldDecorator('food_time', {
              initialValue:props.initialValue.food_time,
              rules: [
                {
                  required: true,
                  message: '请输入营业时间',
                },
              ],
            })(<Input placeholder='请输入营业时间' style={{width:"90%"}} />)}
          </FormItem>
          <FormItem label='平均消费(元/人)' {...formItemLayout}>
            {getFieldDecorator('consumption', {
              initialValue:props.initialValue.consumption,
              rules: [
                {
                  required: true,
                  message: '请输入评价消费',
                },
              ],
            })(<InputNumber placeholder='请输入评价消费' style={{width:"90%"}} />)}
          </FormItem>
        </Col>
        <Col span={12} >
          <FormItem>
            {getFieldDecorator('food_pics', {
              initialValue:props.initialValue.food_pics,
              rules: [
                {
                  required: true,
                },
              ],
            })(<BlockUpload />)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label='营业地址' {...formItemLayout1}>
        {getFieldDecorator('food_address', {
          initialValue:props.initialValue.food_address,
          rules: [
            {
              required: true,
              message: '请输入营业地址',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入营业地址' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='联系电话' {...formItemLayout1}>
        {getFieldDecorator('food_phones', {
          initialValue:props.initialValue.food_phones,
          rules: [
            {
              required: true,
              message: '请输入联系电话',
            },
          ],
        })(<Input placeholder='请输入联系电话' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(FoodModal)
