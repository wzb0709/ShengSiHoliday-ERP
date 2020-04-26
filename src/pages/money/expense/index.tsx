import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Button, message, Row, Statistic, Table } from 'antd'
import * as expenseServices from '@/services/expense'
import moment from 'moment'
import ExpenseModal from '@/pages/money/expense/expenseModal'
import ExpenseSearch, { IExpenseSearch } from '@/pages/money/expense/expenseSearch'
import { Link } from 'umi'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

const Expense:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IExpenseSearch>({ search:'',status:-1,start_time:'',end_time:'' })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [statistical,setStatistical] = useState<any>({})

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'expense_no', title: '报销编号'},
    // @ts-ignore
    { dataIndex: 'create_id', title: '申请人',render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : '' },
    { dataIndex: 'total_money', title: '报销金额',render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row>},
    { dataIndex: 'create_time', title: '申请时间',render:recode=>moment(recode).format('YYYY-MM-DD HH:mm:ss') },
    { dataIndex: 'status', title: '状态' ,render:recode =>
        recode === 0 ? <Badge status='warning' text='待审核' />
          :recode === 1 ? <Badge status='success' text='审核通过' />
          : recode === 3 ? <Badge status='success' text='已发放' />
            : <Badge status='error' text='审核拒绝' /> },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <Link to={`/money/expense/${recode.id}`}>查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getExpenseList = useCallback(() => {
    expenseServices.getAuditExpenseList(params.search,params.status,params.start_time,params.end_time,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
        expenseServices.getStatistical(2,params.search,params.status,params.start_time,params.end_time).then(res=>{
          setStatistical(res)
        })
      })
  }, [page, size, params])
  useEffect(() => {
    getExpenseList()
  }, [getExpenseList])

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
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      create_id:localStorage.getItem('id')
    }
    expenseServices.addExpense(params).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getExpenseList()
    })
  }

  const handleExport = () => {
    // if(params.start_time === '' || params.end_time === ''){
    //   message.warning('请选择日期')
    //   return false
    // }
    window.open(`http://test.allentravel.cn/api/report/expense?search=${params.search}&status=${params.status}&start_time=${params.start_time}&end_time=${params.end_time}`)

    // expenseServices.excelExport(params.search,params.status,params.start_time,params.end_time)
    //   .then((res:any)=>{
    //     let blob = new Blob([res])
    //     let url = window.URL.createObjectURL(blob)
    //     let a = document.createElement("a")
    //     document.body.appendChild(a)
    //     let fileName = '报销报表.xls'
    //     a.href = url
    //     a.download = fileName //命名下载名称
    //     a.click() //点击触发下载
    //     document.body.removeChild(a)
    //     window.URL.revokeObjectURL(url)
    //   })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        已确认：<Statistic style={{marginRight:20}} valueStyle={{fontSize:24,color:"#00cd00"}} value={statistical.total_confim_money} precision={2} prefix='￥' />
        待确认：<Statistic valueStyle={{fontSize:24}} value={statistical.wait_confim_money} precision={2} prefix='￥' />
      </Row>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增报销</Button>
        <ExpenseSearch initialValue={params} onSearch={handleSearch}/>
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
      <ExpenseModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={{}}
        type={1}
      />
    </>
  );}

export default Expense;
