import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:IQuestionSearch
  onSearch:(values:IQuestionSearch) => void
}

export interface IQuestionSearch {
  search:string,
  status:number,
}

const FormItem = Form.Item
const Option = Select.Option

const QuestionSearch:FC<IProps> = (props) => {

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
      <FormItem style={{width:150,marginLeft:20}}>
        {getFieldDecorator('status', {
          initialValue:props.initialValue.status,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择显示状态' style={{width:150}} >
          <Option value={-1}>全部显示状态</Option>
          <Option value={0}>未显示</Option>
          <Option value={1}>已显示</Option>
        </Select>)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(QuestionSearch)
