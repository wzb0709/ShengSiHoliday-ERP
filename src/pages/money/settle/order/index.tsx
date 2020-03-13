import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import * as settleOrderServices from '@/services/settle/order'
import SettleOrderModal from '@/pages/money/settle/order/orderModal'
import moment from 'moment'

interface IProps {
  id: string,
  onRefresh:any
}

const SettleOrderInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        <div>{recode.order_no}</div>
        <div>{recode.contact_name}</div>
      </>},
    { dataIndex: '', title: '产品信息' ,render:recode => <>
        <div>{recode.product_title}</div>
      </>},
    { dataIndex: '', title: '出游时间' ,render:recode => <>
        <div>{moment(recode.travel_date).format('YYYY-MM-DD')}</div>
      </>},
    { dataIndex: '', title: '人数' ,render:recode => <>
        <div>{recode.adult_count + recode.child_count}</div>
      </>},
    { dataIndex: '', title: '款项' ,render:recode => <>
        <div style={{display:'flex',alignItems:'center'}}>营业款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode.total_price} /></div>
        <div style={{display:'flex',alignItems:'center'}}>已收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'#00CD00'}} value={recode.paid} /></div>
        <div style={{display:'flex',alignItems:'center'}}>未收款：<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={recode.unpaid} /></div>
      </>},
    // @ts-ignore
    { dataIndex: 'sale_id',width:100, title: '销售',render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : '' },
    // @ts-ignore
    { dataIndex: 'operation_id', width:100,title: '计调' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleDelete(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getOrderList = useCallback(() => {
    settleOrderServices.getSettleOrderList(props.id,1,10000).then(res => {
      setDataSource(res.data)
    })
  }, [props.id])
  useEffect(() => {
    getOrderList()
  }, [getOrderList])

  const handleConfirm = () => {
    setVisible(false)
    getOrderList()
    props.onRefresh()
  }


  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否需要删除该订单?',
      onOk:() => {
        settleOrderServices.deleteSettleOrder(id).then(() => {
          message.success('操作成功!')
          getOrderList()
          props.onRefresh()
        })
      }
    })
  }

  return (
    <Card
      title='添加订单'
      style={{marginTop:20}}
      extra={<a onClick={() => setVisible(true)}>添加订单</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true}}
        columns={columns}
        rowKey='id'
        footer={() => <div style={{display:'flex',alignItems:'center'}}>
          应收款：￥   已收款：￥800.00 未收款：￥100.00
        </div>}
      />
      {visible && <SettleOrderModal
        visible={visible}
        onCancel={() => setVisible(false)}
        id={props.id}
        onOk={handleConfirm}
      />}
    </Card>
  )
}

export default SettleOrderInfo
