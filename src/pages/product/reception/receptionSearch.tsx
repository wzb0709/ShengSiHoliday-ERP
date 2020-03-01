import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:IReceptionSearch
  onSearch:(values:IReceptionSearch) => void
  opList:any
}

export interface IReceptionSearch {
  search:string,
  op_id:string,
}

const FormItem = Form.Item
const Option = Select.Option

const ReceptionSearch:FC<IProps> = (props) => {

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
        {getFieldDecorator('op_id', {
          initialValue:props.initialValue.op_id === '' ? undefined : props.initialValue.op_id,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择计调' style={{width:200}} >
          {props.opList.map((item:any)=>{
            return(
              <Option key={item.id}>{item.name}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(ReceptionSearch)
