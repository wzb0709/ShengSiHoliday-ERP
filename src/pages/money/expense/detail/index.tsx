import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import * as expenseServices from '@/services/expense'
import { Card, Col, Divider, message, Modal, Row, Statistic, Table, Tag } from 'antd'
import { Link, router } from 'umi'
import GuideModal from '@/pages/team/guide/guideModal'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import ExpenseModal from '@/pages/money/expense/expenseModal'
import * as couponServices from '@/services/coupon'
import ExpenseListModal from '@/pages/money/expense/expenseListModal'


interface IProps {
  match: any
}

const ExpenseDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<any>({})

  const [visible,setVisible] = useState<boolean>(false)
  const [detailVisible,setDetailVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')
  const [list,setList] = useState<any>([])

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const getBasicInfo = useCallback(() => {
    expenseServices.getExpenseInfo(props.match.params.id).then((res: any) => {
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  const getListInfo = useCallback(() => {
    expenseServices.getDetailList(props.match.params.id,1,1000).then((res: any) => {
      setList(res.data)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
    getListInfo()
  }, [getBasicInfo,getListInfo])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'detail_content', title: '报销内容',ellipsis:true},
    { dataIndex: 'expense_money', title: '报销金额',render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row>},
    { dataIndex: 'happen_date', title: '发生时间',render:recode=>moment(recode).format('YYYY-MM-DD') },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleEditList(recode)}>编辑</a>
        <Divider type='vertical' />
        <a onClick={() => handleDeleteList(recode.id)} style={{color:'red'}}>删除</a>
      </Fragment>,
    },
  ]

  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    expenseServices.updateExpense(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该报销？",
      onOk:() => {
        expenseServices.deleteExpense(id).then(() => {
          message.success('删除成功！')
          router.replace('/money/expense')
        })
      }
    })
  }

  const handleAddDetail = () => {
    setId('')
    setDetailVisible(true)
    setInitialValue({})
  }

  const handleEditList = (values:any) => {
    setId(values.id)
    setDetailVisible(true)
    setInitialValue({...values})
  }

  const handleConfirmList = (values:any) => {
    const params = {
      ...values,
      expense_id:props.match.params.id
    }
    if(id === ''){
      expenseServices.addDetailInfo({...params}).then(() => {
        message.success('操作成功!')
        setDetailVisible(false)
        getListInfo()
        getBasicInfo()
      })
    }else{
      expenseServices.updateDetailInfo({...params},id).then(() => {
        message.success('操作成功!')
        setDetailVisible(false)
        getListInfo()
        getBasicInfo()
      })
    }
  }

  const handleDeleteList = (id:string) => {
    Modal.confirm({
      title:"提示",
      content:"是否要删除该报销？",
      onOk:() => {
        expenseServices.deleteDetailInfo(id).then(() => {
          message.success('删除成功！')
          getListInfo()
        })
      }
    })
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <a onClick={handleUpdateModal} >编辑</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除</a>
        </>}
      >
        <Row style={{ marginBottom: 10 }}>
          <Col span={24}>
            报销标题：{basicInfo.expense_title}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            申请人：{
            // @ts-ignore
            memberList.find((item:any) => item.id === basicInfo.create_id) && memberList.find((item:any) => item.id === basicInfo.create_id).name}
          </Col>
          <Col span={12}>
            申请时间：{moment(basicInfo.create_time).format('YYYY-MM-DD HH:mm:ss')}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            <Row type='flex' align='middle'>报销金额：<Statistic valueStyle={{fontSize:14}} value={basicInfo.total_money} precision={2} prefix='￥' /></Row>
          </Col>
        </Row>
      </Card>
      <Card
        title='报销详情'
        style={{marginTop:20}}
        extra={<a onClick={handleAddDetail}>添加详情</a>}
      >
        <Table
          columns={columns}
          pagination={{ hideOnSinglePage:true }}
          dataSource={list}
          bordered={true}
          rowKey='id'
        />
      </Card>
      <ExpenseModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
        type={2}
      />
      <ExpenseListModal
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        onOk={handleConfirmList}
        initialValue={initialValue}
      />
    </>
  )
}

export default ExpenseDetail
