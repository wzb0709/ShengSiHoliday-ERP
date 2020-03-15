import React, { FC, useCallback, useEffect, useState } from 'react'
import MemberSearch, { IMemberSearch } from '@/pages/member/memberList/memberSearch'
import { Table } from 'antd'
import * as memberServices from '@/services/member'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

const MemberList: FC = (props) => {

  const columns: ColumnProps<Object>[] = [
    { title: '会员信息', dataIndex: '' ,render:recode => <>
        <div>{recode.nick_name}</div>
        <div>{recode.member_no}</div>
      </>},
    { title: '真实信息',  dataIndex: '' ,render:recode => <>
        <div>{recode.name}</div>
        <div>{recode.phone}</div>
      </> },
    { title: '订单数', dataIndex: 'order_count' },
    { title: '优惠券', dataIndex: 'coupon_count' },
    { title: '评价数', dataIndex: 'eva_count' },
    { title: '创建信息',  dataIndex: '' ,render:recode => <>
        <div>{moment(recode.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>{recode.source_summary}</div>
      </> },
    {
      title: '操作', dataIndex: '', render: recode => <>
        <a>赠送优惠券</a>
      </>,
    },
  ]

  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [params, setParams] = useState<IMemberSearch>({
    search:'',
    start_time:'',
    end_time:'',
  })
  const [count, setCount] = useState<number>(0)
  const [dataSource, setDataSource] = useState([])

  const getMemberList = useCallback(() => {
    memberServices.getMemberList({...params, size, page,sourceid:'' }).then((res: any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [page, size, params])

  useEffect(() => {
    getMemberList()
  }, [getMemberList])

  const handleSearch = (values: any) => {
    if(values.start_time)values.start_time = values.start_time.format('YYYY-MM-DD')
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    setParams({...values})
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }


  return (
    <div>
      <MemberSearch
        params={params}
        onSearch={handleSearch}
      />
      <Table
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
      />
    </div>
  )
}

export default MemberList
