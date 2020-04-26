import React, { FC, useState } from 'react'
import { Card, message } from 'antd'

import * as commonServices from '@/services/common'
import NotesModal from '@/pages/order/notes/notesModal'

interface IProps {
  basicInfo: any,
  onRefresh: any
  cantEdit?:boolean
}

const NotesInfo: FC<IProps> = (props) => {


  const [visible, setVisible] = useState<boolean>(false)

  const handleConfirm = (values: any) => {
    commonServices.updateBasicOrderInfo({
      ...values, id: props.basicInfo.order_id,
    }).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      props.onRefresh()
    })
  }


  return (
    <>
      <Card
        title={<div>订单备注</div>}
        extra={!props.cantEdit &&
          <>
            <a onClick={() => setVisible(true)}>编辑备注</a>
          </>
        }
        style={{ marginTop: 20 }}
      >
        <div>{props.basicInfo.notes}</div>
      </Card>

      <NotesModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={props.basicInfo}
      />
    </>
  )
}

export default NotesInfo
