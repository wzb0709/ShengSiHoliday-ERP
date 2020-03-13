import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Row, Table } from 'antd'
import { Link } from 'umi'


import * as receptionServices from '@/services/reception'
import PartyModal from '@/pages/product/party/partyModal'
import ReceptionSearch, { IReceptionSearch } from '@/pages/product/reception/receptionSearch'
import ReceptionModal from '@/pages/product/reception/receptionModal'
import { getAllList, getOpList } from '@/utils/common'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

const Reception:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IReceptionSearch>({ search:'',op_id:'' })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'product_no', title: '产品编号' },
    { dataIndex: 'product_title', title: '产品标题' },
    { dataIndex: 'order_count', title: '订单' ,width:100,render:recode => <div style={{width:100,color:'#00CD00'}}>{recode}</div> },
    {
      dataIndex: 'op_id',
      title: '计调' ,
      // @ts-ignore
      render: recode => memberList.find((item: any) => item.id === recode) ? memberList.find((item: any) => item.id === recode).name : '无对应计调',
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/product/reception/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getReceptionList = useCallback(() => {
    receptionServices.getReception(params.search,params.op_id,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getReceptionList()
  }, [getReceptionList])


  //查询按钮点击事件
  const handleSearch = (values: IReceptionSearch) => {
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
      create_id:localStorage.getItem('id')
    }
    receptionServices.addReception(params).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getReceptionList()
    })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增一团一议</Button>
        <ReceptionSearch opList={memberList} initialValue={params} onSearch={handleSearch}/>
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
      <ReceptionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </>
  );}

export default Reception;
