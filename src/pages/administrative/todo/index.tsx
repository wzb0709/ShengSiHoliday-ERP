import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import {  Table } from 'antd'
import * as homeServices from '@/services/home'

const Todo:FC = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])


  const columns: ColumnProps<Object>[] = [
  { dataIndex: '', title: '内容',
    render:recode=><div style={{color:recode.type === 1 ? 'red' : ''}}>{`${recode.type === 1 ? '[紧急]' : ''}${recode.title}`}</div>
  },
  { dataIndex: 'count', title: '数量'},
  ]

  //获取表格源数据
  const getList = useCallback(() => {
    homeServices.getTodo()
      .then((res: any) => {
        setDataSource(res)
      })
  }, [])
  useEffect(() => {
    getList()
  }, [getList])


  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='id'
      />
    </>
  );}

export default Todo;
