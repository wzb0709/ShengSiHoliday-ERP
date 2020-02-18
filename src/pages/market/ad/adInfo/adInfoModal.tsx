import React, { FC } from 'react'
import { Modal, Form, Input, Select, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:IModalData) => void
  readonly initialValue:IModalData
}
export interface IModalData {
  advertising_title:string
  advertising_type:number
  detail_type:number
  sort:number
  advertising_url:string
  detail_id:string
}


const FormItem = Form.Item
const Option = Select.Option
const AdInfoModal:FC<IProps> = (props) => {
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
      title='添加/编辑广告'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='广告标题' {...formItemLayout}>
        {getFieldDecorator('advertising_title', {
          initialValue:props.initialValue.advertising_title,
          rules: [
            {
              required: true,
              message: '请输入广告标题',
            },
          ],
        })(<Input placeholder='请输入产品标题' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='广告链接' {...formItemLayout}>
        {getFieldDecorator('advertising_type', {
          initialValue:props.initialValue.advertising_type,
          rules: [
            {
              required: true,
              message: '请选择广告链接',
            },
          ],
        })(<Select placeholder='请选择广告链接' style={{width:"70%"}} >
          <Option value={1}>内部链接</Option>
          <Option value={2}>外部链接</Option>
        </Select>)}
      </FormItem>
      <FormItem label='广告类型' {...formItemLayout}>
        {getFieldDecorator('detail_type', {
          initialValue:props.initialValue.detail_type,
          rules: [
            {
              required: true,
              message: '请选择广告类型',
            },
          ],
        })(<Select placeholder='请选择广告类型' style={{width:"70%"}} >
          <Option value={1}>一日游</Option>
          <Option value={2}>当地购物</Option>
          <Option value={3}>定制游</Option>
        </Select>)}
      </FormItem>
      <FormItem label='对应产品' {...formItemLayout}>
        {getFieldDecorator('detail_id', {
          initialValue:props.initialValue.detail_id,
          rules: [
            {
              required: true,
              message: '请选择对应产品',
            },
          ],
        })(<Select placeholder='请选择对应产品' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='排序' {...formItemLayout}>
        {getFieldDecorator('sort', {
          initialValue:props.initialValue.sort,
          rules: [
            {
              required: true,
              message: '请输入排序',
            },
          ],
        })(<InputNumber placeholder='请输入排序' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='广告图' {...formItemLayout}>
        {getFieldDecorator('advertising_url', {
          initialValue:props.initialValue.advertising_url,
          normalize: value => {
            if (typeof value === 'string') {
              return value
            } else if (Array.isArray(value)) {
              return value.length > 0 ? value.slice(-1)[0] : ''
            }
          },
          rules: [
            {
              required: true,
              message: '请上传广告图',
            },
          ],
        })(<FormUpload
          accept="image/jpeg,image/jpg,image/png"
          action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
          listType={'picture'}
        />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(AdInfoModal)
