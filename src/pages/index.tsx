import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Row, Col, Card, Statistic, Modal } from 'antd'
import moment from 'moment'

import * as homeServices from '@/services/home'
import Table, { ColumnProps } from 'antd/lib/table'
import { Link } from 'umi'

const HomePage = () => {

  const [todo,setTodo] = useState<any>([])
  const [unpaid,setUnpaid] = useState<number>(0)
  const [showList,setShowList] = useState<any>([])
  const [page,setPage] = useState<number>(1)
  const [size] = useState<number>(1000)
  const [visible,setVisible] = useState<boolean>(false)
  const [dataSource,setDataSource] = useState<any>([])
  const [detailVisible,setDetailVisible] = useState<boolean>(false)
  const [detail,setDetail] = useState<any>({})

  const getTodo = useCallback(() => {
    homeServices.getTodo(localStorage.getItem('id')).then(res=>{
      setTodo(res)
    })
  },[localStorage.getItem('id')])

  const getUnpaid = useCallback(() => {
    homeServices.getUnPaid(localStorage.getItem('id')).then((res:any)=>{
      setUnpaid(res)
    })
  },[localStorage.getItem('id')])

  const getShowList = useCallback(() => {
    homeServices.showNotice(1,3).then(res=>{
      setShowList(res.data)
    })
  },[])
  useEffect(() =>{
    getTodo()
  },[getTodo])
  useEffect(() =>{
    getUnpaid()
  },[getUnpaid])
  useEffect(() =>{
    getShowList()
  },[getShowList])


  const handleViewMore = () => {
    homeServices.showNotice(page,size).then(res=>{
      setDataSource(res.data)
      setVisible(true)
    })
  }

  const handleViewDetail = (values:any) => {
    setDetail(values)
    setDetailVisible(true)
  }

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'notice_title', title: '产品标题' },
    { dataIndex: 'create_time', title: '发布时间',render:recode => moment(recode).format('YYYY-MM-DD HH:mm:ss') },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleViewDetail(recode)} >查看详情</a>
      </Fragment>,
    },
  ]




  return (
    <>
      <Row>
        <Col span={8}>
          <Card
            style={{width:'95%'}}
          >
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',height:100}} >
              <div style={{fontSize:18}}>我的待办事项</div>
              {todo.length === 0 && <div style={{fontSize:22,fontWeight:'bold',marginTop:20}}>暂无待办事项</div>}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{width:'95%',height:150}}
          >
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',height:100}} >
              <div style={{fontSize:18}}>未收款</div>
              {unpaid >= 0 && <Statistic style={{marginTop:20}} value={unpaid} valueStyle={{fontSize:28,color:'red',fontWeight:'bold'}} prefix='￥' />}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{width:'95%'}}
          >
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',height:100}} >
              <Row type='flex' align='middle' justify='space-between' style={{fontSize:18}}>
                <div>公告</div>
                {showList.length !== 0 && <a style={{fontSize:15}} onClick={handleViewMore} >查看更多>></a>}
              </Row>
                {showList.map((item:any,index:number)=>{
                  return(
                    <Row key={index} type='flex' align='middle' style={{marginTop:20}} >
                      <div style={{width:'75%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                        {item.notice_title}
                      </div>
                      <div style={{width:'25%'}}>
                        {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </Row>
                  )
                })}
              {showList.length === 0 && <div style={{fontSize:22,fontWeight:'bold',marginTop:20}} >
                暂无公告
              </div>}
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title='公告列表'
        visible={visible}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        width={1200}
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey='id'
          bordered={true}
        />
      </Modal>

      <Modal
        title='公告详情'
        visible={detailVisible}
        destroyOnClose={true}
        width={800}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <div style={{fontSize:18}}>{detail.notice_title}</div>
        <div style={{fontSize:15,color:'#aaa',marginTop:10}}>发布时间{moment(detail.create_time).format('YYYY-MM-DD')}</div>
        <div style={{fontSize:16,color:'#aaa',marginTop:10}}>>
          {detail.notice_content}
        </div>
      </Modal>
    </>
  );
}

export default HomePage
