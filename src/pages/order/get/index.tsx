import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { message, Table } from 'antd'
import moment from 'moment'

import * as OneDayOrderServices from '@/services/order/oneDay'
import { router } from 'umi'

const GetOrder: FC = (props) => {
  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        {recode.is_timeout && <div style={{padding:'5px 10px',color:'#FFF',background:"#FF6600",borderRadius:5,marginBottom:5,display:"inline-block"}}>已超过15分钟</div>}
        <div>{recode.order_no}</div>
      </>},
    { dataIndex: '', title: '产品信息' ,render:recode => <>
        <div>{recode.product_title}</div>
        <div>{moment(recode.travel_date).format('YYYY-MM-DD')}</div>
      </>},
    { dataIndex: '', title: '客户信息' ,render:recode => <>
        <div>{recode.contact_name}</div>
        <div>{recode.contact_phone}</div>
      </>},
    { dataIndex: 'create_time', title: '下单时间' ,render:recode => <>
        <div>{moment(recode).format('YYYY-MM-DD HH:mm:ss')}</div>
      </>},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleGetOrder(recode)} >认领订单</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getOrderList = useCallback(() => {
    OneDayOrderServices.getWaitOrderList(page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size])
  useEffect(() => {
    getOrderList()
  }, [getOrderList])

  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleGetOrder = (id:string) => {
    OneDayOrderServices.getWaitOrder(id).then(res=>{
      message.success('认领成功！')
      router.push('/order/oneDay')
    })
  }

  return (
    <>
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='id'
      />
    </>
  )
}

export default GetOrder
