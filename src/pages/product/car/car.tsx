import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import CarSearch, { ICarSearch } from '@/pages/product/car/carSearch'
import * as carServices from '@/services/car'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import { Link, router } from 'umi'
import { ColumnProps } from 'antd/lib/table'
import CarModal from '@/pages/product/car/carModal'
import CarInfoModal from '@/pages/product/car/carInfo'

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
  const [params, setParams] = useState<ICarSearch>({ status:-1,search:''})

  const [visible,setVisible] = useState<boolean>(false)
  const [infoVisible,setInfoVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'car_title', title: '车型名称' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleViewInfo(recode)} >查看详情</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getCarList = useCallback(() => {
    carServices.getCarList(params.search, params.status, page, size)
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



  const handleConfirm = (values:any) => {
    carServices.addCar({...values}).then(res=>{
      message.success('操作成功!')
      setVisible(false)
      getCarList()
    })
  }

  const handleViewInfo = (item:any) => {
    setInitialValue(item)
    setInfoVisible(true)
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
        <Button onClick={() => setVisible(true)} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增汽车</Button>
        <CarSearch initialValue={params} onSearch={handleSearch}/>
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
      <CarInfoModal
        visible={infoVisible}
        basicInfo={initialValue}
        onCancel={() => setInfoVisible(false)}
        onRefresh={getCarList}
      />
      <CarModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={{}}
      />
    </>

  )
}

export default Car
