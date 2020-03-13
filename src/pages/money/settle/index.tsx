import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Badge, Button, message, Row, Statistic, Table } from 'antd'
import { Link } from 'umi'
import moment from 'moment'

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

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'settle_no', title: '三清单编号'},
    { dataIndex: 'settle_title', title: '三清单标题'},
    { dataIndex: 'total_revenue', title: '营业收入',render:recode => <Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} />},
    { dataIndex: 'total_cost', title: '营业成本',render:recode => <Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} />},
    { dataIndex: 'total_profit', title: '营业毛利',render:recode => <Statistic prefix='￥' valueStyle={{fontSize:16}} value={recode} />},
    { dataIndex: '', title: '毛利率',render:recode => <Statistic suffix='%' valueStyle={{fontSize:16}} value={(recode.total_profit / recode.total_cost === 0 ? 1 : recode.total_cost).toFixed(2)} />},
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
  }, [getSettleList])

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.settle_date) values.settle_date = values.settle_date.format('YYYY-MM-DD')
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

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={() => setVisible(true)} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增三清单</Button>
        <SettleSearch memberList={memberList} initialValue={params} onSearch={handleSearch}/>
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
