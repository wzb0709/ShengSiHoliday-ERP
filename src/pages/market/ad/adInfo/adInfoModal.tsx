import React, { FC, useEffect, useState } from 'react'
import { Modal, Form, Input, Select, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormUpload from '@/component/upload/formUpload'
import * as oneDayServices from '@/services/onDay'
import * as shopServices from '@/services/shopping'
import * as partyServices from '@/services/party'

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

  const [dataSource,setDataSource] = useState<any>([])

  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }

  useEffect(() => {
    if(props.initialValue.detail_type === 1){
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
        props.form.setFieldsValue({detail_id:props.initialValue.detail_id})
      })
    }else if(props.initialValue.detail_type === 2){
      shopServices.getShoppingList('',-1,1,10000).then(res=>{
        setDataSource(res.data)
        props.form.setFieldsValue({detail_id:props.initialValue.detail_id})
      })
    }else{
      partyServices.getCustomerList('',-1,'',1,10000).then(res=>{
        setDataSource(res.data)
        props.form.setFieldsValue({detail_id:props.initialValue.detail_id})
      })
    }
  },[props.initialValue.detail_type])

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
        props.form.setFieldsValue({'detail_id':null})
        setDataSource(res.data)
      })
    }else if(value === 3){
      partyServices.getCustomerList('',-1,'',1,10000).then(res=>{
        props.form.setFieldsValue({'detail_id':null})
        setDataSource(res.data)
      })
    }else{
      shopServices.getShoppingList('',-1,1,10000).then(res=>{
        props.form.setFieldsValue({'detail_id':null})
        setDataSource(res.data)
      })
    }
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
        })(<Input placeholder='请输入广告标题' style={{width:"70%"}} />)}
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
      { props.form.getFieldValue('advertising_type') === 1 && <>
        <FormItem label='广告类型' {...formItemLayout}>
          {getFieldDecorator('detail_type', {
            initialValue:props.initialValue.detail_type,
            rules: [
              {
                required: true,
                message: '请选择广告类型',
              },
            ],
          })(<Select onChange={handleSelectChange} placeholder='请选择广告类型' style={{width:"70%"}} >
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
          })(<Select placeholder='请选择对应产品' style={{width:"70%"}} >
            {dataSource.map((item:any)=>{
              return <Option key={item.id}>{item.product_title}</Option>
            })}
          </Select>)}
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
      </>}
      {props.form.getFieldValue('advertising_type') === 2 && <FormItem label='外部链接地址' {...formItemLayout}>
        {getFieldDecorator('advertising_url', {
          initialValue:props.initialValue.advertising_url,
          rules: [
            {
              required: true,
              message: '请输入外部链接地址',
            },
          ],
        })(<Input placeholder='请输入外部链接地址' style={{width:"70%"}} />)}
      </FormItem>}
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
    </Modal>
  )
}

export default Form.create<IProps>()(AdInfoModal)
