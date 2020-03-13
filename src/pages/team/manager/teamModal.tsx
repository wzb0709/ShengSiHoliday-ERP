import React, { FC } from 'react'
import { Modal, Form, Input, Select,DatePicker} from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly guideList:any
}


const FormItem = Form.Item
const Option = Select.Option
const TeamModal:FC<IProps> = (props) => {
  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
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
      title='添加/编辑团队'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='团队标题' {...formItemLayout}>
        {getFieldDecorator('team_title', {
          initialValue:props.initialValue.team_title,
          rules: [
            {
              required: true,
              message: '请输入团队标题',
            },
          ],
        })(<Input placeholder='请输入团队标题' style={{width:"90%"}} />)}
      </FormItem>
      <FormItem label='导游' {...formItemLayout}>
        {getFieldDecorator('guide_id', {
          initialValue:props.initialValue.guide_id,
          rules: [
            {
              required: true,
              message: '请选择导游',
            },
          ],
        })(<Select placeholder='请选择导游' style={{width:"90%"}} >
          {props.guideList.map((item:any)=>{
            return <Option key={item.id}>{item.tour_name}</Option>
          })}
        </Select>)}
      </FormItem>
      <FormItem label='出游日期' {...formItemLayout}>
        {getFieldDecorator('trave_date', {
          initialValue:!props.initialValue.trave_date ? undefined : moment(props.initialValue.trave_date),
          rules: [
            {
              required: true,
              message: '请选择出游日期',
            },
          ],
        })(<DatePicker placeholder='请选择出游日期' style={{width:"90%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(TeamModal)
