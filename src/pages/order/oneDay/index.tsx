import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Row, Table, Statistic, Button } from 'antd'
import { Link } from 'umi'
import moment from 'moment'

import * as OneDayOrderServices from '@/services/order/oneDay'
import * as pointServices from '@/services/point'
import OneDayOrderSearch, { IOneDayOrderSearch } from '@/pages/order/oneDay/oneDaySearch'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import OrderStatistical from '@/pages/order/statistical'

const OneDayOrder: FC = (props) => {
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
    opid:'',
    car_point_id:'',
  })

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)
  const [carList,setCarList] = useState<any>([])

  const [visible,setVisible] = useState<boolean>(false)
  const [orderParams,setOrderParams] = useState<any>({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        <div>{recode.order_no}</div>
        <div>{recode.adult_count}成人 {recode.child_count}儿童</div>
      </>},
    { dataIndex: '', title: '产品信息' ,render:recode => <>
        <div>{recode.product_title}</div>
        <div>{moment(recode.travel_date).format('YYYY-MM-DD')}</div>
      </>},
    { dataIndex: 'car_point_id', title: '上车点',render:recode=>carList.find((item:any) => item.id === recode) ? carList.find((item:any) => item.id === recode).point_title : '' },
    { dataIndex: '', title: '客户信息' ,render:recode => <>
        <div>{recode.contact_name}</div>
        <div>{recode.contact_phone}</div>
      </>},
    { dataIndex: '', title: '款项' ,render:recode => <>
        <div style={{display:'flex',alignItems:'center'}}>营业款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode.total_price} /></div>
        <div style={{display:'flex',alignItems:'center'}}>已收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'#00CD00'}} value={recode.paid} /></div>
        <div style={{display:'flex',alignItems:'center'}}>未收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={recode.unpaid} /></div>
      </>},
    { dataIndex: 'status', title: '订单状态',width:100,render:recode => <div style={{width:100}}>
        {recode === 0 ? <Badge status='warning' text='待付款' />
          : recode === 1 ?  <Badge status='processing' text='已付款' />
            : recode === 2 ?  <Badge status='processing' text='已确认' />
              : recode === 3 ? <Badge status='success' text='已评价' />
                  :  <Badge status='default' text='已取消' />
        }
      </div>},
    // @ts-ignore
    { dataIndex: 'sale_id',width:100, title: '销售',render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : '' },
    // @ts-ignore
    { dataIndex: 'operation_id', width:100,title: '计调' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    {
      dataIndex: 'id', width:100,title: '操作', render: recode => <div>
        <Link to={`/order/oneDay/${recode}`}>查看详情</Link>
      </div>,
    },
  ]

  //获取表格源数据
  const getOrderList = useCallback(() => {
    OneDayOrderServices.getOneDayOrderList({...params,page,size})
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getOrderList()
    pointServices.getPointList().then(res=>{
      setCarList(res)
    })
  }, [getOrderList])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.start_time)values.start_time = values.start_time.format('YYYY-MM-DD')
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleView = () => {
    setOrderParams({
      ...params,
      order_type:1,
    })
    setVisible(true)
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <OneDayOrderSearch carList={carList} memberList={memberList} initialValue={params} onSearch={handleSearch}/>
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
        <Button type='primary' style={{marginTop:-20}} onClick={handleView} >查看统计信息</Button>
      </div>

      {visible && <OrderStatistical
        params={orderParams}
        visible={visible}
        onCancel={() => setVisible(false)}
      />}
    </>
  )
}

export default OneDayOrder
