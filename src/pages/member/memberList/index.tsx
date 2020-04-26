import React, { FC, useCallback, useEffect, useState } from 'react'
import MemberSearch, { IMemberSearch } from '@/pages/member/memberList/memberSearch'
import { message, Table } from 'antd'
import * as memberServices from '@/services/member'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import * as couponServices from '@/services/coupon'
import MemberModal from '@/pages/member/memberList/memberModal'
import OrderTable from '@/component/table/orderTable'
import MemberCouponTable from '@/component/table/memberCouponTanle'
import MemberCommentTable from '@/component/table/memberEvalutionTable'
import MemberOrder from '@/component/table/memberOrderTable'

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
    { title: '订单数', dataIndex: '' ,render:recode => <a onClick={() => handleOrder(recode.id)}>{recode.order_count}</a> },
    { title: '优惠券', dataIndex: '' ,render:recode => <a onClick={() => handleCoupon(recode.id)}>{recode.coupon_count}</a>},
    { title: '评价数', dataIndex: '' ,render:recode => <a onClick={() => handleComment(recode.id)}>{recode.eva_count}</a>},
    { title: '创建信息',  dataIndex: '' ,render:recode => <>
        <div>{moment(recode.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
        <div>{recode.source_summary}</div>
      </> },
    {
      title: '操作', dataIndex: 'id', render: recode => <>
        <a onClick={() => handleSend(recode)}>赠送优惠券</a>
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
  const [couponList,setCouponList] = useState<any>([])
  const [visible,setVisible] = useState<boolean>(false)
  const [orderVisible,setOrderVisible] = useState<boolean>(false)
  const [couponVisible,setCouponVisible] = useState<boolean>(false)
  const [commentVisible,setCommentVisible] = useState<boolean>(false)
  const [id,setId] = useState<string>('')

  const getMemberList = useCallback(() => {
    memberServices.getMemberList({...params, size, page,sourceid:'' }).then((res: any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [page, size, params])

  useEffect(() => {
    getMemberList()
    couponServices.getAllCouponList().then(res=>{
      setCouponList(res)
    })
  }, [getMemberList])

  const handleSearch = (values: any) => {
    if(values.start_time)values.start_time = values.start_time.format('YYYY-MM-DD')
    if(values.end_time)values.end_time = values.end_time.format('YYYY-MM-DD')
    setParams({...values})
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleSend = (id:string) => {
    setId(id)
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    memberServices.send(id,values.couponid).then(() => {
      message.success('操作成功！')
      setVisible(false)
      getMemberList()
    })
  }

  const handleOrder = (id:string) => {
    setId(id)
    setOrderVisible(true)
  }

  const handleComment = (id:string) => {
    setId(id)
    setCommentVisible(true)
  }
  const handleCoupon = (id:string) => {
    setId(id)
    setCouponVisible(true)
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
      <MemberModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        couponList={couponList}
      />
      {orderVisible && <MemberOrder visible={orderVisible} onCancel={() => setOrderVisible(false)} memberId={id}/>}
      {commentVisible && <MemberCommentTable visible={commentVisible} onCancel={() => setCommentVisible(false)} memberId={id}/>}
      {couponVisible && <MemberCouponTable visible={couponVisible} onCancel={() => setCouponVisible(false)} memberId={id}/>}
    </div>
  )
}

export default MemberList
