import React, { Component, FC } from 'react'
import { Modal, Form, Input, Select, InputNumber, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
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

class AttractionModal extends Component<IProps,{}> {

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
      <>
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
              <FormItem label='景点名称' {...formItemLayout}>
                {getFieldDecorator('scenic_title', {
                  initialValue:this.props.initialValue.scenic_title,
                  rules: [
                    {
                      required: true,
                      message: '请输入景点名称',
                    },
                  ],
                })(<Input placeholder='请输入景点名称' style={{width:"90%"}} />)}
              </FormItem>
              <FormItem label='营业时间' {...formItemLayout}>
                {getFieldDecorator('scenic_time', {
                  initialValue:this.props.initialValue.scenic_time,
                  rules: [
                    {
                      required: true,
                      message: '请输入营业时间',
                    },
                  ],
                })(<Input placeholder='请输入营业时间' style={{width:"90%"}} />)}
              </FormItem>
              <FormItem label='联系电话' {...formItemLayout}>
                {getFieldDecorator('scenic_phone', {
                  initialValue:this.props.initialValue.scenic_phone,
                  rules: [
                    {
                      required: true,
                      message: '请输入联系电话',
                    },
                  ],
                })(<Select placeholder='请输入联系电话' mode='tags' style={{ width: '90%' }}/>)}
              </FormItem>
            </Col>
            <Col span={12} >
              <FormItem>
                {getFieldDecorator('scenic_pics', {
                  initialValue:this.props.initialValue.scenic_pics,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<BlockUpload />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label='景点地址' {...formItemLayout1}>
            {getFieldDecorator('scenic_address', {
              initialValue:this.props.initialValue.scenic_address,
              rules: [
                {
                  required: true,
                  message: '请输入景点地址',
                },
              ],
            })(<Input.TextArea onBlur={this.handleBlur} rows={3} placeholder='请输入景点地址' style={{width:"90%"}} />)}
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
      </>
    )
  }
}

export default Form.create<IProps>()(AttractionModal)
