import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import moment from 'moment'

import * as departmentServices from '@/services/department'
import DepartmentModal from '@/pages/system/department/departmentModal'
import DepartmentSearch, { IDepartmentSearch } from '@/pages/system/department/departmentSearch'

const Department:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IDepartmentSearch>({ search:'' })

  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})
  const [id,setId] = useState<string>('')


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'department_name', title: '部门名称'},
    { dataIndex: 'create_time', title: '发布时间',render:recode => moment(recode).format('YYYY-MM-DD HH:mm:ss')},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleEditModal(recode)} >编辑</a>
        <Divider type='vertical' />
        <a onClick={() => handleDelete(recode)} style={{color:'red'}} >删除</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getDepartmentList = useCallback(() => {
    departmentServices.getDepartmentList(params.search,page,size)
      .then((res1: any) => {
        setDataSource(res1.data)
        setCount(res1.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getDepartmentList()
  }, [getDepartmentList])


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
    }
    if(id === ''){
      departmentServices.addDepartment(params).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getDepartmentList()
      })
    }else{
      departmentServices.updateDepartment(params,id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getDepartmentList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该项？',
      onOk:() => {
        departmentServices.deleteDepartment(id).then(() => {
          message.success('操作成功！')
          getDepartmentList()
        })
      }
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增部门</Button>
        <DepartmentSearch initialValue={params} onSearch={handleSearch}/>
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
      {visible && <DepartmentModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />}
    </>
  )
}

export default Department
