import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Form, Select, Button, Input, DatePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option

interface IProps {
  form: WrappedFormUtils
  readonly onSearch: (values: IMemberSearch) => void
  readonly params: IMemberSearch
}

export interface IMemberSearch {
  readonly search:string,
  start_time:string,
  end_time:string,
}

const MemberSearch:FC<IProps> = (props) => {
  const handleSearch = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSearch(values)
      }
    })
  }
  const { getFieldDecorator } = props.form
  return (
    <div style={{ marginTop: 20 }}>
      <Form style={{ display: 'flex' }}>
        <FormItem>
          {getFieldDecorator('search', {
            initialValue: props.params.search,
            rules: [
              {
                required: false,
                message: '请输入关键词',
              },
            ],
          })(<Input style={{ width: 200, marginRight: 20 }} placeholder='请输入关键词'/>)}
        </FormItem>
        <FormItem style={{width:150,marginLeft:20}} >
          {getFieldDecorator('start_time', {
            initialValue:props.params.start_time === '' ? undefined : moment(props.params.start_time),
            rules: [
              {
                required: false,
              },
            ],
          })(<DatePicker  placeholder='请选择开始时间' style={{width:150}} />)}
        </FormItem>
        <FormItem style={{width:150,marginLeft:20}} >
          {getFieldDecorator('end_time', {
            initialValue:props.params.end_time === '' ? undefined : moment(props.params.end_time),
            rules: [
              {
                required: false,
              },
            ],
          })(<DatePicker placeholder='请选择结束时间' style={{width:150}} />)}
        </FormItem>
        <Button type='primary' style={{ marginTop: 3,marginLeft:20 }} onClick={handleSearch}>查询</Button>
      </Form>
    </div>
  )
}

export default Form.create<IProps>()(MemberSearch)
