import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, Divider, message, Modal, Row, Table } from 'antd'

import * as pointServices from '@/services/point'
import PointModal from '@/pages/basic/point/pointModal'

const Point:FC = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})
  const [id,setId] = useState<string>('')

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'point_title', title: '标题' },
    {dataIndex: 'point_type', title: '类型',render:recode => recode === 1 ? '上车点' : '租赁点'},
    {dataIndex: 'point_address', title: '地址'},
    {
      dataIndex: '', title: '显示状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_use === 1 ? '已启用' : '未启用'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_use)}>{recode.is_use === 0 ? '点击启用' : '点击禁用'}</a>
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
  const getPointList = useCallback(() => {
    pointServices.getPointList().then((res:any)=>{
        setDataSource(res)
    })
  }, [])
  useEffect(() => {
    getPointList()
  }, [getPointList])

  const handleChangeStatus = (id:string,status:number) => {
    pointServices.updatePointStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getPointList()
      })
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
    }
    if(id === ''){
      pointServices.addPoint(params).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getPointList()
      })
    }else{
      pointServices.updatePoint(params,id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getPointList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该产品？',
      onOk:() => {
        pointServices.deletePoint(id).then(() => {
          message.success('操作成功！')
          getPointList()
        })
      }
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增上车点</Button>
      </Row>
      <Table
        columns={columns}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='id'
      />
      {visible && <PointModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />}
    </>
  )
}

export default Point
