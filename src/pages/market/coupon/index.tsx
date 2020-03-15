import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import {  Button, Col, Divider, message, Modal, Rate, Row, Table } from 'antd'
import moment from 'moment'

import * as couponServices from '@/services/coupon'
import CouponSearch, { ICouponSearch } from '@/pages/market/coupon/couponSearch'
import CouponModal from '@/pages/market/coupon/couponModal'

const Coupon:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<ICouponSearch>({
    search:'',
    status:-1,
    source:0,
    type:0,
    start_time:'',
    end_time:'',
  })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'coupon_title', title: '优惠券标题'},
    { dataIndex: 'coupon_type', title: '优惠券类型',render:recode => <>
        {recode === 1 ? <div>立减</div>
          : recode === 2 ? <div>满减</div>
            :  <div>免单</div>}
      </> },
    { dataIndex: 'coupon_moeny', title: '优惠券金额',render:recode => `￥${recode}`},
    { dataIndex: '', title: '优惠券数量',render:recode => `${recode.coupon_take} / ${recode.coupon_count}`},
    { dataIndex: '', title: '使用时间' ,render:recode => <>
      {moment(recode.start_time).format('YYYY-MM-DD')} ~ {moment(recode.end_time).format('YYYY-MM-DD')}
      </> },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '已下架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: '', title: '操作', render: recode => <>
        <Divider type='vertical' />
        <a onClick={() => handleEditModal(recode.id)}>编辑</a>
        <Divider type='vertical' />
        <a onClick={() => handleDelete(recode.id)} style={{color:'red'}} >删除</a>
      </>,
    },
  ]

  //获取表格源数据
  const getCouponList = useCallback(() => {
    couponServices.getCouponList({...params,page,size})
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getCouponList()
  }, [getCouponList])

  const handleChangeStatus = (id:string,status:number) => {
    couponServices.updateCouponStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getCouponList()
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

  const handleAddModal = () => {
    setVisible(true)
    setInitialValue({})
    setId('')
  }

  const handleEditModal = (id:string) => {
    dataSource.forEach(item=>{
      if(item.id === id){
        setId(id)
        setInitialValue(item)
        setVisible(true)
      }
    })
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    if(id === ''){
      couponServices.addCoupon({...params}).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getCouponList()
      })
    }else{
      couponServices.updateCoupon({...params},id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getCouponList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm(({
      title:'提示',
      content:'是否要删除该优惠券？',
      onOk:() => {
        couponServices.deleteCoupon(id).then(()=>{
          message.success('操作成功')
          getCouponList()
        })
      }
    }))
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增优惠券</Button>
        <CouponSearch initialValue={params} onSearch={handleSearch}/>
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
      <CouponModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </>
  );}

export default Coupon;
