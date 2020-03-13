import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Row, Statistic, Table } from 'antd'
import { Link } from 'umi'
import * as distributionServices from '@/services/distribution'
import DistributionSearch, { IDistributionSearch } from '@/pages/distribution/list/distributionSearch'
import DistributionModal from '@/pages/distribution/list/distributionModal'

const Distribution:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IDistributionSearch>({ search:'',status:-1,start_time:'',end_time:'' })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'distribution_name', title: '分销商名称'},
    { dataIndex: '', title: '联系人信息',render:recode => <>
        <div>{recode.contact_name}</div>
        <div>{recode.contact_phone}</div>
      </> },
    { dataIndex: 'login_account', title: '账号信息' },
    { dataIndex: 'total_income', title: '累计收益' ,render:recode => <div style={{display:'flex',alignItems:'center'}}><Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} /></div>},
    { dataIndex: 'account_balance', title: '账户余额',render:recode => <div style={{display:'flex',alignItems:'center'}}><Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} /></div> },
    {
      dataIndex: '', title: '状态', render: recode =>
        <Row type='flex'>
          <div>{recode.status === 1 ? '启用' : '关闭'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.status)}>{recode.status === 1 ? '点击关闭' : '点击启用'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/distribution/manager/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getDistributionList = useCallback(() => {
    distributionServices.getDistributionList(params.search,params.status,params.start_time,params.end_time,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getDistributionList()
  }, [getDistributionList])

  const handleChangeStatus = (id:string,status:number) => {
    distributionServices.updateDistributionStatus( id, status === 1 ? 2 : 1 )
      .then(() => {
        message.success('操作成功！')
        getDistributionList()
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
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    distributionServices.addDistributionInfo(params).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getDistributionList()
    })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增分销商</Button>
        <DistributionSearch initialValue={params} onSearch={handleSearch}/>
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

      <DistributionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </>
  );}

export default Distribution;
