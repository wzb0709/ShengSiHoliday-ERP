import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, message, Row, Table } from 'antd'
import { Link } from 'umi'
import * as guideServices from '@/services/guide'
import GuideSearch, { IGuideSearch } from '@/pages/team/guide/guideSearch'
import GuideModal from '@/pages/team/guide/guideModal'

const Guide:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IGuideSearch>({ search:'',status:-1,type:0 })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'tour_name', title: '导游姓名'},
    {
      dataIndex: '', title: '导游类型', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '自有' : '外借'}</div>
        </Row>,
    },
    { dataIndex: 'tour_phone', title: '联系方式' },
    { dataIndex: 'tour_start', title: '星级' },
    {
      dataIndex: '', title: '状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '显示' : '隐藏'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击隐藏' : '点击显示'}</a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <Link to={`/team/guide/${recode}`} >查看详情</Link>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getGuideList = useCallback(() => {
    guideServices.getGuideList(params.search,params.status,params.type,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getGuideList()
  }, [getGuideList])

  const handleChangeStatus = (id:string,status:number) => {
    guideServices.updateGuideStatus( id, status === 1 ? 2 : 1 )
      .then(() => {
        message.success('操作成功！')
        getGuideList()
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

  const handleAddModal = () => {
    setVisible(true)
    setInitialValue({})
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    guideServices.addGuide(params).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getGuideList()
    })
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增导游</Button>
        <GuideSearch initialValue={params} onSearch={handleSearch}/>
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
      <GuideModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </>
  );}

export default Guide;
