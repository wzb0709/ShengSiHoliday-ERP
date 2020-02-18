import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:IAdInfoSearch
  onSearch:(values:IAdInfoSearch) => void
}

export interface IAdInfoSearch {
  search:string,
  status:number,
  type:number,
  dType:number,
}

const FormItem = Form.Item
const Option = Select.Option

const AdInfoSearch:FC<IProps> = (props) => {

  const {getFieldDecorator} = props.form

  const handleConfirm = () => {
    props.form.validateFields((err,values)=>{
      if(!err){
        props.onSearch(values)
      }
    })
  }

  return (
    <>
      <FormItem>
        {getFieldDecorator('search', {
          initialValue:props.initialValue.search,
          rules: [
            {
              required: false,
            },
          ],
        })(<Input placeholder='搜索关键词' style={{width:200}} />)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('type', {
          initialValue:props.initialValue.type,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择广告链接' style={{width:200}} >
          <Option value={0}>全部链接</Option>
          <Option value={1}>内部链接</Option>
          <Option value={2}>外部链接</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('dType', {
          initialValue:props.initialValue.dType,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择广告类型' style={{width:200}} >
          <Option value={0}>全部</Option>
          <Option value={1}>一日游</Option>
          <Option value={2}>当地购物</Option>
          <Option value={3}>定制游</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('status', {
          initialValue:props.initialValue.status,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择上架状态' style={{width:200}} >
          <Option value={-1}>全部</Option>
          <Option value={0}>未上架</Option>
          <Option value={1}>已上架</Option>
        </Select>)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(AdInfoSearch)
