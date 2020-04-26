import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Button, Card, Col, Divider, message, Modal, Row, Statistic, Table } from 'antd'
import * as paymentServices from '@/services/order/payment'
import DistributionModal from '@/pages/distribution/list/distributionModal'
import CollectionSearch, { ICollectionSearch } from '@/pages/money/collection/collectionSearch'
import moment from 'moment'
import CollectionModal from '@/pages/money/collection/collectionModal'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import OneDayInfo from '@/component/order/oneDayInfo'
import ShopOrderInfo from '@/component/order/shopInfo'
import PartyOrderInfo from '@/component/order/partyInfo'
import CarOrderInfo from '@/component/order/carInfo'
import ReceptionOrderInfo from '@/component/order/receptionInfo'

const Collection:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<ICollectionSearch>({ status:-1,start_time:'',end_time:'' })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [infoVisible,setInfoVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')
  const [statistical,setStatistical] = useState<any>({})

  const [detailVisible, setDetailVisible] = useState<boolean>(false)

  const [type,setType] = useState<number>(0)

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)


  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单编号',render:recode => <a onClick={() => handleDetail(recode)}>{recode.order_no}</a>},
    { dataIndex: 'payment_money', title: '金额',render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row>},
    { dataIndex: 'pay_type', title: '类型' ,render:recode => <div style={{color:recode === 1 ? '#00cd00' : 'red'}}>{recode === 1 ? '收款' : '退款'}</div> },
    { dataIndex: 'source_title', title: '来源',render:recode => recode === '' ? '-' : recode},
    { dataIndex: 'remark', title: '备注',width:300 ,ellipsis:true},
    { dataIndex: 'create_time', title: '操作时间',render:recode=>moment(recode).format('YYYY-MM-DD HH:mm:ss') },
    { dataIndex: 'status', title: '状态' ,render:recode =>
        recode === 0 ? <Badge status='warning' text='待处理' />
          :recode === 1 ? <Badge status='success' text='审核通过' />
          :<Badge status='error' text='审核拒绝' /> },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleView(recode)}>查看详情</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getPaymentList = useCallback(() => {
    paymentServices.getAudit(1,params.status,params.start_time,params.end_time,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
    paymentServices.getStatistical(1,params.status,params.start_time,params.end_time).then(res=>{
      setStatistical(res)
    })
  }, [page, size, params])
  useEffect(() => {
    getPaymentList()
  }, [getPaymentList])

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

  const handleView = (values:any) => {
    setInitialValue(values)
    setId(values.id)
    setInfoVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      status:2
    }
    paymentServices.judgePayment(params,id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getPaymentList()
    })
  }

  const handleConfirm1 = () => {
    const params = {
      status:1
    }
    paymentServices.judgePayment(params,id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getPaymentList()
    })
  }

  const handleExport = () => {
    window.open(`http://test.allentravel.cn/api/report/expense?search=&status=${params.status}&start_time=${params.start_time}&end_time=${params.end_time}&sourceid=&type=1`)
  }

  const handleDetail = (recode:any) => {
    setDetailVisible(true)
    setType(recode.order_type)
    setId(recode.order_id)
  }

  return (
    <>
      <Row type='flex' align='middle'>
        已确认：<Statistic style={{marginRight:20}} valueStyle={{fontSize:24,color:"#00cd00"}} value={statistical.total_confim_money} precision={2} prefix='￥' />
        待确认：<Statistic valueStyle={{fontSize:24}} value={statistical.wait_confim_money} precision={2} prefix='￥' />
      </Row>
      <Row type='flex' align='middle'>
        <CollectionSearch initialValue={params} onSearch={handleSearch}/>
        <Button onClick={handleExport} type='primary' style={{marginLeft:20,marginBottom:24}}>导出excel</Button>
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
      <Modal
        visible={infoVisible}
        onCancel={() => setInfoVisible(false)}
        footer={null}
        title='收款详情'
        width={800}
      >
        <Card
          extra={<>
            <a onClick={handleConfirm1}>通过</a>
            <Divider type='vertical' />
            <a onClick={() => setVisible(true)} style={{color:'red'}}>拒绝</a>
          </>}
        >
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              订单编号：{initialValue.order_no}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              提交人：{memberList.find(item => item.id === initialValue.create_id)?.name}
            </Col>
            <Col span={12}>
              提交时间：{moment(initialValue.create_time).format('YYYY-MM-DD HH:mm:ss')}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              收款金额：{initialValue.payment_money}
            </Col>
            <Col span={12}>
              收款渠道：{initialValue.source_title}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              收款备注：{initialValue.remark}
            </Col>
          </Row>
        </Card>
      </Modal>
      <CollectionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
      />

      {detailVisible && type === 1 && <OneDayInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 2 && <ShopOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 3 && <PartyOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 4 && <CarOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
      {detailVisible && type === 5 && <ReceptionOrderInfo id={id} visible={detailVisible} onCancel={() => setDetailVisible(false)}/>}
    </>
  );}

export default Collection;
