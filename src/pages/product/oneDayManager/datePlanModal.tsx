import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Col, Form, InputNumber, Modal, Row } from 'antd'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const DatePlanModal:FC<IProps> = (props) => {

  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }
  const formItemLayout1 = {
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
      title='编辑套餐'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <Row>
        <Col span={12}>
          <FormItem label='默认套餐价格(成人)' {...formItemLayout1}>
            {getFieldDecorator('package_adult_price', {
              initialValue:props.initialValue.package_adult_price,
              rules: [
                {
                  required: true,
                  message: '请输入默认套餐价格(成人)',
                },
              ],
            })(<InputNumber placeholder='请输入默认套餐价格(成人)' style={{width:"90%"}} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label='默认分销佣金(成人)' {...formItemLayout}>
            {getFieldDecorator('package_adult_commission', {
              initialValue:props.initialValue.package_adult_commission,
              rules: [
                {
                  required: true,
                  message: '请输入默认分销佣金(成人)',
                },
              ],
            })(<InputNumber placeholder='请输入默认分销佣金(成人)' style={{width:"80%"}} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label='默认套餐价格(儿童)' {...formItemLayout1}>
            {getFieldDecorator('package_child_price', {
              initialValue:props.initialValue.package_child_price,
              rules: [
                {
                  required: true,
                  message: '请输入默认套餐价格(儿童)',
                },
              ],
            })(<InputNumber placeholder='请输入默认套餐价格(儿童)' style={{width:"90%"}} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label='默认分销佣金(儿童)' {...formItemLayout}>
            {getFieldDecorator('package_child_commission', {
              initialValue:props.initialValue.package_child_commission,
              rules: [
                {
                  required: true,
                  message: '请输入默认分销佣金(儿童)',
                },
              ],
            })(<InputNumber placeholder='请输入默认分销佣金(儿童)' style={{width:"80%"}} />)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label='数量' {...formItemLayout}>
        {getFieldDecorator('package_count', {
          initialValue:props.initialValue.package_count,
          rules: [
            {
              required: true,
              message: '请输入数量',
            },
          ],
        })(<InputNumber placeholder='请输入数量' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(DatePlanModal)
