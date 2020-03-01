import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table } from 'antd'

import * as addressBookServices from '@/services/addressBook'

const AddressBook:FC = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'name', title: '姓名'},
    { dataIndex: 'department_name', title: '部门'},
    { dataIndex: 'position', title: '职位'},
    { dataIndex: 'phone', title: '联系方式'},
  ]

  //获取表格源数据
  const getAddressBookList = useCallback(() => {
    addressBookServices.getAddressBookList()
      .then((res1: any) => {
        setDataSource(res1)
      })
  }, [])
  useEffect(() => {
    getAddressBookList()
  }, [getAddressBookList])

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
  )
}

export default AddressBook
