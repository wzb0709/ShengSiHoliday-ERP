import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Row, Table } from 'antd'
import { Link } from 'umi'

import * as foodServices from '@/services/food'
import FoodModal from '@/pages/basic/food/foodModal'
import FoodSearch, { IFoodSearch } from '@/pages/basic/food/foodSearch'

const Food:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IFoodSearch>({ search:'',status:-1 })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'food_title', title: '美食名称' },
    { dataIndex: '', title: '营业信息' ,render:recode=><>
        <div>{recode.food_time}</div>
        <div style={{marginTop:10}}>{recode.food_address}</div>
      </>},
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/basic/food/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getFoodList = useCallback(() => {
    foodServices.getFoodList(params.search,params.status,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getFoodList()
  }, [getFoodList])

  const handleChangeStatus = (id:string,status:number) => {
    foodServices.updateFoodStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getFoodList()
      })
  }

  //查询按钮点击事件
  const handleSearch = (values: IFoodSearch) => {
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
      food_pics:JSON.stringify(values.food_pics),
      food_phones:JSON.stringify(values.food_phones)
    }
    foodServices.addFood(params).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getFoodList()
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增美食</Button>
        <FoodSearch initialValue={params} onSearch={handleSearch}/>
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
      <FoodModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </>
  )
}

export default Food
