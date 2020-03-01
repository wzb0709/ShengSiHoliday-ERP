import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import {Link} from 'umi'
import * as adLocationServices from '@/services/adLocation'

import AdLocationSearch, { IAdLocationSearch } from '@/pages/market/ad/adLocationSearch'
import { ColumnProps } from 'antd/lib/table'
import AdLocationModal from '@/pages/market/ad/addLocationModal'

function AdLocation(props: FC) {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size, setSize] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IAdLocationSearch>({ status: -1, search: '' })
  //更新表格信息时的每列ID
  const [id, setId] = useState<string>('')
  //控制表格更新模态框
  const [visible, setVisible] = useState<boolean>(false)
  //控制模态框数据
  const [modalData,setModalData] = useState<any>({})

  //获取表格源数据
  const getAdLocationList = useCallback(() => {
    adLocationServices.getAdvertisingLocationList({
      page,
      status: params.status,
      search: params.search,
      size,
    })
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])

  useEffect(() => {
    getAdLocationList()
  }, [getAdLocationList])

  //table列数据
  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'advertising_title', title: '广告位标题' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/market/ad/${recode}`} >查看详情</Link>
        <Divider type='vertical'/>
        <a onClick={() => handleOpenUpdateModal(recode)}>编辑</a>
        <Divider type='vertical'/>
        <a style={{ color: 'red' }} onClick={() => handleDelete(recode)}>删除</a>
      </Fragment>,
    },
  ]

  //变更广告位状态
  const handleChangeStatus = (id: string, status: number) => {
    adLocationServices.updateAdvertisingLocationStatus({ id, status: status === 1 ? 0 : 1 })
      .then(() => {
        message.success('操作成功！')
        getAdLocationList()
      })
  }

  const handleOpenUpdateModal = (id: string) => {
    setVisible(true)
    setId(id)
    const data = dataSource.find(item => item.id === id)
    setModalData(data)
  }

  //更新广告位
  const handleUpdate = (values: any) => {
    if(id === ''){
      adLocationServices.addAdvertisingLocation({ advertising_title: values.advertising_title })
        .then(() => {
          message.success('操作成功！')
          getAdLocationList()
          setVisible(false)
        })
    }else{
      adLocationServices.updateAdvertisingLocation({ advertising_title: values.advertising_title, id })
        .then(() => {
          message.success('操作成功！')
          getAdLocationList()
          setVisible(false)
        })
    }
  }

  const handleOpenAddModal = () => {
    setVisible(true)
    setId('')
    setModalData({})
  }

  //删除广告位
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '是否确认删除该项？',
      onOk: () => {
        adLocationServices.deleteAdvertisingLocation({ id }).then(() => {
          message.success('删除成功')
          getAdLocationList()
        })
      },
    })
  }

  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  //查询按钮点击事件
  const handleSearch = (values:IAdLocationSearch) => {
    console.log(values)
    setParams({...values})
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleOpenAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增广告位</Button>
        <AdLocationSearch initialValue={params} onSearch={handleSearch} />
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
      <AdLocationModal
        visible={visible}
        onOk={handleUpdate}
        onCancel={() => setVisible(false)}
        initialValue={modalData}
      />
    </>
  )
}

export default AdLocation
