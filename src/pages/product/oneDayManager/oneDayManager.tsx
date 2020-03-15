import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { message, Row, Table } from 'antd'
import { Link } from 'umi'
import moment from 'moment'

import * as planServices from '@/services/oneDayManager'
import OneDayManagerSearch, { IOneDayManagerSearch } from '@/pages/product/oneDayManager/oneDayManagerSearch'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

const OneDayManager: FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IOneDayManagerSearch>({ search: '', status: -1, start_time: '', end_time: '', op_id: '' })

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'product_title', title: '产品标题' ,width:300},
    { dataIndex: 'start_date', title: '发团时间',width:150, render:recode => <>{moment(recode).format('YYYY-MM-DD')}</>},
    { dataIndex: 'package_count', title: '套餐数',width:100,render:recode => <div style={{width:100,color:'#1890FF'}}>{recode}</div>},
    { dataIndex: 'plan_count', title: '计划数',width:100,render:recode => <div style={{width:100,color:'#1890FF'}}>{recode}</div>},
    { dataIndex: 'order_count', title: '订单' ,width:100,render:recode => <div style={{width:100,color:'#1890FF'}}>{recode}</div>},
    { dataIndex: 'take_count', title: '已收',width:100,render:recode => <div style={{width:100,color:'#00CD00'}}>{recode}</div> },
    {
      dataIndex: 'op_id',
      title: '计调' ,
      width: 150,
      // @ts-ignore
      render: recode => memberList.find((item: any) => item.id === recode) ? memberList.find((item: any) => item.id === recode).name : '无对应计调',
    },
    {
      dataIndex: '', title: '上架状态',width:150, render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{ marginLeft: 10 }} onClick={() => handleChangeStatus(recode.product_date_id, recode.is_show)}>
            {recode.is_show === 1 ? '点击下架' : '点击上架'}
          </a>
        </Row>,
    },
    {
      dataIndex: 'product_date_id', title: '操作',width:100, render: recode => <Fragment>
        <Link to={`/product/oneDayManager/${recode}`}>查看详情</Link>
      </Fragment>,
    },
  ]

  const getPlanList = useCallback(() => {
    planServices.getPlanList(params.search,params.status,params.start_time,params.end_time,params.op_id,page,size).then((res:any)=>{
      setDataSource(res.data)
      setCount(res.count)
    })
  },[page,size,params])
  useEffect(() => {
    getPlanList()
  },[getPlanList])

  const handleChangeStatus = (id: string, status: number) => {
    planServices.updatePlanStatus(id,status === 1 ? 0 : 1).then(() => {
      message.success('操作成功！')
      getPlanList()
    })
  }

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


  return (
    <>
      <Row type='flex' align='middle'>
        <OneDayManagerSearch opList={memberList} initialValue={params} onSearch={handleSearch}/>
      </Row>
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='product_date_id'
      />
    </>
  )
}

export default OneDayManager
