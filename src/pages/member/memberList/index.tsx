import React, { FC, useCallback, useEffect, useState } from 'react'
import MemberSearch from '@/pages/member/memberList/memberSearch'
import { Divider, message, Modal, Radio, Table } from 'antd'
import * as memberServices from '@/services/member'
import { ColumnProps } from 'antd/lib/table'

const MemberList: FC = (props) => {

  const columns: ColumnProps<Object>[] = [
    { title: '昵称', dataIndex: 'nick_name' },
    { title: '姓名', dataIndex: 'name' },
    { title: '电话', dataIndex: 'phone' },
    {
      title: '操作', dataIndex: '', render: recode => <>
        <a>赠送优惠券</a>
      </>,
    },
  ]

  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [dataSource, setDataSource] = useState([])

  const getMemberList = useCallback(() => {
    memberServices.getMemberList({search, size, page }).then((res: any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [page, size, search])

  useEffect(() => {
    getMemberList()
  }, [getMemberList])

  const handleSearch = (values: any) => {
    setPage(1)
    setSearch(values.search)
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <div>
      <MemberSearch
        params={{ search }}
        onSearch={handleSearch}
      />
      <Table
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        scroll={{ y: 510 }}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
      />
    </div>
  )
}

export default MemberList
