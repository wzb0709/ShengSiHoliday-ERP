import React, { FC } from 'react'
import { Modal, Form, Select, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly packageList:any
}

const FormItem = Form.Item
const Option = Select.Option

const OrderPackageModal:FC<IProps> = (props) => {
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
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='添加/编辑套餐'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      {!props.initialValue.adult_count && <FormItem label='套餐名' {...formItemLayout}>
        {getFieldDecorator('product_date_package_id', {
          initialValue:props.initialValue.product_date_package_id,
          rules: [
            {
              required: true,
              message: '请选择套餐',
            },
          ],
        })(<Select placeholder='请选择套餐' style={{width:"70%"}} >
          {props.packageList.map((item:any) => {
            return(
              <Option key={item.package_id}>{`${item.package_title} 成人${item.package_adult_price}元 儿童${item.package_child_price}元`}</Option>
            )
          })}
        </Select>)}
      </FormItem>}
      <FormItem label='成人数' {...formItemLayout}>
        {getFieldDecorator('adult_count', {
          initialValue:props.initialValue.adult_count,
          rules: [
            {
              required: true,
              message: '请填写成人数',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写成人数' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='儿童数' {...formItemLayout}>
        {getFieldDecorator('child_count', {
          initialValue:props.initialValue.child_count,
          rules: [
            {
              required: true,
              message: '请填写儿童数',
            },
          ],
        })(<InputNumber min={0} placeholder='请填写儿童数' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(OrderPackageModal)

