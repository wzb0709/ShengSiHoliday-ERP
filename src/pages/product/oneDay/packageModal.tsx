import React, { FC } from 'react'
import { Form, Input, InputNumber, Modal, Select, TimePicker, Row,Col } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}

const FormItem = Form.Item

const PackageModal:FC<IProps> = (props) => {

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
      title='添加/编辑产品套餐'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='套餐名称' {...formItemLayout}>
        {getFieldDecorator('package_title', {
          initialValue:props.initialValue.package_title,
          rules: [
            {
              required: true,
              message: '请输入套餐名称',
            },
          ],
        })(<Input placeholder='请输入套餐名称' style={{width:"90%"}} />)}
      </FormItem>
      <Row>
        <Col span={12}>
          <FormItem label='出游时间' {...formItemLayout1}>
            {getFieldDecorator('start_time', {
              initialValue:props.initialValue.start_time,
              rules: [
                {
                  required: true,
                  message: '请选择出游时间',
                },
              ],
            })(<TimePicker format='HH:mm' placeholder='请选择出游时间' style={{width:"90%"}} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label='默认数量' {...formItemLayout}>
            {getFieldDecorator('package_count', {
              initialValue:props.initialValue.package_count,
              rules: [
                {
                  required: true,
                  message: '请输入默认数量',
                },
              ],
            })(<InputNumber placeholder='请输入默认数量' style={{width:"80%"}} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label='下单截止(小时)' {...formItemLayout1}>
            {getFieldDecorator('advance_booking', {
              initialValue:props.initialValue.advance_booking,
              rules: [
                {
                  required: true,
                  message: '请输入下单截止',
                },
              ],
            })(<InputNumber placeholder='请输入下单截止' style={{width:"90%"}} />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label='订单暂留时间(小时)' {...formItemLayout}>
            {getFieldDecorator('persistence_time', {
              initialValue:props.initialValue.persistence_time,
              rules: [
                {
                  required: true,
                  message: '请输入订单暂留时间',
                },
              ],
            })(<InputNumber placeholder='请输入订单暂留时间' style={{width:"80%"}} />)}
          </FormItem>
        </Col>
      </Row>
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
      <FormItem label='套餐描述' {...formItemLayout}>
        {getFieldDecorator('package_summary', {
          initialValue:props.initialValue.package_summary,
          rules: [
            {
              required: false,
              message: '请输入套餐描述',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入套餐描述' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(PackageModal)
