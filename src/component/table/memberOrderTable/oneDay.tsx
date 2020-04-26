import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge,Table, Statistic,Modal } from 'antd'
import moment from 'moment'

import * as memberServices from '@/services/member'
import * as pointServices from '@/services/point'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

interface IProps {
  memberId:string
}

const OneDayTable: FC<IProps> = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)
  const [carList,setCarList] = useState<any>([])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,width:180,render:recode => <>
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
  ]

  //获取表格源数据
  const getOrderList = useCallback(() => {
    memberServices.getOneDay(props.memberId)
      .then((res: any) => {
        setDataSource(res.data)
      })
  }, [])

  useEffect(() => {
    getOrderList()
    pointServices.getPointList().then(res=>{
      setCarList(res)
    })
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

export default OneDayTable
