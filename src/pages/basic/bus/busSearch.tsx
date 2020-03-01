import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:IBusSearch
  onSearch:(values:IBusSearch) => void
  typeList:any
}

export interface IBusSearch {
  type:number,
}

const FormItem = Form.Item
const Option = Select.Option

const BusSearch:FC<IProps> = (props) => {

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
      <FormItem style={{width:200}}>
        {getFieldDecorator('type', {
          initialValue:props.initialValue.type,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择公交类型' style={{width:200}} >
          <Option value={0}>全部公交类型</Option>
          {props.typeList.map((item:any)=>{
            return(
              <Option key={item.id}>{item.type_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(BusSearch)
