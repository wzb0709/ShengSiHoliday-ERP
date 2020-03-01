import React, { FC } from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const CarModal:FC<IProps> = (props) => {
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
      title='添加/编辑汽车产品'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='车型名称' {...formItemLayout}>
        {getFieldDecorator('car_title', {
          initialValue:props.initialValue.car_title,
          rules: [
            {
              required: true,
              message: '请输入车型名称',
            },
          ],
        })(<Input placeholder='请输入车型名称' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='座位数' {...formItemLayout}>
        {getFieldDecorator('car_site', {
          initialValue:props.initialValue.car_site,
          rules: [
            {
              required: true,
              message: '请输入座位数',
            },
          ],
        })(<InputNumber placeholder='请输入座位数' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='按天计价(天/小时)' {...formItemLayout}>
        {getFieldDecorator('time_price', {
          initialValue:props.initialValue.time_price || 0,
          rules: [
            {
              required: true,
              message: '请输入按天计价(天/小时)',
            },
          ],
        })(<InputNumber placeholder='请输入按天计价(天/小时)' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='按时计价(元/小时)' {...formItemLayout}>
        {getFieldDecorator('day_price', {
          initialValue:props.initialValue.day_price || 0 ,
          rules: [
            {
              required: true,
              message: '请输入按时计价(元/小时)',
            },
          ],
        })(<InputNumber placeholder='请输入按时计价(元/小时)' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='汽车图片' {...formItemLayout}>
        {getFieldDecorator('car_pic', {
          initialValue:props.initialValue.car_pic,
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

export default Form.create<IProps>()(CarModal)
