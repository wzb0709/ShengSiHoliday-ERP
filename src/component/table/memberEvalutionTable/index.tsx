import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Avatar, Button, Col, Divider, message, Modal, Rate, Row, Table } from 'antd'
import moment from 'moment'

import * as commentServices from '@/services/evaluation'

interface IProps {
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  memberId:string
}

const MemberCommentTable:FC<IProps> = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  //查询的相关参数
  const [params] = useState<any>({
    search:'',
    status:-1,
    is_virtual:-1,
    content_type:0,
    start_time:'',
    end_time:'',
    memberid:props.memberId
  })
  const [initialValue,setInitialValue] = useState<any>({})
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
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handlePreview(recode)}>查看详情</a>
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

  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePreview = (values:any) => {
    setInitialValue(values)
    setContentVisible(true)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='评价列表'
      width={1200}
      destroyOnClose={true}
      footer={null}
    >
      <Table
        columns={columns}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange }}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='id'
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
    </Modal>
  );}

export default MemberCommentTable;
