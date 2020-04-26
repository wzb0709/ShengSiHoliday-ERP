import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import * as settleOrderServices from '@/services/settle/order'
import SettleOrderModal from '@/pages/money/settle/order/orderModal'
import moment from 'moment'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import OneDayInfo from '@/component/order/oneDayInfo'
import PartyOrderInfo from '@/component/order/partyInfo'
import ReceptionOrderInfo from '@/component/order/receptionInfo'
import ShopOrderInfo from '@/component/order/shopInfo'
import CarOrderInfo from '@/component/order/carInfo'

interface IProps {
  id: string,
  onRefresh:any,
  status:boolean
}

const SettleOrderInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [detailVisible, setDetailVisible] = useState<boolean>(false)

  const [type,setType] = useState<number>(0)
  const [id,setId] = useState<string>('')


  const [price1,setPrice1] = useState<number>(0)
  const [price2,setPrice2] = useState<number>(0)
  const [price3,setPrice3] = useState<number>(0)

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息' ,render:recode => <>
        <a onClick={() => handleDetail(recode)}>{recode.order_no}</a>
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
      dataIndex: 'id', title: '操作', render: recode => props.status &&<Fragment>
        <a onClick={() => handleDelete(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getOrderList = useCallback(() => {
    settleOrderServices.getSettleOrderList(props.id,1,10000).then(res => {
      let [price1,price2,price3,count] = [0,0,0,0]
      res.data.forEach((item:any) => {
        price1 += item.total_price
        price2 += item.paid
        price3 += item.total_price - item.paid
        count += (item.adult_count + item.child_count)
      })
      localStorage.setItem('count',count.toString())
      setPrice1(price1)
      setPrice2(price2)
      setPrice3(price3)
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

  const handleDetail = (recode:any) => {
    setDetailVisible(true)
    setType(recode.order_type)
    setId(recode.id)
  }

  return (
    <Card
      title='添加订单'
      style={{marginTop:20}}
      extra={props.status && <a onClick={() => setVisible(true)}>添加订单</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true}}
        columns={columns}
        rowKey='id'
        footer={() => <div style={{display:'flex',alignItems:'center'}}>
          应收款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={price1} />
          已收款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={price2} />
          未收款：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={price3} />
        </div>}
      />
      {visible && <SettleOrderModal
        visible={visible}
        onCancel={() => setVisible(false)}
        id={props.id}
        onOk={handleConfirm}
      />}

      {detailVisible && type === 1 && <OneDayInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 2 && <ShopOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 3 && <PartyOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 4 && <CarOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 5 && <ReceptionOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
    </Card>
  )
}

export default SettleOrderInfo
