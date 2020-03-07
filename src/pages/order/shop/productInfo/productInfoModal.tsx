import React, { FC } from 'react'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly shopList:any
}

const FormItem = Form.Item
const Option = Select.Option

const ProductInfoModal:FC<IProps> = (props) => {
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
      title='更换商品'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='商品' {...formItemLayout}>
        {getFieldDecorator('product_id', {
          initialValue:props.initialValue.product_id,
          rules: [
            {
              required: true,
              message: '请选择要更换的商品',
            },
          ],
        })(<Select placeholder='请选择要更换的商品' style={{width:"70%"}} >
          {props.shopList.map((item:any) => {
            return(
              <Option key={item.id}>{item.product_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ProductInfoModal)

