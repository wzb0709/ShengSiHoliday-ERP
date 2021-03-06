import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge,Table, Statistic,Modal } from 'antd'
import moment from 'moment'

import * as memberServices from '@/services/member'
import * as pointServices from '@/services/point'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import { Link } from 'umi'

interface IProps {
  memberId:string
}

const CarTable: FC<IProps> = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        <div>{recode.order_no}</div>
      </>},
    { dataIndex: '', title: '租赁信息' ,render:recode => <>
        <div>{recode.product_title}</div>
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
            : recode === 3 ?  <Badge status='processing' text='已确认' />
              : recode === 4 ?  <Badge status='processing' text='已提车' />
                : recode === 5 ? <Badge status='processing' text='已还车' />
                  : recode === 6 ? <Badge status='success' text='订单完成' />
                    :  <Badge status='default' text='已取消' />
        }
      </>},
  ]

  //获取表格源数据
  const getOrderList = useCallback(() => {
    memberServices.getCar(props.memberId)
      .then((res: any) => {
        setDataSource(res.data)
      })
  }, [])

  useEffect(() => {
    getOrderList()
  }, [getOrderList])



  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      // @ts-ignore
      bordered={true}
      rowKey='id'
    />
  )
}

export default CarTable
