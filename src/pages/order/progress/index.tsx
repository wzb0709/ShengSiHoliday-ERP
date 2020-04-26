import React, { FC, useEffect, useState} from 'react'
import { Modal,Timeline } from 'antd'
import moment from 'moment'

import * as commonServices from '@/services/common'

interface IProps {
  id:string,
  visible:boolean,
  onCancel:any
}

const Progress:FC<IProps> = (props) => {

  const [info,setInfo] = useState<any>([])

  useEffect(() => {
    commonServices.getProgress(props.id).then(res=>{
      console.log(res)
      setInfo(res)
    })
  },[props.id])

  return (
    <Modal
      title='进度信息'
      footer={null}
      width={600}
      destroyOnClose={true}
      visible={props.visible}
      onCancel={props.onCancel}
    >
      {info.length !== 0 && <Timeline>
        {info.map((item:any) =>{
          return(
            <Timeline.Item key={item.id}>
              <p>{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</p>
              <p>{item.progress_content}</p>
            </Timeline.Item>
          )
        })}
      </Timeline>}
      {info.length === 0 && <div>暂无进度</div>}
    </Modal>
  )
}

export default Progress
