import React, { FC, useState } from 'react'
import { Card, message, Row } from 'antd'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

import * as commonServices from '@/services/common'
import SalesmanModal from '@/pages/order/salesman/salesmanModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
}

const SalesmanInfo: FC<IProps> = (props) => {

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const [visible, setVisible] = useState<boolean>(false)

  const handleConfirm = (values: any) => {
    commonServices.updateBasicOrderInfo({
      ...values, id: props.basicInfo.id,
    }).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }


  return (
    <>
      <Card
        title={<div>业务员信息</div>}
        extra={
          <>
            <a onClick={() => setVisible(true)}>更换业务员</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <Row type='flex' align='middle'>
          {props.basicInfo.salesman_id !== '' && <>
            <div>业务员姓名：{
              // @ts-ignore
              memberList.find(item => item.id === props.basicInfo.salesman_id) ? memberList.find(item => item.id === props.basicInfo.salesman_id).name : ''}
            </div>
            <div style={{marginLeft:20}}>业务员联系方式：{
              // @ts-ignore
              memberList.find(item => item.id === props.basicInfo.salesman_id) ? memberList.find(item => item.id === props.basicInfo.salesman_id).phone : ''}
            </div>
          </>}
          {props.basicInfo.salesman_id !== '' && <div>暂无业务员</div>}
        </Row>
      </Card>

      <SalesmanModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
        memberList={memberList}
      />
    </>
  )
}

export default SalesmanInfo
