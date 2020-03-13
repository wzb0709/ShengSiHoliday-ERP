import React, { Component, Fragment } from 'react'
import { Input, Modal, Form, Table, Row, Statistic, Badge, Divider, Card, message } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import ExpenseListModal from '@/pages/money/expense/expenseListModal'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:any) => void
  readonly initialValue:any
  readonly type:number
}

const FormItem = Form.Item


class ExpenseModal extends Component<IProps,{}> {

  state = {
    visible:false,
    initialValue:{},
    id:'',
    dataSource:[],
  }

  columns: ColumnProps<Object>[] = [
    { dataIndex: 'detail_content', title: '报销内容',ellipsis:true},
    { dataIndex: 'expense_money', title: '报销金额',render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row>},
    { dataIndex: 'happen_date', title: '发生时间',render:recode=>moment(recode).format('YYYY-MM-DD') },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => this.handleEdit(recode)}>编辑</a>
        <Divider type='vertical' />
        <a onClick={() => this.handleDelete(recode)} style={{color:'red'}}>删除</a>
      </Fragment>,
    },
  ]

  handleEdit = (id:string) => {
    this.setState({
      visible:true,
      id,
      initialValue:this.state.dataSource.find((item:any) => item.id === id)
    })
  }

  handleDelete = (id:string) => {
    let arr = this.state.dataSource
    const index = arr.findIndex((item:any) => item.id === id)
    if(index != -1){
      arr.splice(index,1)
      this.setState({dataSource:arr})
    }
  }

  handleAdd = () => {
    this.setState({
      visible:true,
      id:'',
      initialValue:{}
    })
  }

  handleConfirm = () => {
    if(this.state.dataSource.length === 0){
      message.success('请添加明细')
      return false
    }
    this.props.form.validateFields((err,values)=>{
      if(!err){
        let arr:any = []
        this.state.dataSource.forEach((item:any) => {
          arr.push({
            detail_content:item.detail_content,
            happen_date:item.happen_date,
            expense_money:item.expense_money
          })
        })
        values = {
          ...values,
          detail:[...arr]
        }
        this.props.onOk(values)
      }
    })
  }

  handleConfirmList = (values:any) => {
    if(this.state.id === ''){
      let arr:any = this.state.dataSource
      arr.push({
        ...values,
        happen_date:values.happen_date.format('YYYY-MM-DD'),
        id:moment().unix()
      })
      this.setState({dataSource:arr,visible:false})
    }else{
      let arr:any = this.state.dataSource
      const index = arr.findIndex((item:any) => item.id === this.state.id)
      if(index !== -1){
        arr[index] = {
          ...arr[index],
          ...values,
          happen_date:values.happen_date.format('YYYY-MM-DD'),
        }
        this.setState({dataSource:arr,visible:false})
      }
    }
  }

  render() {

    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    }

    return (
      <>
       <Modal
         visible={this.props.visible}
         onCancel={this.props.onCancel}
         title='添加/编辑报销详细'
         width={800}
         destroyOnClose={true}
         onOk={this.handleConfirm}
       >
         <FormItem label='报销标题' {...formItemLayout}>
           {getFieldDecorator('expense_title', {
             initialValue:this.props.initialValue.expense_title,
             rules: [
               {
                 required: true,
                 message: '请输入报销标题',
               },
             ],
           })(<Input placeholder='请输入报销内容' style={{width:"90%"}} />)}
         </FormItem>

         {this.props.type === 1 && <>
           <Card
             title='报销明细'
             style={{marginTop:20}}
             extra={<a onClick={this.handleAdd}>添加明细</a>}
           >
             <Table
               bordered={true}
               dataSource={this.state.dataSource}
               rowKey='id'
               columns={this.columns}
             />
           </Card>
           <ExpenseListModal
             visible={this.state.visible}
             onCancel={() => this.setState({visible:false})}
             onOk={this.handleConfirmList}
             initialValue={this.state.initialValue}
           />
         </>}
       </Modal>
      </>
    )
  }
}

export default Form.create<IProps>()(ExpenseModal)
