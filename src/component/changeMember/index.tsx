import React, { Component } from 'react'
import { message, Modal, Row, Select } from 'antd'
import * as commonServices from '@/services/common'

interface IProps {
  readonly visible:boolean
  readonly onCancel:any
  readonly memberList:any
  readonly type:number
}

interface IState {
  id:string
}

const Option = Select.Option

class ChangeMember extends Component<IProps,IState> {

  state = {
    id:''
  }

  handleConfirm = () => {
    // @ts-ignore
    commonServices.changeMember(localStorage.getItem('id'),this.state.id,this.props.type).then(()=>{
      message.success('操作成功！')
      this.props.onCancel()
    })
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        title='转让销售/计调'
        width={800}
        destroyOnClose={true}
        onOk={this.handleConfirm}
      >
        <Row type='flex' align='middle' justify='center' >
          <div>转让人员：</div>
          <Select onChange={(value:string) => this.setState({id:value})} style={{width:300}} placeholder='请选择要转让的人员' >
            {this.props.memberList.map((item:any) => {
              return localStorage.getItem('id') !== item.id && <Option key={item.id}>{item.name}</Option>
            })}
          </Select>
        </Row>
      </Modal>
    )
  }
}

export default ChangeMember
