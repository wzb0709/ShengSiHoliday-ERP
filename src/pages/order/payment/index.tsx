import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Table,Badge, Row, Statistic } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

import * as paymentServices from '@/services/order/payment'
import PaymentModal from '@/pages/order/payment/paymentModal'

interface IProps {
  id: string,
}

const PaymentInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [count, setCount] = useState<number>(0)
  const [source,setSource] = useState<any>([])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'payment_money', title: '金额',render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row>},
    { dataIndex: 'pay_type', title: '类型' ,render:recode => <div  style={{color:recode === 1 ? '#00cd00' : 'red'}}>{recode === 1 ? '收款' : '退款'}</div> },
    { dataIndex: 'source_title', title: '来源',render:recode => recode === '' ? '-' : recode},
    { dataIndex: 'remark', title: '备注',width:300 },
    { dataIndex: 'create_time', title: '操作时间',render:recode=>moment(recode).format('YYYY-MM-DD HH:mm:ss') },
    { dataIndex: 'status', title: '状态' ,render:recode =>
        recode === 0 ? <Badge status='warning' text='待处理' />
        :recode === 1 ? <Badge status='success' text='审核通过' />
        :<Badge status='error' text='审核拒绝' /> },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        {recode.status === 0 && <>
          <a onClick={() => handleUpdate(recode.id)} >编辑</a>
          <Divider type='vertical'/>
          <a onClick={() => handleDelete(recode.id)} style={{ color: 'red' }}>删除</a>
        </>}
        {recode.status === 2 && <a>查看理由</a>}
      </Fragment>,
    },
  ]

  const getPaymentList = useCallback(() => {
    paymentServices.getPaymentList(props.id,page,size).then((res:any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [props.id])
  useEffect(() => {
    getPaymentList()
    paymentServices.getPaymentSource().then(res=>{
      setSource(res)
    })
  }, [getPaymentList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      order_id:props.id,
      create_id:localStorage.getItem('id')
    }
    if (id === '') {
      paymentServices.addPayment({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPaymentList()
      })
    } else {
      paymentServices.updatePayment({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPaymentList()
      })
    }
  }

  const handleAdd = () => {
    setInitialValue({})
    setId('')
    setVisible(true)
  }

  const handleUpdate = (id:string) => {
    const item = dataSource.find((item:any) => item.id === id)
    const params = {
      ...item,
    }
    setInitialValue(params)
    setId(id)
    setVisible(true)
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否需要删除该条信息?',
      onOk:() => {
        paymentServices.deletePayment(id).then(() => {
          message.success('操作成功!')
          getPaymentList()
        })
      }
    })
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <Card
      title='收退款信息'
      style={{marginTop:20}}
      extra={
        <>
          <a onClick={handleAdd}>添加收退款</a>
        </>
      }
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange,hideOnSinglePage:true }}
        columns={columns}
        rowKey='id'
      />
      <PaymentModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
        source={source}
      />
    </Card>
  )
}

export default PaymentInfo
