import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Col, Divider, message, Modal, Row, Statistic, Table, Tag } from 'antd'
import { Link, router } from 'umi'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import DistributionModal from '@/pages/distribution/list/distributionModal'
import * as distributionServices from '@/services/distribution'
import * as couponServices from '@/services/coupon'
import CardModal from '@/pages/distribution/list/detail/cardModal'


interface IProps {
  match: any
}

interface IBasicInfo {
  distribution_name: string,
  contact_name: string,
  contact_phone: string,
  login_account: string,
  total_income: number,
  account_balance: number,
}

const DistributionDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      distribution_name: '',
      contact_name: '',
      contact_phone: '',
      login_account: '',
      total_income: 0,
      account_balance: 0,
    })

  const [visible,setVisible] = useState<boolean>(false)
  const [cardVisible,setCardVisible] = useState<boolean>(false)
  const [card,setCard] = useState<any>([])
  const [initialValue,setInitialValue] = useState<any>({})
  const [id,setId] = useState<string>('')


  const getBasicInfo = useCallback(() => {
    distributionServices.getDistributionInfo(props.match.params.id).then((res: any) => {
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  const getCardList = useCallback(() => {
    distributionServices.getCardList(props.match.params.id).then((res: any) => {
      setCard(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
    getCardList()
  }, [getBasicInfo,getCardList])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'card_number', title: '银行卡号' },
    { dataIndex: 'card_account', title: '账户名' },
    { dataIndex: 'card_bank', title: '开户行' },
    { dataIndex: 'create_time', title: '创建时间',render:recode => <>
        <div>{moment(recode).format('YYYY-MM-DD HH:mm:ss')}</div>
      </> },
    {
      dataIndex: '', title: '操作', render: recode => <>
        <Divider type='vertical' />
        <a onClick={() => handleUpdateCard(recode.id)}>编辑</a>
        <Divider type='vertical' />
        <a onClick={() => handleDeleteCard(recode.id)} style={{color:'red'}} >删除</a>
      </>,
    },
  ]

  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
    }
    distributionServices.updateDistributionInfo(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该条数据？",
      onOk:() => {
        distributionServices.deleteDistributionInfo(id).then(() => {
          message.success('删除成功！')
          router.replace('/distribution/manager')
        })
      }
    })
  }


  const handleAddCard = () => {
    setInitialValue({})
    setId('')
    setCardVisible(true)
  }

  const handleUpdateCard = (id:string) => {
    card.forEach((item:any)=>{
      if(item.id === id){
        setId(id)
        setInitialValue(item)
        setVisible(true)
      }
    })
  }

  const handleConfirmCard = (values:any) => {
    const params = {
      ...values,
    }
    if(id === ''){
      distributionServices.addCardInfo({...params}).then(() => {
        message.success('操作成功!')
        setCardVisible(false)
        getCardList()
      })
    }else{
      distributionServices.updateCardInfo({...params},id).then(() => {
        message.success('操作成功!')
        setCardVisible(false)
        getCardList()
      })
    }
  }

  const handleDeleteCard = (id:string) => {
    Modal.confirm({
      title:"提示",
      content:"是否要删除该条数据？",
      onOk:() => {
        distributionServices.deleteCardInfo(id).then(() => {
          message.success('删除成功！')
          getCardList()
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
            分销商名称：{basicInfo.distribution_name}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            联系人姓名：{basicInfo.contact_name}
          </Col>
          <Col span={12}>
            联系方式：{basicInfo.contact_phone}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={24}>
            账号信息：{basicInfo.login_account}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            <div style={{display:'flex',alignItems:'center'}}>累计收益：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={basicInfo.total_income} /></div>
          </Col>
          <Col span={12}>
            <div style={{display:'flex',alignItems:'center'}}>账户余额：<Statistic prefix='￥' valueStyle={{fontSize:16}} value={basicInfo.account_balance} /></div>
          </Col>
        </Row>
      </Card>
      <Card
        title='银行卡信息'
        style={{marginTop:20}}
        extra={<a onClick={handleAddCard}>添加银行卡</a>}
      >
        <Table
          columns={columns}
          pagination={{ hideOnSinglePage:true }}
          dataSource={card}
          bordered={true}
          rowKey='id'
        />
      </Card>
      <DistributionModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
      <CardModal
        visible={cardVisible}
        onCancel={() => setCardVisible(false)}
        onOk={handleConfirmCard}
        initialValue={initialValue}
      />
    </>
  )
}

export default DistributionDetail
