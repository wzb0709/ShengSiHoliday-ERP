import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:IAdLocationSearch
  onSearch:(values:IAdLocationSearch) => void
}

export interface IAdLocationSearch {
  search:string,
  status:number,
}

const FormItem = Form.Item
const Option = Select.Option

const AdLocationSearch:FC<IProps> = (props) => {

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

export default Form.create<IProps>()(AdLocationSearch)
