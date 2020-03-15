import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import moment from 'moment'

import * as noticeServices from '@/services/notice'

import NoticeSearch, { INoticeSearch } from '@/pages/administrative/notice/noticeSearch'
import NoticeModal from '@/pages/administrative/notice/noticeModal'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

const Notice:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<INoticeSearch>({ search:'' })

  const [typeList,setTypeList] = useState<any>([])
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})
  const [id,setId] = useState<string>('')

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'notice_title', title: '公告标题'},
    // @ts-ignore
    { dataIndex: 'create_id', title: '创建人',render:recode => memberList.find(item => item.id === recode) ? memberList.find(item => item.id === recode).name : ''},
    { dataIndex: 'create_time', title: '发布时间',render:recode => moment(recode).format('YYYY-MM-DD')},
    {
      dataIndex: '', title: '显示状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已显示' : '未隐藏'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击显示' : '点击隐藏'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleEditModal(recode)} >编辑</a>
        <Divider type='vertical' />
        <a onClick={() => handleDelete(recode)} style={{color:'red'}} >删除</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getNoticeList = useCallback(() => {
    noticeServices.getNoticeList(params.search,page,size)
      .then((res1: any) => {
        setDataSource(res1.data)
        setCount(res1.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getNoticeList()
  }, [getNoticeList])


  const handleChangeStatus = (id:string,status:number) => {
    noticeServices.updateNoticeStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getNoticeList()
      })
  }

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleAddModal = () => {
    setVisible(true)
    setInitialValue({})
  }

  const handleEditModal = (id:string) => {
    dataSource.forEach((item:any)=>{
      if(item.id === id){
        setId(id)
        setVisible(true)
        setInitialValue(item)
      }
    })
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      notice_content:values.notice_content.toHTML(),
      create_id:localStorage.getItem('id')
    }
    if(id === ''){
      noticeServices.addNotice(params).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getNoticeList()
      })
    }else{
      noticeServices.updateNotice(params,id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getNoticeList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该产品？',
      onOk:() => {
        noticeServices.deleteNotice(id).then(() => {
          message.success('操作成功！')
          getNoticeList()
        })
      }
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增公告</Button>
        <NoticeSearch initialValue={params} onSearch={handleSearch}/>
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
      {visible && <NoticeModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
        typeList={typeList}
      />}
    </>
  )
}

export default Notice
