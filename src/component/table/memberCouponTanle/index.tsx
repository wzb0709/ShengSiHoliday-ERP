import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import {  Button, Col, Divider, message, Modal, Rate, Row, Table } from 'antd'
import moment from 'moment'

import * as couponServices from '@/services/coupon'
import CouponSearch, { ICouponSearch } from '@/pages/market/coupon/couponSearch'

interface IProps {
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  memberId:string
}

const MemberCouponTable:FC<IProps> = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params] = useState<any>({
    memberid:props.memberId,
    source:0,
  })

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'coupon_no', title: '优惠券编号'},
    { dataIndex: 'coupon_title', title: '优惠券标题'},
    { dataIndex: 'coupon_type', title: '优惠券类型',render:recode => <>
        {recode === 1 ? <div>立减</div>
          : recode === 2 ? <div>满减</div>
            :  <div>免单</div>}
      </> },
    {
      dataIndex: '', title: '是否已使用', render: recode =>
        <Row type='flex'>
          <div>{recode.is_use === 0 ? '否' : '是'}</div>
        </Row>,
    },
    { dataIndex: 'coupon_money', title: '优惠券金额',render:recode => `￥${recode}`},
    { dataIndex: '', title: '使用时间' ,render:recode => <>
        {moment(recode.start_time).format('YYYY-MM-DD')} ~ {moment(recode.end_time).format('YYYY-MM-DD')}
      </> },
  ]

  //获取表格源数据
  const getCouponList = useCallback(() => {
    couponServices.getMemberList({...params,page,size})
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getCouponList()
  }, [getCouponList])


  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }


  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='优惠券列表'
      width={1200}
      destroyOnClose={true}
      footer={null}
    >
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        // @ts-ignore
        bordered={true}
        rowKey='id'
      />

    </Modal>
  );}

export default MemberCouponTable;
