import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, Form, Input, Select } from 'antd'

interface IProps {
  form:WrappedFormUtils
  initialValue:ICarSearch
  onSearch:(values:ICarSearch) => void
}

export interface ICarSearch {
  site:number,
  is_driver:number,
  rental_time_type:number
}

const FormItem = Form.Item
const Option = Select.Option

const CarSearch:FC<IProps> = (props) => {

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
        {getFieldDecorator('site', {
          initialValue:props.initialValue.site,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择座位数' style={{width:200}} >
          <Option value={-1}>全部座位</Option>
          <Option value={0}>7座</Option>
          <Option value={1}>10座</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('is_driver', {
          initialValue:props.initialValue.is_driver,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='是否有司机' style={{width:200}} >
          <Option value={-1}>全部</Option>
          <Option value={0}>无司机</Option>
          <Option value={1}>有司机</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{width:200,marginLeft:20}}>
        {getFieldDecorator('rental_time_type', {
          initialValue:props.initialValue.rental_time_type,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='租赁类型' style={{width:200}} >
          <Option value={-1}>全部类型</Option>
          <Option value={0}>按天</Option>
          <Option value={1}>按小时</Option>
        </Select>)}
      </FormItem>
      <Button type='primary' style={{marginBottom:24,marginLeft:20}} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(CarSearch)
