import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Row, Table, Statistic, Button } from 'antd'
import { Link } from 'umi'
import moment from 'moment'

import * as partyOrderServices from '@/services/order/party'
import OneDayOrderSearch, { IOneDayOrderSearch } from '@/pages/order/oneDay/oneDaySearch'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

const PartyOrder: FC = (props) => {
  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IOneDayOrderSearch>({
    search: '',
    status: -1,
    issettle: -1,
    start_time:'',
    end_time:'',
    salesid:'',
    opid:''
  })

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        <div>{recode.order_no}</div>
        <div>{recode.adult_count}成人 {recode.child_count}儿童</div>
      </>},
    { dataIndex: '', title: '产品信息' ,render:recode => <>
        <div>{recode.product_title}</div>
        <div>{moment(recode.travel_date).format('YYYY-MM-DD')}</div>
      </>},
    { dataIndex: '', title: '客户信息' ,render:recode => <>
        <div>{recode.contact_name}</div>
        <div>{recode.contact_phone}</div>
      </>},
    { dataIndex: '', title: '款项' ,render:recode => <>
        <div style={{display:'flex',alignItems:'center'}}>营业款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode.total_price} /></div>
        <div style={{display:'flex',alignItems:'center'}}>已收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'#00CD00'}} value={recode.paid} /></div>
        <div style={{display:'flex',alignItems:'center'}}>未收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={recode.unpaid} /></div>
      </>},
    { dataIndex: 'status', title: '订单状态' ,render:recode => <>
        {recode === 0 ? <Badge status='warning' text='待付款' />
          : recode === 1 ?  <Badge status='processing' text='已付款' />
            : recode === 2 ?  <Badge status='processing' text='已确认' />
              : recode === 3 ? <Badge status='success' text='已出游' />
                : recode === 4 ? <Badge status='success' text='已评价' />
                  :  <Badge status='default' text='已取消' />
        }
      </>},
    // @ts-ignore
    { dataIndex: 'sale_id', title: '销售',render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : '' },
    // @ts-ignore
    { dataIndex: 'operation_id', title: '计调' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/order/party/${recode}`}>查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getOrderList = useCallback(() => {
    partyOrderServices.getPartyOrderList({...params,page,size})
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getOrderList()
  }, [getOrderList])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <OneDayOrderSearch memberList={memberList} initialValue={params} onSearch={handleSearch}/>
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
      <div style={{marginTop:-47}}>
        <Button type='primary' style={{marginTop:-20}} >查看统计信息</Button>
      </div>
    </>
  )
}

export default PartyOrder
