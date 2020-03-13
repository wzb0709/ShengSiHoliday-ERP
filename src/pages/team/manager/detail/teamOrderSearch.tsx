import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'

interface IProps {
  form: WrappedFormUtils
  initialValue: ITeamOrderSearch
  onSearch: (values: ITeamOrderSearch) => void
}

export interface ITeamOrderSearch {
  ordertype: number,
  trave_date: string,
}

const FormItem = Form.Item
const Option = Select.Option

const TeamOrderSearch: FC<IProps> = (props) => {

  const { getFieldDecorator } = props.form

  const handleConfirm = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSearch(values)
      }
    })
  }

  return (
    <>
      <FormItem style={{ width: 150}}>
        {getFieldDecorator('ordertype', {
          initialValue: props.initialValue.ordertype || undefined,
          rules: [
            {
              required: false,
            },
          ],
        })(<Select placeholder='请选择订单类型' style={{ width: 150 }}>
          <Option value={0}>全部订单</Option>
          <Option value={1}>一日游</Option>
          <Option value={3}>定制游</Option>
        </Select>)}
      </FormItem>
      <FormItem style={{ width: 150, marginLeft: 20 }}>
        {getFieldDecorator('trave_date', {
          initialValue: props.initialValue.trave_date === '' ? undefined : moment(props.initialValue.trave_date),
          rules: [
            {
              required: false,
            },
          ],
        })(<DatePicker placeholder='请选择出游时间' style={{ width: 150 }}/>)}
      </FormItem>
      <Button type='primary' style={{ marginBottom: 24, marginLeft: 20 }} onClick={handleConfirm}>查询</Button>
    </>
  )
}

export default Form.create<IProps>()(TeamOrderSearch)
