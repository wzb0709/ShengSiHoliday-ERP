import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Button, message, Row, Statistic, Table } from 'antd'
import { Link } from 'umi'
import axios from 'axios'

import * as settleServices from '@/services/settle/baisc'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import SettleSearch, { ISettleSearch } from '@/pages/money/settle/settleSearch'
import SettleModal from '@/pages/money/settle/settleModal'

const Settle: FC = (props) => {
  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<ISettleSearch>({
    search: '',
    status: -1,
    opid:'',
    settle_date:''
  })
  const [visible,setVisible] = useState<boolean>(false)
  const [statistical,setStatistical] = useState<any>({})

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'settle_no', title: '三清单编号',width:180},
    { dataIndex: 'settle_title', title: '三清单标题'},
    { dataIndex: 'total_revenue', title: '营业收入',render:recode => <Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} />},
    { dataIndex: 'total_cost', title: '营业成本',render:recode => <Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} />},
    { dataIndex: 'total_profit', title: '营业毛利',render:recode => <Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} />},
    { dataIndex: 'profit_rate', title: '毛利率',render:recode => <Statistic suffix='%' valueStyle={{fontSize:16}} value={recode} />},
    // @ts-ignore
    { dataIndex: 'operation_id', width:100,title: '计调' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    { dataIndex: 'status', title: '状态',width:100,render:recode => <div style={{width:100}}>
        {recode === 0 ? <Badge status='warning' text='待提交' />
          : recode === 1 ?  <Badge status='processing' text='已提交' />
            : recode === 2 ?  <Badge status='success' text='审核通过' />
                  :  <Badge status='error' text='审核拒绝' />
        }
      </div>},
    {
      dataIndex: 'id', width:100,title: '操作', render: recode => <div>
        <Link to={`/money/settle/${recode}`}>查看详情</Link>
      </div>,
    },
  ]

  //获取表格源数据
  const getSettleList = useCallback(() => {
    settleServices.getSettleList(params.search,params.status,params.opid,params.settle_date,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getSettleList()
    settleServices.getStatistical(params.search,params.status,params.opid,params.settle_date).then(res=>{
      setStatistical(res)
    })
  }, [getSettleList])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.settle_date) values.settle_date = values.settle_date.format('YYYY-MM')
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleConfirm = (values:any) => {
    settleServices.addSettle({...values}).then(() => {
      message.success('操作成功！')
      setVisible(false)
      getSettleList()
    })
  }

  const handleExport = () => {
    // if(params.settle_date === ''){
    //   message.warning('请选择日期')
    //   return false
    // }
    settleServices.excelExport(params.search,params.status,params.opid,params.settle_date).then((res:any)=>{
      let blob = new Blob([res])
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement("a")
      document.body.appendChild(a)
      let fileName = '三清单报表.xls'
      a.href = url
      a.download = fileName //命名下载名称
      a.click() //点击触发下载
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        总收入：<Statistic style={{marginRight:20}} valueStyle={{fontSize:14}} value={statistical.total_revenue} precision={2} prefix='￥' />
        总成本：<Statistic valueStyle={{fontSize:14,marginRight:20}} value={statistical.total_cost} precision={2} prefix='￥' />
        总毛利：<Statistic valueStyle={{fontSize:14,marginRight:20}} value={statistical.total_profit} precision={2} prefix='￥' />
        毛利率：<Statistic valueStyle={{fontSize:14}} value={statistical.profit_rate} precision={2} suffix='%' />
      </Row>
      <Row type='flex' align='middle'>
        <Button onClick={() => setVisible(true)} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增三清单</Button>
        <SettleSearch memberList={memberList} initialValue={params} onSearch={handleSearch}/>
        <Button onClick={handleExport} type='primary' style={{ marginBottom: 24, marginLeft: 20 }}>导出excel</Button>
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
      <SettleModal
        visible={visible}
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
        initialValue={{}}
      />
    </>
  )
}

export default Settle
