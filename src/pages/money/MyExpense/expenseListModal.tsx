import React, { FC } from 'react'
import { Modal, Form, Input, InputNumber, DatePicker, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item

const ExpenseListModal:FC<IProps> = (props) => {
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

  const disabledDate = (current:any) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='添加/编辑报销详细'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='报销内容' {...formItemLayout}>
        {getFieldDecorator('detail_content', {
          initialValue:props.initialValue.detail_content,
          rules: [
            {
              required: true,
              message: '请输入报销内容',
            },
          ],
        })(<Input placeholder='请输入报销内容' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='报销金额' {...formItemLayout}>
        {getFieldDecorator('expense_money', {
          initialValue:props.initialValue.expense_money,
          rules: [
            {
              required: true,
              message: '请输入报销金额',
            },
          ],
        })(<InputNumber min={0} placeholder='请输入报销金额' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='发生时间' {...formItemLayout}>
        {getFieldDecorator('happen_date', {
          initialValue:props.initialValue.happen_date ? moment(props.initialValue.happen_date) : undefined,
          rules: [
            {
              required: true,
              message: '请输入发生时间',
            },
          ],
        })(<DatePicker disabledDate={disabledDate} placeholder='请输入发生时间' style={{width:"90%"}} />)}
      </FormItem>
      {/*<FormItem label='是否有发票' {...formItemLayout}>*/}
      {/*  {getFieldDecorator('travel_recommend', {*/}
      {/*    initialValue:props.initialValue.travel_recommend,*/}
      {/*    rules: [*/}
      {/*      {*/}
      {/*        required: true,*/}
      {/*        message: '请选择是否有发票',*/}
      {/*      },*/}
      {/*    ],*/}
      {/*  })(<Radio.Group style={{width:"90%"}} >*/}
      {/*    <Radio value={1}>是</Radio>*/}
      {/*    <Radio value={2}>否</Radio>*/}
      {/*  </Radio.Group>)}*/}
      {/*</FormItem>*/}
    </Modal>
  )
}

export default Form.create<IProps>()(ExpenseListModal)
