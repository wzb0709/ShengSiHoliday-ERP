import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import * as guideServices from '@/services/guide'
import * as teamServices from '@/services/teamManager'
import FoodModal from '@/pages/basic/food/foodModal'
import { Card, Col, Divider, message, Modal, Row, Table, Tag } from 'antd'
import { Link, router } from 'umi'
import GuideModal from '@/pages/team/guide/guideModal'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'


interface IProps {
  match: any
}

interface IBasicInfo {
  tour_phone: string,
  tour_name: string,
  tour_start: string,
  tour_type: number,
}

const GuideDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      tour_name: '',
      tour_phone:'',
      tour_start: '',
      tour_type: 0,
    })

  const [visible,setVisible] = useState<boolean>(false)
  const [teamList,setTeamList] = useState<any>([])

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const getBasicInfo = useCallback(() => {
    guideServices.getGuideDetails(props.match.params.id).then((res: any) => {
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
    teamServices.getGroupTeamList({
      search:'',
      month:'',
      guideid:props.match.params.id,
      opid:'',
      start_time:'',
      end_time:'',
      page:1,
      size:1000
    }).then(res=>{
      setTeamList(res.data)
    })
  }, [getBasicInfo])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'trave_date', title: '发团日期',render:recode => <>
        <div>{moment(recode).format('YYYY-MM-DD')}</div>
      </> },
    { dataIndex: '', title: '团队信息' ,render:recode => <>
        <div>{recode.team_no}</div>
        <div>{recode.team_title}</div>
      </> },
    { dataIndex: 'person_count', title: '人数' },
    // @ts-ignore
    { dataIndex: 'create_id', width:100,title: '计调' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
  ]

  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    guideServices.updateGuide(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该导游？",
      onOk:() => {
        guideServices.deleteGuide(id).then(() => {
          message.success('删除成功！')
          router.replace('/team/guide')
        })
      }
    })
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <a onClick={handleUpdateModal} >编辑</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除</a>
        </>}
      >
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            导游姓名：{basicInfo.tour_name}
          </Col>
          <Col span={12}>
            联系方式：{basicInfo.tour_phone}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            导游星级：{basicInfo.tour_start}
          </Col>
          <Col span={12}>
            导游类型：{basicInfo.tour_type === 1 ? '自有' : '外借'}
          </Col>
        </Row>
      </Card>
      <Card
        title='团队信息'
        style={{marginTop:20}}
      >
        <Table
          columns={columns}
          pagination={{ hideOnSinglePage:true }}
          dataSource={teamList}
          bordered={true}
          rowKey='id'
        />
      </Card>
      <GuideModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
    </>
  )
}

export default GuideDetail
