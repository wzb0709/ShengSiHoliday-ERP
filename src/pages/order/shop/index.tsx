import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Row, Table, Statistic, Button } from 'antd'
import { Link } from 'umi'
import moment from 'moment'

import * as shopOrderServices from '@/services/order/shopping'
import ShoppingOrderSearch, { IShoppingOrderSearch } from '@/pages/order/shop/shopSearch'
import OrderStatistical from '@/pages/order/statistical'

const ShoppingOrder: FC = (props) => {
  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IShoppingOrderSearch>({
    search: '',
    status: -1,
    start_time:'',
    end_time:'',
  })

  const [visible,setVisible] = useState<boolean>(false)
  const [orderParams,setOrderParams] = useState<any>({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        <div>{recode.order_no}</div>
      </>},
    { dataIndex: '', title: '商品信息' ,render:recode => <>
        <div>{recode.product_title}</div>
        <div>{recode.page_summary}</div>
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
            : recode === 2 ?  <Badge status='processing' text='已发货' />
              : recode === 3 ? <Badge status='success' text='确认收货' />
                : recode === 4 ? <Badge status='success' text='已评价' />
                  :  <Badge status='default' text='已取消' />
        }
      </>},
    { dataIndex: '', title: '下单时间' ,render:recode => <>
        <div>{moment(recode.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
      </>},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/order/shopping/${recode}`}>查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getOrderList = useCallback(() => {
    shopOrderServices.getShoppingOrderList(params.search,params.status,params.start_time,params.end_time,page,size)
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

  const handleView = () => {
    setOrderParams({
      ...params,
      order_type:2,
    })
    setVisible(true)
  }


  return (
    <>
      <Row type='flex' align='middle'>
        <ShoppingOrderSearch initialValue={params} onSearch={handleSearch}/>
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
        <Button onClick={handleView} type='primary' style={{marginTop:-20}} >查看统计信息</Button>
      </div>

      {visible && <OrderStatistical
        params={orderParams}
        visible={visible}
        onCancel={() => setVisible(false)}
      />}
    </>
  )
}

export default ShoppingOrder
