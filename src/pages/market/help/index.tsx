import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import moment from 'moment'

import * as helpServices from '@/services/help'
import HelpSearch, { IHelpSearch } from '@/pages/market/help/helpSearch'
import HelpModal from '@/pages/market/help/helpModal'

const Help:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IHelpSearch>({ search:'' })

  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})
  const [id,setId] = useState<string>('')


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'tips_title', title: '小贴士标题'},
    { dataIndex: 'read_count', title: '浏览数'},
    { dataIndex: 'create_time', title: '发布时间',render:recode => moment(recode).format('YYYY-MM-DD')},
    {
      dataIndex: '', title: '显示状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
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
  const getHelpList = useCallback(() => {
    helpServices.getTipsList(params.search,page,size)
      .then((res1: any) => {
        setDataSource(res1.data)
        setCount(res1.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getHelpList()
  }, [getHelpList])


  const handleChangeStatus = (id:string,status:number) => {
    helpServices.updateTipsStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getHelpList()
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
      tips_content:values.tips_content.toHTML(),
    }
    if(id === ''){
      helpServices.addTips(params).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getHelpList()
      })
    }else{
      helpServices.updateTips(params,id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getHelpList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该产品？',
      onOk:() => {
        helpServices.deleteTips(id).then(() => {
          message.success('操作成功！')
          getHelpList()
        })
      }
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增小贴士</Button>
        <HelpSearch initialValue={params} onSearch={handleSearch}/>
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
      {visible && <HelpModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />}
    </>
  )
}

export default Help
