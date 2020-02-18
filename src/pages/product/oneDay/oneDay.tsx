import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import OneDaySearch, { IOneDaySearch } from '@/pages/product/oneDay/oneDaySearch'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Modal, Row, Table } from 'antd'
import { Link, router } from 'umi'
import * as oneDayServices from '@/services/onDay'
import OneDayForm from '@/pages/product/oneDay/oneDayForm'

const OneDay:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IOneDaySearch>({ search:'',status:-1 })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'product_title', title: '产品标题' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.status === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.status)}>{recode.status === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/product/oneDay/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getOneDayList = useCallback(() => {
    oneDayServices.getOneDayList(params.search,params.status,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getOneDayList()
  }, [getOneDayList])

  const handleChangeStatus = (id: string, status: number) => {
    oneDayServices.updateOneDayStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getOneDayList()
      })
  }

  //查询按钮点击事件
  const handleSearch = (values: IOneDaySearch) => {
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const childRef = useRef();

  const handleConfirm = () => {
      // changeVal就是子组件暴露给父组件的方法
    // @ts-ignore
    childRef.current.validateFields((err,values)=>{
      if(!err){
       const params = {
         ...values,
         product_img:JSON.stringify(values.product_img),
         product_tag:JSON.stringify(values.product_tag),
         create_id:localStorage.getItem('id')
       }
        oneDayServices.addOneDay({...params}).then(()=>{
          message.success('操作成功！')
          getOneDayList()
          setVisible(false)
        })
      }
    })
  }



  return (
  <>
    <Row type='flex' align='middle'>
      <Button onClick={() => setVisible(true)} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增一日游</Button>
      <OneDaySearch initialValue={params} onSearch={handleSearch}/>
    </Row>
    <Table
      columns={columns}
      pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
      dataSource={dataSource}
      scroll={{ y: 510 }}
      bordered={true}
      rowKey='id'
    />
    <Modal
      visible={visible}
      width={1200}
      destroyOnClose={true}
      onCancel={() => setVisible(false)}
      title='新增一日游'
      onOk={handleConfirm}
    >
      <OneDayForm
        initialValue={initialValue}
        // @ts-ignore
        ref={childRef}
      />
    </Modal>
  </>
 );}

export default OneDay;
