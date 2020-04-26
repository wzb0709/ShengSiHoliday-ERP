import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Calendar, Card, Modal, Select, Table } from 'antd'
import moment from 'moment'
import * as guideServices from '@/services/guide'
import * as teamServices from '@/services/teamManager'
import { ColumnProps } from 'antd/lib/table'
import { Link } from 'umi'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'


const Option = Select.Option

const GuideCalendar: FC = (props) => {

  const [guideList, setGuideList] = useState<any>([])
  const [id,setId] = useState<string>('')
  const [dataSource, setDataSource] = useState<Array<any>>([])
  const [dataSource1, setDataSource1] = useState<Array<any>>([])
  const [visible,setVisible] = useState<boolean>(false)

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const getInfo = useCallback(() => {
    teamServices.getGroupTeamList({start_time:'',end_time:'',search:'',month:'',opid:'',guideid:id,page:1,size:10000})
      .then((res: any) => {
        setDataSource(res.data)
      })
  }, [id])
  useEffect(() => {
    getInfo()
    guideServices.getGuideList('',-1,0,1,10000).then(res=>{
      setGuideList(res.data)
    })
  }, [getInfo])

  const handleRender = (date: any) => {
    const a = dataSource.find((item: any) => date.format('YYYY-MM-DD') === moment(item.trave_date).format('YYYY-MM-DD'))
    if (a) {
      return <div style={{ height: '100%', width: '100%' }} >
        <a onClick={() => handleShowInfo(a)}>{guideList.find((item:any) => item.id === a.guide_id)?.tour_name}</a>
      </div>
    } else {
      return <></>
    }
  }

  const handleShowInfo = (a:any) => {
    setVisible(true)
    setDataSource1([a])
  }

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'trave_date', title: '发团日期',render:recode => <>
        <div>{moment(recode).format('YYYY-MM-DD')}</div>
      </> },
    { dataIndex: '', title: '团队信息' ,render:recode => <>
        <div>{recode.team_no}</div>
        <div>{recode.team_title}</div>
      </> },
    { dataIndex: 'order_count', title: '订单数' },
    { dataIndex: 'person_count', title: '人数' },
    { dataIndex: 'guide_id', title: '导游' ,render:recode=>guideList.find((item:any) => item.id === recode) ? guideList.find((item:any) => item.id === recode).tour_name : ''},
    // @ts-ignore
    { dataIndex: 'create_id', width:100,title: '计调' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    { dataIndex: 'create_time', title: '创建时间',render:recode => <>
        <div>{moment(recode).format('YYYY-MM-DD HH:mm:ss')}</div>
      </> },
  ]


  const handleChange = (val:string) => {
    setId(val)
  }

  return (
    <>
      <Select
        style={{width:300,marginBottom:20}}
        // @ts-ignore
        onSelect={handleChange}
        placeholder='请选择导游'
      >
        {guideList.map((item:any)=>{
          return <Option key={item.id}>{item.tour_name}</Option>
        })}
      </Select>
      <Card
        title='导游日历'
      >
        <Calendar dateCellRender={handleRender}/>
      </Card>

      <Modal
        title='团队信息'
        visible={visible}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        width={1200}
      >
        <Table
          columns={columns}
          dataSource={dataSource1}
          // @ts-ignore
          bordered={true}
          rowKey='id'
        />
      </Modal>
    </>
  )
}

export default GuideCalendar
