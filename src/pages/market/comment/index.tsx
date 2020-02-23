import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Avatar, Button, Col, Divider, message, Modal, Rate, Row, Table } from 'antd'
import moment from 'moment'

import CommentSearch, { ICommentSearch } from '@/pages/market/comment/commentSearch'
import * as commentServices from '@/services/evaluation'
import CommentModal from '@/pages/market/comment/commentModal'

const Comment:FC = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params, setParams] = useState<ICommentSearch>({
    search:'',
    status:-1,
    is_virtual:-1,
    content_type:0,
    start_time:'',
    end_time:'',
  })
  //控制模态框
  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')
  const [contentVisible,setContentVisible] = useState<boolean>(false)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '会员信息',render:recode => <>
        <div>{recode.member_no}</div>
        <div>{recode.nick_name}</div>
      </> },
    { dataIndex: 'is_virtual', title: '评价类型' ,render:recode => <>
        {recode === 1 ? <div>虚拟</div> : <div>真实</div>}
      </> },
    { dataIndex: 'content_type', title: '对象类型' ,render:recode => <>
        {recode === 1 ? <div>一日游</div> :
          recode === 2 ? <div>当地购物</div> :
            <div>定制游</div>
        }
      </> },
    { dataIndex: 'score', title: '评分' },
    {
      dataIndex: '', title: '显示状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已显示' : '已隐藏'}</div>
          <a style={{marginLeft:10}} onClick={() => handleChangeStatus(recode.id, recode.is_show)}>{recode.is_show === 1 ? '点击隐藏' : '点击显示'}</a>
        </Row>,
    },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handlePreview(recode)}>查看详情</a>
        {recode.is_virtual === 1 && <>
          <Divider type='vertical' />
          <a onClick={() => handleEditModal(recode.id)}>编辑</a>
          <Divider type='vertical' />
          <a onClick={() => handleDelete(recode.id)} style={{color:'red'}} >删除</a>
        </>}
      </Fragment>,
    },
  ]

  //获取表格源数据
  const getCommentList = useCallback(() => {
    commentServices.getEvaluationList({...params,page,size,id:''})
      .then((res: any) => {
        res.data.forEach((item:any)=>{
          item.evaluation_imgs = JSON.parse(item.evaluation_imgs)
        })
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getCommentList()
  }, [getCommentList])

  const handleChangeStatus = (id:string,status:number) => {
    commentServices.updateEvaluationStatus( id, status === 1 ? 0 : 1 )
      .then(() => {
        message.success('操作成功！')
        getCommentList()
      })
  }

  //查询按钮点击事件
  const handleSearch = (values: ICommentSearch) => {
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleAddModal = () => {
    setVisible(true)
    setInitialValue({})
    setId('')
  }

  const handleEditModal = (id:string) => {
    dataSource.forEach(item=>{
      if(item.id === id){
        setId(id)
        setInitialValue(item)
        setVisible(true)
      }
    })
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      evaluation_imgs:JSON.stringify(values.evaluation_imgs)
    }
    if(id === ''){
      commentServices.addEvaluation({...params}).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getCommentList()
      })
    }else{
      commentServices.updateEvaluation({...params},id).then(() => {
        message.success('操作成功!')
        setVisible(false)
        getCommentList()
      })
    }
  }

  const handleDelete = (id:string) => {
    Modal.confirm(({
      title:'提示',
      content:'是否要删除该评论？',
      onOk:() => {
        commentServices.deleteEvaluation(id).then(()=>{
          message.success('操作成功')
          getCommentList()
        })
      }
    }))
  }
  const handlePreview = (values:any) => {
    setInitialValue(values)
    setContentVisible(true)
  }

  return (
    <>
      <Row type='flex' align='middle'>
        <Button onClick={handleAddModal} type='primary' style={{ marginBottom: 24, marginRight: 20 }}>新增虚拟评价</Button>
        <CommentSearch initialValue={params} onSearch={handleSearch}/>
      </Row>
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        scroll={{ y: 510 }}
        bordered={true}
        rowKey='id'
      />
      <CommentModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
      <Modal
        title='评价详情'
        visible={contentVisible}
        destroyOnClose={true}
        onCancel={() => setContentVisible(false)}
        footer={null}
      >
        <Row>
          <Col span={5}>
            <Avatar src={initialValue.head_img} size={64} />
          </Col>
          <Col span={18}>
            <Row type='flex' justify='space-between'>
              <div>{initialValue.content_title}</div>
              <div>{moment(initialValue.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
            </Row>
            <Row>
              评分：
              <Rate disabled={true} defaultValue={initialValue.score} />
            </Row>
            <Row>
              {initialValue.evaluation_content}
            </Row>
            {initialValue.evaluation_imgs && <Row type='flex'>
              {initialValue.evaluation_imgs.map((item:string,index:number)=>{
                return item !== '' && (
                  <Col key={index} span={8}>
                    <img src={item} alt="" style={{width:'90%',objectFit:'cover'}} />
                  </Col>
                )
              })}
            </Row>}
          </Col>
        </Row>
      </Modal>
    </>
  );}

export default Comment;
