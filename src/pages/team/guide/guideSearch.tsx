import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, DatePicker, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:IGuideSearch
  onSearch:(values:IGuideSearch) => void
}

export interface IGuideSearch {
  search:string,
  status:number,
  type:number
}

const FormItem = Form.Item
const Option = Select.Option

const GuideSearch:FC<IProps> = (props) => {

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
        })(<Input placeholder='搜索关键词' style={{width:120}} />)}
      </FormItem>
      <FormItem style={{width:120,marginLeft:20}}>
        {getFieldDecorator('status', {
          initialValue:props.initialValue.status,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择状态' style={{width:120}} >
          <Option value={-1}>全部状态</Option>
          <Option value={0}>正常</Option>
          <Option value={1}>隐藏</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:120,marginLeft:20}}>
        {getFieldDecorator('type', {
          initialValue:props.initialValue.type,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择导游类型' style={{width:120}} >
          <Option value={-1}>导游类型</Option>
          <Option value={0}>自有</Option>
          <Option value={1}>外借</Option>
        </Select>)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(GuideSearch)
