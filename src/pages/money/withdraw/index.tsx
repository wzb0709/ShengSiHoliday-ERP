import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Button, Card, Col, Divider, message, Modal, Row, Statistic, Table } from 'antd'
import * as withdrawServices from '@/services/withdraw'
import moment from 'moment'
import WithdrawSearch, { IWithdrawSearch } from '@/pages/money/withdraw/withdrawSearch'

const Withdraw:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IWithdrawSearch>({ search:'',status:-1,start_time:'',end_time:'' })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [infoVisible,setInfoVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')
  const [statistical,setStatistical] = useState<any>({})


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'distribution_name', title: '申请人'},
    { dataIndex: '', title: '提现账户',render:recode => <>
        <div>{recode.card_account}</div>
        <div>{recode.card_number}</div>
        <div>{recode.card_bank}</div>
      </>},
    { dataIndex: 'withdrawal_money', title: '金额',render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row>},
    { dataIndex: 'create_time', title: '申请时间',render:recode=>moment(recode).format('YYYY-MM-DD HH:mm:ss') },
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
  const getWithdrawList = useCallback(() => {
    withdrawServices.getWithdrawList(params.search,params.status,params.start_time,params.end_time,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
    withdrawServices.getStatistical(params.search,params.status,params.start_time,params.end_time).then(res=>{
      setStatistical(res)
    })
  }, [page, size, params])
  useEffect(() => {
    getWithdrawList()
  }, [getWithdrawList])

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
  }

  // const handleConfirm = (values:any) => {
  //   const params = {
  //     ...values,
  //     status:2
  //   }
  //   paymentServices.judgePayment(params,id,1).then(() => {
  //     message.success('操作成功!')
  //     setVisible(false)
  //     getPaymentList()
  //   })
  // }

  const handleConfirm1 = (type:number) => {
    Modal.confirm({
      title:"提示",
      content:'是否确认执行操作？',
      onOk:() => {
        withdrawServices.updateWithdrawStatus(id,type).then(() => {
          message.success('操作成功!')
          setVisible(false)
          getWithdrawList()
        })
      }
    })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        已确认：<Statistic style={{marginRight:20}} valueStyle={{fontSize:24,color:"#00cd00"}} value={statistical.total_confim_money} precision={2} prefix='￥' />
        待确认：<Statistic valueStyle={{fontSize:24}} value={statistical.wait_confim_money} precision={2} prefix='￥' />
      </Row>
      <Row type='flex' align='middle'>
        <WithdrawSearch initialValue={params} onSearch={handleSearch}/>
        <Button type='primary' style={{marginLeft:20,marginBottom:24}}>导出excel</Button>
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
        title='提现详情'
      >
        <Card
          title='基本信息'
          extra={<>
            <a onClick={() => handleConfirm1(1)}>通过</a>
            {/*<a onClick={() => setVisible(true)} style={{marginRight:20,color:'red'}}>拒绝</a>*/}
            <a onClick={() => handleConfirm1(2)} style={{marginRight:20,color:'red'}}>拒绝</a>
          </>}
        >
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              分销商：{initialValue.distribution_name}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              申请人：{initialValue.create_id}
            </Col>
            <Col span={12}>
              申请时间：{moment(initialValue.create_time).format('YYYY-MM-DD HH:mm:ss')}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              提现金额：{initialValue.withdrawal_money}
            </Col>
          </Row>
        </Card>
        <Card
          title='提现账户'
        >
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              账户名：{initialValue.card_account}
            </Col>
            <Col span={12}>
              开户行：{initialValue.card_bank}
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              银行卡号：{initialValue.card_number}
            </Col>
          </Row>
        </Card>
      </Modal>
      {/*<CollectionModal*/}
      {/*  visible={visible}*/}
      {/*  onCancel={() => setVisible(false)}*/}
      {/*  onOk={handleConfirm}*/}
      {/*/>*/}
    </>
  );}

export default Withdraw;
