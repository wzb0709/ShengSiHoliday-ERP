import React, { FC } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { Form, Select, Button, Input } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

interface IProps {
  form: WrappedFormUtils
  readonly onSearch: (values: IUserSearch) => void
  readonly params: IUserSearch
}

export interface IUserSearch {
  search: string,
  status: number
}

const UserSearch: FC<IProps> = (props) => {

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
        <FormItem>
          {getFieldDecorator('status', {
            initialValue: props.params.status,
            rules: [
              {
                required: false,
                message: '请选择状态',
              },
            ],
          })(<Select style={{ width: 200, marginRight: 20 }} placeholder='请选择状态'>
            <Option value={-1}>全部</Option>
            <Option value={0}>禁用</Option>
            <Option value={1}>启用</Option>
          </Select>)}
        </FormItem>
        <Button type='primary' style={{ marginTop: 3 }} onClick={handleSearch}>查询</Button>
      </Form>
    </div>
  )
}

export default Form.create<IProps>()(UserSearch)
