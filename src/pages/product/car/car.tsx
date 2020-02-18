import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import CarSearch, { ICarSearch } from '@/pages/product/car/carSearch'
import * as carServices from '@/services/car'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import { Link, router } from 'umi'
import { ColumnProps } from 'antd/lib/table'

const Car: FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<ICarSearch>({ site: -1, is_driver: -1, rental_time_type: -1 })

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'advertising_title', title: '车型名称' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/car/${recode}`} >查看详情</Link>
        <Divider type='vertical'/>
        <a style={{ color: 'red' }} onClick={() => handleDelete(recode)}>删除</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getCarList = useCallback(() => {
    carServices.getCarList(params.site, params.is_driver, params.rental_time_type, page, size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getCarList()
  }, [getCarList])

  //变更汽车状态
  const handleChangeStatus = (id: string, status: number) => {
    carServices.updateStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getCarList()
      })
  }

  //删除汽车
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '是否确认删除该项？',
      onOk: () => {
        carServices.deleteCar(id).then(() => {
          message.success('删除成功')
          getCarList()
        })
      },
    })
  }


  //查询按钮点击事件
  const handleSearch = (values: ICarSearch) => {
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }


  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={() => router.push('/car/0')} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增汽车</Button>
        <CarSearch initialValue={params} onSearch={handleSearch}/>
      </Row>
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        scroll={{ y: 510 }}
        bordered={true}
        rowKey='id'
      />
    </>

  )
}

export default Car
