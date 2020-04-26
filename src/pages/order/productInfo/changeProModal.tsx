import React, { FC, useEffect, useState } from 'react'
import { Modal, Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'
import * as oneDayServices from '@/services/onDay'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly proList:any
}

const FormItem = Form.Item
const Option = Select.Option

const ChangeProModal:FC<IProps> = (props) => {

  const [dateList,setDateList] = useState<any>([])



  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }

  const handleChange = (value:string) => {
    oneDayServices.getPlan(value).then(res=>{
      setDateList(res)
    })
  }

  const handleConfirm = () => {
    props.form.validateFields((err,values)=>{
      if(!err){
        props.onOk(values)
      }
    })
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='更换产品'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='产品名称' {...formItemLayout}>
        {getFieldDecorator('product_id', {
          initialValue:props.initialValue.product_id,
          rules: [
            {
              required: true,
              message: '请选择要更换的产品名称',
            },
          ],
        })(<Select
          placeholder='请选择要更换的产品名称'
          style={{width:"70%"}}
          filterOption={(input, option) =>
            // @ts-ignore
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          showSearch={true}
          // @ts-ignore
          onSelect={handleChange}
        >
          {props.proList.map((item:any) => {
            return(
              <Option key={item.id}>{item.product_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label='发团日期' {...formItemLayout}>
        {getFieldDecorator('date_id', {
          rules: [
            {
              required: true,
              message: '请选择要更换的发团日期',
            },
          ],
        })(<Select
          placeholder='请选择要更换的发团日期'
          style={{width:"70%"}}
          filterOption={(input, option) =>
            // @ts-ignore
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          showSearch={true}
        >
          {dateList.map((item:any) => {
            return(
              <Option key={item.id}>{`${moment(item.start_date).format('YYYY-MM-DD')} 余位${item.site}`}</Option>
            )
          })}
        </Select>)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ChangeProModal)

