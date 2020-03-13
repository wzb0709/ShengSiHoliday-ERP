import React, { Component } from 'react'
import { Modal, Form, Input, Select, InputNumber, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'
import BlockUpload from '@/component/upload/blockUpload'
import BDMap from '@/component/map'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const Option = Select.Option

class FoodModal extends Component<IProps, {}>  {

  child:any = undefined

  onRef = (ref:any) => {
    this.child = ref
  }

  handleBlur = (e:any) => {
    this.child.handleMarker(e.target.value)
  }

  handleChange = (lgt:number,lat:number) => {
    this.props.form.setFieldsValue({lgt,lat})
  }


  handleConfirm = () => {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        this.props.onOk(values)
      }
    })
  }

  render() {

    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    }
    const formItemLayout1 = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    }

    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        title='添加/编辑美食信息'
        width={1200}
        destroyOnClose={true}
        onOk={this.handleConfirm}
      >
        <Row>
          <Col span={12}>
            <FormItem label='美食名称' {...formItemLayout}>
              {getFieldDecorator('food_title', {
                initialValue:this.props.initialValue.food_title,
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
                initialValue:this.props.initialValue.food_time,
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
                initialValue:this.props.initialValue.consumption,
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
                initialValue:this.props.initialValue.food_pics,
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
            initialValue:this.props.initialValue.food_address,
            rules: [
              {
                required: true,
                message: '请输入营业地址',
              },
            ],
          })(<Input.TextArea onBlur={this.handleBlur} rows={3} placeholder='请输入营业地址' style={{width:"90%"}} />)}
        </FormItem>
        <FormItem label='联系电话' {...formItemLayout1}>
          {getFieldDecorator('food_phones', {
            initialValue:this.props.initialValue.food_phones,
            rules: [
              {
                required: true,
                message: '请输入联系电话',
              },
            ],
          })(<Select placeholder='请输入联系电话' mode='tags' style={{ width: '90%' }}/>)}
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem label='经度' {...formItemLayout}>
              {getFieldDecorator('lgt', {
                initialValue: this.props.initialValue.lgt,
                rules: [
                  {
                    required: true,
                    message: '请输入经度',
                  },
                ],
              })(<Input disabled={true} placeholder='请输入经度' style={{ width: '70%' }}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='纬度' {...formItemLayout}>
              {getFieldDecorator('lat', {
                initialValue: this.props.initialValue.lat,
                rules: [
                  {
                    required: true,
                    message: '请输入纬度',
                  },
                ],
              })(<Input disabled={true} placeholder='请输入纬度' style={{ width: '70%' }}/>)}
            </FormItem>
          </Col>
        </Row>
        <BDMap
          onRef={this.onRef}
          lat={this.props.initialValue.lat}
          lgt={this.props.initialValue.lgt}
          onChange={this.handleChange}
        />
      </Modal>
    )
  }
}

export default Form.create<IProps>()(FoodModal)



