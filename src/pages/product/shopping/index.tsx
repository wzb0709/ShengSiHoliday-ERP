import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Modal, Row, Table } from 'antd'
import { Link } from 'umi'
import * as shoppingServices from '@/services/shopping'
import ShoppingSearch, { IShoppingSearch } from '@/pages/product/shopping/shoppingSearch'
import ShoppingForm from '@/pages/product/shopping/shoppingForm'

const Shopping:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IShoppingSearch>({ search:'',status:-1 })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue] = useState({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'product_no', title: '产品编号' },
    { dataIndex: 'product_title', title: '产品标题' },
    { dataIndex: 'package_count', title: '套餐' },
    { dataIndex: 'eval_count', title: '评价' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/product/shopping/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getShoppingList = useCallback(() => {
    shoppingServices.getShoppingList(params.search,params.status,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getShoppingList()
  }, [getShoppingList])

  const handleChangeStatus = (id: string, status: number) => {
    shoppingServices.updateShoppingStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getShoppingList()
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

  const childRef = useRef();

  const handleConfirm = () => {
    // changeVal就是子组件暴露给父组件的方法
    // @ts-ignore
    childRef.current.validateFields((err,values)=>{
      if(!err){
        const params = {
          ...values,
          shop_pics:JSON.stringify(values.shop_pics),
          shop_tags:JSON.stringify(values.shop_tags),
          create_id:localStorage.getItem('id')
        }
        shoppingServices.addShopping({...params}).then(()=>{
          message.success('操作成功！')
          getShoppingList()
          setVisible(false)
        })
      }
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={() => setVisible(true)} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增当地购物</Button>
        <ShoppingSearch initialValue={params} onSearch={handleSearch}/>
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
        title='新增当地购物'
        onOk={handleConfirm}
      >
        <ShoppingForm
          initialValue={initialValue}
          // @ts-ignore
          ref={childRef}
        />
      </Modal>
    </>
  );}

export default Shopping;
