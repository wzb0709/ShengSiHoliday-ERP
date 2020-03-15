import React, { Component } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Row, Statistic, Table, Form, Divider, Col, InputNumber, Modal, Radio, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps {
  packageList: any,
  form: WrappedFormUtils,
  visible:boolean,
  onCancel:any
  onOk:any
}

interface IState {
  keys: string[]
}

const FormItem = Form.Item

class AddPlanPackageModal extends Component<IProps, IState> {

  state = {
    keys: [],
  }

  columns: ColumnProps<Object>[] = [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'start_time', title: '出发时间' },
    {
      dataIndex: '', title: '默认套餐价格', render: recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{ fontSize: 14 }} value={recode.package_adult_price} precision={2} prefix='￥'/></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{ fontSize: 14 }} value={recode.package_child_price} precision={2} prefix='￥'/></Row>
      </>,
    },
    {
      dataIndex: '', title: '默认分销佣金', render: recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{ fontSize: 14 }} value={recode.package_adult_commission} precision={2} prefix='￥'/></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{ fontSize: 14 }} value={recode.package_child_commission} precision={2} prefix='￥'/></Row>
      </>,
    },
    { dataIndex: 'package_count', title: '默认数量' },
    { dataIndex: 'advance_booking', title: '下单截止', render: recode => `${recode}小时` },
    { dataIndex: 'persistence_time', title: '暂留时间', render: recode => `${recode}小时` },
  ]

  rowSelection = {
    onChange: (selectedRowKeys: any) => {
      this.setState({ keys: selectedRowKeys })
    },
  }

  handleConfirm = () => {
    if(this.state.keys.length === 0){
      message.warning('请选择套餐！')
      return false
    }
    this.props.form.validateFields((err,values)=>{
      if(!err){
        values = {
          keys:this.state.keys,
          ...values
        }
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
      <Modal
        title='添加计划内套餐'
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.handleConfirm}
        width={1200}
      >
        <Table
          bordered={true}
          dataSource={this.props.packageList}
          columns={this.columns}
          rowKey='id'
          rowSelection={this.rowSelection}
        />
        <Divider type='horizontal' />
        <Form>
          <Row>
            <Col span={12}>
              <FormItem label='数量' {...formItemLayout}>
                {getFieldDecorator('package_count', {
                  rules: [
                    {
                      required: true,
                      message: '请输入数量',
                    },
                  ],
                })(<InputNumber placeholder='请输入数量' style={{width:"90%"}} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='上架状态' {...formItemLayout}>
                {getFieldDecorator('is_show', {
                  rules: [
                    {
                      required: true,
                      message: '请选择上架状态',
                    },
                  ],
                })(<Radio.Group>
                  <Radio value={1}>上架</Radio>
                  <Radio value={0}>不上架</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='套餐价格(成人)' {...formItemLayout}>
                {getFieldDecorator('package_adult_price', {
                  rules: [
                    {
                      required: true,
                      message: '请输入套餐价格(成人)',
                    },
                  ],
                })(<InputNumber placeholder='请输入套餐价格(成人)' style={{width:"90%"}} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='分销佣金(成人)' {...formItemLayout}>
                {getFieldDecorator('package_adult_commission', {
                  rules: [
                    {
                      required: true,
                      message: '请输入分销佣金(成人)',
                    },
                  ],
                })(<InputNumber placeholder='请输入分销佣金(成人)' style={{width:"90%"}} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label='套餐价格(儿童)' {...formItemLayout}>
                {getFieldDecorator('package_child_price', {
                  rules: [
                    {
                      required: true,
                      message: '请输入套餐价格(儿童)',
                    },
                  ],
                })(<InputNumber placeholder='请输入套餐价格(儿童)' style={{width:"90%"}} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='分销佣金(儿童)' {...formItemLayout}>
                {getFieldDecorator('package_child_commission', {
                  rules: [
                    {
                      required: true,
                      message: '请输入分销佣金(儿童)',
                    },
                  ],
                })(<InputNumber placeholder='请输入分销佣金(儿童)' style={{width:"90%"}} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddPlanPackageModal)
