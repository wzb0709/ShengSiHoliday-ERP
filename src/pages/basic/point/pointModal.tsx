import React, { Component } from 'react'
import { Modal, Form, Input, Select, Col, Row } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import BDMap from '@/component/map'

interface IProps {
  readonly visible: boolean,
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  form: WrappedFormUtils
  readonly onOk: (values: any) => void
  readonly initialValue: any
}


const FormItem = Form.Item
const Option = Select.Option

class PointModal extends Component<IProps, {}> {

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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }

    return (
      <>
        <Modal
          visible={this.props.visible}
          onCancel={this.props.onCancel}
          title='添加/编辑上车点'
          width={800}
          destroyOnClose={true}
          onOk={this.handleConfirm}
        >
          <FormItem label='点位类型' {...formItemLayout}>
            {getFieldDecorator('point_type', {
              initialValue: this.props.initialValue.point_type,
              rules: [
                {
                  required: true,
                  message: '请选择点位类型',
                },
              ],
            })(<Select placeholder='请选择点位类型' style={{ width: '70%' }}>
              <Option value={1} >上车点</Option>
              <Option value={2} >租赁点</Option>
            </Select>)}
          </FormItem>
          <FormItem label='点位标题' {...formItemLayout}>
            {getFieldDecorator('point_title', {
              initialValue: this.props.initialValue.point_title,
              rules: [
                {
                  required: true,
                  message: '请输入点位标题',
                },
              ],
            })(<Input placeholder='请输入点位标题' style={{ width: '70%' }}/>)}
          </FormItem>
          <FormItem label='点位地址' {...formItemLayout}>
            {getFieldDecorator('point_address', {
              initialValue: this.props.initialValue.point_address,
              rules: [
                {
                  required: true,
                  message: '请输入点位地址',
                },
              ],
            })(<Input.TextArea onBlur={this.handleBlur} rows={3} placeholder='请输入点位地址' style={{ width: '70%' }}/>)}
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

export default Form.create<IProps>()(PointModal)
