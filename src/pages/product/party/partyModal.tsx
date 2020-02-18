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
const PartyModal:FC<IProps> = (props) => {
  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }
  const formItemLayout1 = {
    labelCol: {span: 3},
    wrapperCol: {span: 21},
  }
  const formItemLayout2 = {
    labelCol: {span: 12},
    wrapperCol: {span: 12},
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
      title='添加/编辑定制游'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <Row>
        <Col span={12}>
          <FormItem label='产品标题' {...formItemLayout}>
            {getFieldDecorator('travel_title', {
              initialValue:props.initialValue.travel_title,
              rules: [
                {
                  required: true,
                  message: '请输入产品标题',
                },
              ],
            })(<Input placeholder='请输入产品标题' style={{width:"90%"}} />)}
          </FormItem>
          <FormItem label='产品副标题' {...formItemLayout}>
            {getFieldDecorator('travel_subtitle', {
              initialValue:props.initialValue.travel_subtitle,
              rules: [
                {
                  required: true,
                  message: '请输入产品副标题',
                },
              ],
            })(<Input placeholder='请输入产品副标题' style={{width:"90%"}} />)}
          </FormItem>
          <FormItem label='产品标签' {...formItemLayout}>
            {getFieldDecorator('travel_tags', {
              initialValue:props.initialValue.travel_tags,
              rules: [
                {
                  required: true,
                  message: '请输入产品标签',
                },
              ],
            })(<Select placeholder='请输入产品标签' mode='tags' style={{width:"90%"}} />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem label='游玩人数' {...formItemLayout2}>
                {getFieldDecorator('travel_person', {
                  initialValue:props.initialValue.travel_person,
                  rules: [
                    {
                      required: true,
                      message: '请输入游玩人数',
                    },
                  ],
                })(<InputNumber placeholder='请输入游玩人数' style={{width:"100%"}} />)}
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label='预期价格' {...formItemLayout2}>
                {getFieldDecorator('travel_price', {
                  initialValue:props.initialValue.travel_price,
                  rules: [
                    {
                      required: true,
                      message: '请输入预期价格',
                    },
                  ],
                })(<InputNumber placeholder='请输入预期价格' style={{width:"100%"}} />)}
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span={12} >
          <FormItem>
            {getFieldDecorator('travel_pics', {
              initialValue:props.initialValue.travel_pics,
              rules: [
                {
                  required: true,
                },
              ],
            })(<BlockUpload />)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label='推荐理由' {...formItemLayout1}>
        {getFieldDecorator('travel_recommend', {
          initialValue:props.initialValue.travel_recommend,
          rules: [
            {
              required: true,
              message: '请输入推荐理由',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入推荐理由' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(PartyModal)
