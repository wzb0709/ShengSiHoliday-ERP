import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Button, Divider, message, Modal, Row, Table } from 'antd'
import moment from 'moment'

import * as questionServices from '@/services/question'
import QuestionModal from '@/pages/market/question/questionModal'
import QuestionSearch, { IQuestionSearch } from '@/pages/market/question/questionSearch'

const Question:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<IQuestionSearch>({ search:'',status:-1 })

  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState({})
  const [id,setId] = useState<string>('')


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'question_title', title: '问题标题'},
    {
      dataIndex: '', title: '显示状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上架' : '未上架'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击下架' : '点击上架'}</a>
        </Row>,
    },
    { dataIndex: 'create_time', title: '创建时间',render:recode => moment(recode).format('YYYY-MM-DD')},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleEditModal(recode)} >编辑</a>
        <Divider type='vertical' />
        <a onClick={() => handleDelete(recode)} style={{color:'red'}} >删除</a>
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getQuestionList = useCallback(() => {
    questionServices.getQuestionList(params.search,params.status,page,size)
      .then((res1: any) => {
        setDataSource(res1.data)
        setCount(res1.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getQuestionList()
  }, [getQuestionList])


  const handleChangeStatus = (id:string,status:number) => {
    questionServices.updateQuestionStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getQuestionList()
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

  const handleEditModal = (id:string) => {
    dataSource.forEach((item:any)=>{
      if(item.id === id){
        setId(id)
        setVisible(true)
        setInitialValue(item)
      }
    })
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      question_content:values.question_content.toHTML(),
    }
    if(id === ''){
      questionServices.addQuestion(params).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getQuestionList()
      })
    }else{
      questionServices.updateQuestion(params,id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getQuestionList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否要删除该产品？',
      onOk:() => {
        questionServices.deleteQuestion(id).then(() => {
          message.success('操作成功！')
          getQuestionList()
        })
      }
    })
  }



  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增问题</Button>
        <QuestionSearch initialValue={params} onSearch={handleSearch}/>
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
      {visible && <QuestionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />}
    </>
  )
}

export default Question
