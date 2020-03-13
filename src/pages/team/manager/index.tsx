import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import {Button,  message, Modal, Row, Table } from 'antd'
import moment from 'moment'

import * as teamServices from '@/services/teamManager'
import * as guideServices from '@/services/guide'
import CommentModal from '@/pages/market/comment/commentModal'
import GroupManagerSearch, { IGroupManagerSearch } from '@/pages/team/manager/managerSearch'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import { Link } from 'umi'
import TeamModal from '@/pages/team/manager/teamModal'

const GroupTeam:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IGroupManagerSearch>({
    search:'',
    month:'',
    guideid:'',
    opid:'',
    start_time:'',
    end_time:'',
  })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')
  const [guideList, setGuideList] = useState<any>([])

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

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
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
          <Link to={`/team/manager/${recode.id}`}>查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getTeamList = useCallback(() => {
    teamServices.getGroupTeamList({...params,page,size})
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getTeamList()
    guideServices.getGuideList('',-1,0,1,10000).then(res=>{
      setGuideList(res.data)
    })
  }, [getTeamList])
  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.start_time)values.start_time = values.start_time.format('YYYY-MM-DD')
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    if(values.trave_date)values.trave_date = values.trave_date.format('YYYY-MM-DD')
    if(values.month)values.month = values.month.format('YYYY-MM')
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleAddModal = () => {
    setVisible(true)
    setInitialValue({})
    setId('')
  }

  const handleEditModal = (id:string) => {
    dataSource.forEach(item=>{
      if(item.id === id){
        setId(id)
        setInitialValue(item)
        setVisible(true)
      }
    })
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      trave_date:values.trave_date.format('YYYY-MM-DD'),
      create_id:localStorage.getItem('id')
    }
    if(id === ''){
      teamServices.addGroupTeam({...params}).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getTeamList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm(({
      title:'提示',
      content:'是否要删除该条数据？',
      onOk:() => {
        teamServices.deleteGroupTeam(id).then(()=>{
          message.success('操作成功')
          getTeamList()
        })
      }
    }))
  }

  const handleView = () => {

  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增团队</Button>
        <GroupManagerSearch memberList={memberList} guideList={guideList} initialValue={params} onSearch={handleSearch}/>
      </Row>
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='id'
      />
      <div style={{marginTop:-47}}>
        <Button type='primary' style={{marginTop:-20}} onClick={handleView} >查看统计信息</Button>
      </div>
      {visible && <TeamModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
        guideList={guideList}
      />}
    </>
  );}

export default GroupTeam;
