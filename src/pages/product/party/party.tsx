import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Row, Table } from 'antd'
import { Link } from 'umi'
import * as partyServices from '@/services/party'
import PartySearch, { IPartySearch } from '@/pages/product/party/partySearch'
import PartyModal from '@/pages/product/party/partyModal'
import { getAllList, getOpList } from '@/utils/common'

const Party:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IPartySearch>({ search:'',status:-1,opid:'' })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})

  const [saleList, setSaleList] = useState<any>([])
  const [opList, setOpList] = useState<any>([])



  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'product_no', title: '产品编号' },
    { dataIndex: 'product_title', title: '产品标题' },
    { dataIndex: 'eval_count', title: '评价数' },
    { dataIndex: 'order_count', title: '订单数' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: 'op_id',
      title: '计调',
      render: recode => saleList.find((item: any) => item.id === recode) ? saleList.find((item: any) => item.id === recode).name : '无对应计调',
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/product/party/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getPartyList = useCallback(() => {
    partyServices.getCustomerList(params.search,params.status,params.opid,page,size)
      .then((res: any) => {
        getAllList().then(res1 => {
          setSaleList(res1)
          setDataSource(res.data)
          setCount(res.count)
        })
      })
  }, [page, size, params])
  useEffect(() => {
    getPartyList()
    getOpList().then(res=>{
      setOpList(res)
    })
  }, [getPartyList])

  const handleChangeStatus = (id:string,status:number) => {
    partyServices.updateCustomerStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getPartyList()
      })
  }

  //查询按钮点击事件
  const handleSearch = (values: IPartySearch) => {
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
      travel_pics:JSON.stringify(values.travel_pics),
      travel_tags:JSON.stringify(values.travel_tags),
      create_id:localStorage.getItem('id')
    }
    partyServices.addCustomer(params).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getPartyList()
    })
  }

 return (
  <>
    <Row type='flex' align='middle'>
      <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增定制游</Button>
      <PartySearch opList={opList} initialValue={params} onSearch={handleSearch}/>
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
    <PartyModal
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={handleConfirm}
      initialValue={initialValue}
    />
  </>
 );}

export default Party;
