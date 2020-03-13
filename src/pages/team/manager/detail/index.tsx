import React, { FC, useCallback, useEffect, useState } from 'react'
import * as guideServices from '@/services/guide'
import * as teamServices from '@/services/teamManager'

import { Card, Col, Divider, message, Modal, Row, Table } from 'antd'
import { router } from 'umi'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import TeamModal from '@/pages/team/manager/teamModal'
import TeamOrderModal from '@/pages/team/manager/detail/teamOrderModal'


interface IProps {
  match: any
}

interface IBasicInfo {
  team_no: string,
  team_title: string,
  trave_date: string,
  guide_id: string,
  create_id:string,
  create_time:string
}

const TeamDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      team_no: '',
      team_title: '',
      trave_date: '',
      guide_id: '',
      create_id:'',
      create_time:''
    })

  const [visible,setVisible] = useState<boolean>(false)
  const [orderList,setOrderList] = useState<any>([])
  const [guideList, setGuideList] = useState<any>([])
  const [orderVisible,setOrderVisible] = useState<boolean>(false)

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const getBasicInfo = useCallback(() => {
    teamServices.getGroupTeamDetail(props.match.params.id).then((res: any) => {
      setBasicInfo(res)
    })
    teamServices.getGroupOrderList(props.match.params.id,1,100).then(res=>{
      setOrderList(res.data)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
    guideServices.getGuideList('',-1,0,1,1000).then(res=>{
      setGuideList(res.data)
    })
  }, [getBasicInfo])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息',render:recode => <>
        <div>订单类型：{recode.order_type === 1 ? '一日游'
          : recode.order_type === 2 ? '当地购物'
            : recode.order_type === 3 ? '定制游'
              : recode.order_type === 4 ? '汽车租赁'
                :  '一团一议'}</div>
        <div>订单编号：{recode.product_no}</div>
      </> },
    { dataIndex: '', title: '联系人信息' ,render:recode => <>
        <div>联系人姓名：{recode.contact_name}</div>
        <div>联系方式：{recode.contact_phone}</div>
      </> },
    { dataIndex: '', title: '订单人数' ,render:recode =><div>{recode.adult_count}成人 {recode.child_count}儿童</div>},
    // @ts-ignore
    { dataIndex: 'sale_id', width:100,title: '订单销售' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    { dataIndex: 'notes', title: '备注' },
    { dataIndex: 'id', title: '操作',render:recode => <a style={{color:'red'}} onClick={() => handleDeleteOrder(recode)}>删除</a> },
  ]

  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      trave_date:values.trave_date.format('YYYY-MM-DD'),
    }
    teamServices.updateGroupTeam(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该团队？",
      onOk:() => {
        teamServices.deleteGroupTeam(id).then(() => {
          message.success('删除成功！')
          router.replace('/team/manager')
        })
      }
    })
  }


  const handleAddTeamOrder = () => {
    getBasicInfo()
    setOrderVisible(false)
  }

  const handleDeleteOrder = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该订单',
      onOk:() => {
        teamServices.deleteGroupTeamOrder(id).then(res=>{
          message.success('操作成功！')
          getBasicInfo()
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
            发团日期：{moment(basicInfo.trave_date).format('YYYY-MM-DD')}
          </Col>
          <Col span={12}>
            团队编号：{basicInfo.team_no}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          {<Col span={12}>
            跟团导游：{
            guideList.find((item:any) => item.id === basicInfo.guide_id) ? guideList.find((item:any) => item.id === basicInfo.guide_id).tour_name : ''
          }
          </Col>}
          <Col span={12}>
            计调：{
            // @ts-ignore
            memberList.find((item:any) => item.id === basicInfo.create_id) ? memberList.find((item:any) => item.id === basicInfo.create_id).name : ''
          }
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            创建时间：{moment(basicInfo.create_time).format('YYYY-MM-DD HH:mm:ss')}
          </Col>
        </Row>
      </Card>
      <Card
        title='团队订单信息'
        style={{marginTop:20}}
        extra={<a onClick={() => setOrderVisible(true)}>添加团队订单</a>}
      >
        <Table
          columns={columns}
          pagination={{ hideOnSinglePage:true }}
          dataSource={orderList}
          bordered={true}
          rowKey='id'
        />
      </Card>
      <TeamModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
        guideList={guideList}
      />

      {orderVisible && <TeamOrderModal
        visible={orderVisible}
        onCancel={() => setOrderVisible(false)}
        onOk={handleAddTeamOrder}
        id={props.match.params.id}
      />}
    </>
  )
}

export default TeamDetail
