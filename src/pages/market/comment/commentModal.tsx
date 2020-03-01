import React, { FC, useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'

import * as oneDayServices from '@/services/onDay'
import * as partyServices from '@/services/party'
import * as shopServices from '@/services/shopping'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
}


const FormItem = Form.Item
const Option = Select.Option

const CommentModal:FC<IProps> = (props) => {

  const [dataSource,setDataSource] = useState<any>([])

  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }

  useEffect(() => {
    if(props.initialValue.content_type === 1){
      oneDayServices.getOneDayList({
        search:'',
        status:-1,
        op_id:'',
        start_time:'',
        end_time:'',
        page:1,
        size:10000
      }).then(res=>{
        setDataSource(res.data)
        props.form.setFieldsValue({content_id:props.initialValue.content_id})
      })
    }else if(props.initialValue.content_type === 2){
      shopServices.getShoppingList('',-1,1,10000).then(res=>{
        setDataSource(res.data)
        props.form.setFieldsValue({content_id:props.initialValue.content_id})
      })
    }else{
      partyServices.getCustomerList('',-1,'',1,10000).then(res=>{
        setDataSource(res.data)
        props.form.setFieldsValue({content_id:props.initialValue.content_id})
      })
    }
  },[props.initialValue.content_type])

  const handleConfirm = () => {
    props.form.validateFields((err,values)=>{
      if(!err){
        props.onOk(values)
      }
    })
  }

  const handleSelectChange = (value:number) => {
    if(value === 1){
      oneDayServices.getOneDayList({
        search:'',
        status:-1,
        op_id:'',
        start_time:'',
        end_time:'',
        page:1,
        size:10000
      }).then(res=>{
        props.form.setFieldsValue({'content_id':null})
        setDataSource(res.data)
      })
    }else if(value === 3){
      partyServices.getCustomerList('',-1,'',1,10000).then(res=>{
        props.form.setFieldsValue({'content_id':null})
        setDataSource(res.data)
      })
    }else{
      shopServices.getShoppingList('',-1,1,10000).then(res=>{
        props.form.setFieldsValue({'content_id':null})
        setDataSource(res.data)
      })
    }
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='添加/编辑虚拟评价'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='评分' {...formItemLayout}>
        {getFieldDecorator('score', {
          initialValue:props.initialValue.score,
          rules: [
            {
              required: true,
              message: '请输入评分',
            },
          ],
        })(<InputNumber max={5} min={1} placeholder='请输入评分' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='评价对象类型' {...formItemLayout}>
        {getFieldDecorator('content_type', {
          initialValue:props.initialValue.content_type,
          rules: [
            {
              required: true,
              message: '请选择评价对象类型',
            },
          ],
        })(<Select onChange={handleSelectChange} placeholder='请选择评价对象类型' style={{width:"70%"}} >
          <Option value={1}>一日游</Option>
          <Option value={2}>当地购物</Option>
          <Option value={3}>定制游</Option>
        </Select>)}
      </FormItem>
      {props.form.getFieldValue('content_type') && <FormItem label='评价产品' {...formItemLayout}>
        {getFieldDecorator('content_id', {
          initialValue:props.initialValue.content_id,
          rules: [
            {
              required: true,
              message: '请选择评价评价产品',
            },
          ],
        })(<Select placeholder='请选择评价评价产品' style={{width:"70%"}} >
          {dataSource.map((item:any)=>{
            return <Option key={item.id}>{item.product_title}</Option>
          })}
        </Select>)}
      </FormItem>}
      <FormItem label='评价标题' {...formItemLayout}>
        {getFieldDecorator('content_title', {
          initialValue:props.initialValue.content_title,
          rules: [
            {
              required: true,
              message: '请输入评价标题',
            },
          ],
        })(<Input placeholder='请输入评价标题' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='评价内容' {...formItemLayout}>
        {getFieldDecorator('evaluation_content', {
          initialValue:props.initialValue.evaluation_content,
          rules: [
            {
              required: true,
              message: '请输入评价内容',
            },
          ],
        })(<Input.TextArea rows={3} placeholder='请输入评价内容' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='评价图片' {...formItemLayout}>
        {getFieldDecorator('evaluation_imgs', {
          initialValue:props.initialValue.evaluation_imgs,
          rules: [
            {
              required: false,
              message: '请输入评价内容',
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

export default Form.create<IProps>()(CommentModal)
