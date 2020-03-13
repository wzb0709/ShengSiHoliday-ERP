import React, { FC } from 'react'
import { Card, Form, Row, Col, Table, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import BackTable from '@/pages/system/config/back/backTable'

interface IProps {
  form:WrappedFormUtils
  readonly initialValue:any
  readonly onOk:(values:any) => void
}

const FormItem = Form.Item

const ConfigBack:FC<IProps> = (props) => {

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
    <>
      <Card
        title='订单退款配置'
        extra={<a onClick={handleConfirm}>保存</a>}
        style={{marginTop:20}}
      >
        <Row>
          <Col span={12}>
            <FormItem label='是否允许取消订单' {...formItemLayout}>
              {getFieldDecorator('is_can_cancelorder', {
                initialValue:props.initialValue.is_can_cancelorder,
                rules: [
                  {
                    required: true,
                    message: '请选择是否允许取消订单',
                  },
                ],
              })(<Radio.Group style={{width:"70%"}} >
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='是否启动退款规则' {...formItemLayout}>
              {getFieldDecorator('is_use_order_back', {
                initialValue:props.initialValue.is_use_order_back,
                rules: [
                  {
                    required: true,
                    message: '请选择是否启动退款规则'
                  },
                ],
              })(<Radio.Group style={{width:"70%"}} >
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>)}
            </FormItem>
          </Col>
        </Row>
        <BackTable />
      </Card>
    </>
  )
}

export default Form.create<IProps>()(ConfigBack)
