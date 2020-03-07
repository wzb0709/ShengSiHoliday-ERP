import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Row, Table } from 'antd'

import * as addressBookServices from '@/services/addressBook'
import AddressBookSearch, { IAddressBookSearch } from '@/pages/administrative/addressBook/addressBookSearch'

const AddressBook:FC = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])

  //查询的相关参数
  const [params, setParams] = useState<IAddressBookSearch>({ search:'' })


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'name', title: '姓名'},
    { dataIndex: 'department_name', title: '部门'},
    { dataIndex: 'position', title: '职位'},
    { dataIndex: 'phone', title: '联系方式'},
  ]

  //获取表格源数据
  const getAddressBookList = useCallback(() => {
    addressBookServices.getAddressBookList(params.search)
      .then((res1: any) => {
        setDataSource(res1)
      })
  }, [params])
  useEffect(() => {
    getAddressBookList()
  }, [getAddressBookList])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    setParams({ ...values })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <AddressBookSearch initialValue={params} onSearch={handleSearch}/>
      </Row>
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
