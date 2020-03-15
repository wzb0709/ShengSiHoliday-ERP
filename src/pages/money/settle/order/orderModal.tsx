import React, { FC, useCallback, useEffect, useState } from 'react'
import { message, Modal, Row, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import * as settleServices from '@/services/settle/baisc'
import * as settleOrderServices from '@/services/settle/order'
import moment from 'moment'
import SettleOrderSearch, { ISettleOrderSearch } from '@/pages/money/settle/order/orderSearch'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  readonly onOk:() => void
  readonly id:string
}

const SettleOrderModal:FC<IProps> = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  const [keys,setKeys] = useState<Array<string>>([])

  const [params, setParams] = useState<ISettleOrderSearch>({
    ordertype: 1,
    search:'',
  })

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

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
  ]

  const getSettleOrderList = useCallback(() => {
    settleServices.getWaitSettleOrder(params.ordertype,params.search,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getSettleOrderList()
  }, [getSettleOrderList])

  const handleConfirm = () => {
    if(keys.length === 0){
      message.success('请选择订单')
      return false
    }
    let arr:any = []
    keys.forEach(item=>{
      arr.push({
        order_id:item,
        settle_id:props.id
      })
    })
    settleOrderServices.addSettleOrder(arr,props.id).then(res=>{
      message.success('操作成功！')
      props.onOk()
    })
  }

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setKeys(selectedRowKeys)
    },
  }

  return (
    <>
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        title='添加订单'
        width={1200}
        destroyOnClose={true}
        onOk={handleConfirm}
      >
        <Row type='flex' align='middle'>
          <SettleOrderSearch initialValue={params} onSearch={handleSearch}  />
        </Row>
        <Table
          columns={columns}
          pagination={{ hideOnSinglePage:true,pageSize: size, total: count, current: page, onChange: handlePageChange }}
          rowSelection={rowSelection}
          dataSource={dataSource}
          bordered={true}
          rowKey='id'
        />
      </Modal>
    </>
  )
}

export default SettleOrderModal
