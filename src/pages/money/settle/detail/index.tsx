import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import * as settleServices from '@/services/settle/baisc'
import * as teamServices from '@/services/teamManager'
import FoodModal from '@/pages/basic/food/foodModal'
import { Card, Col, Divider, message, Modal, Row, Statistic, Table, Tag } from 'antd'
import { Link, router } from 'umi'
import GuideModal from '@/pages/team/guide/guideModal'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import { IMember, IUserInfo } from '@/models/login'
import { useSelector } from 'dva'
import SettleModal from '@/pages/money/settle/settleModal'
import SettleOrderInfo from '@/pages/money/settle/order'
import CostInfo from '@/pages/money/settle/cost'
import InOutInfo from '@/pages/money/settle/inOut'
import SalesmanInfo from '@/pages/money/settle/salesman'
import OtherCostInfo from '@/pages/money/settle/otherCost'
import * as expenseServices from '@/services/expense'


interface IProps {
  match: any
}

interface IBasicInfo {
  id:string
  settle_title: string,
  settle_no: string,
  settle_date: string,
  total_revenue: number,
  total_cost: number,
  total_profit: number,
  profit_rate: number,
  settle_notes: string,
  operation_id: string,
  status:number
}

const SettleDetail:FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      id:'',
      settle_title: '',
      settle_no: '',
      settle_date: '',
      total_revenue: 0,
      total_cost: 0,
      total_profit: 0,
      profit_rate: 0,
      settle_notes: '',
      operation_id: '',
      status:0
    })

  const [visible,setVisible] = useState<boolean>(false)
  const [statusVisible,setStatusVisible] = useState<boolean>(false)
  const [val,setVal] = useState<string>('')
  //获取用户信息
  const userInfo: IUserInfo = useSelector((state: any) => state.login.userInfo)

  let judge = false
  if(userInfo.roleList){
    judge = userInfo.roleList.findIndex(item => item.id === 10) !== -1
  }

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)
  const canEdit = basicInfo.status !== 1 && basicInfo.operation_id === localStorage.getItem('id')

  const getBasicInfo = useCallback(() => {
    settleServices.getSettleInfo(props.match.params.id).then((res: any) => {
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
  }, [getBasicInfo])


  const handleUpdateModal = () => {
    setVisible(true)
  }

  const handleConfirm = (values:any) => {
    const params = {
      ...values,
      settle_date:values.settle_date.format('YYYY-MM-DD')
    }
    settleServices.updateSettle(params,props.match.params.id).then(() => {
      message.success('操作成功!')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该三清单？",
      onOk:() => {
        settleServices.deleteSettle(id).then(() => {
          message.success('删除成功！')
          router.replace('/money/settle')
        })
      }
    })
  }

  const handleChangeStatus = (status:number) => {
    if(status === 1 || status === 3){
      Modal.confirm({
        title:"提示",
        content:"是否要确认该操作？",
        onOk:() => {
          settleServices.updateSettleStatus({
            id:props.match.params.id,
            status,
            status_summary:''
          }).then(() => {
            message.success('操作成功！')
            getBasicInfo()
          })
        }
      })
    }else{
      if(val === ''){
        message.warning('请输入拒绝理由')
        return false
      }
      settleServices.updateSettleStatus({
        id:props.match.params.id,
        status,
        status_summary:val
      }).then(() => {
        message.success('操作成功！')
        getBasicInfo()
      })
    }
  }

  return (
    <>
      <Card
        title='基本信息'
        extra={<>
            {canEdit && <>
              <a onClick={handleUpdateModal} >编辑</a>
              <Divider type='vertical' />
              <a onClick={handleDelete} style={{color:'red'}}>删除</a>
            </>}
          {judge && basicInfo.status === 0 && <>
            <a style={{marginLeft:20}} onClick={() => handleChangeStatus(1)} >通过</a>
            <Divider type='vertical' />
            <a onClick={() => setStatusVisible(true)} style={{color:'red'}}>拒绝</a>
          </>}
          </>}
      >
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            三清单编号：{basicInfo.settle_no}
          </Col>
          <Col span={12}>
            三清单标题：{basicInfo.settle_title}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            结算月份：{moment(basicInfo.settle_date).format('YYYY-MM')}
          </Col>
          <Col span={12}>
            计调：{
            // @ts-ignore
            memberList.find(item => item.id === basicInfo.operation_id) ? memberList.find(item => item.id === basicInfo.operation_id).name : ''
          }
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} style={{display:'flex',alignItems:'center'}}>
            营业收入：{<Statistic prefix='￥' valueStyle={{fontSize:16}} value={basicInfo.total_revenue} />}
          </Col>
          <Col span={12} style={{display:'flex',alignItems:'center'}}>
            营业成本：{<Statistic prefix='￥' valueStyle={{fontSize:16,color:'red'}} value={basicInfo.total_cost} />}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} style={{display:'flex',alignItems:'center'}}>
            毛利：{<Statistic prefix='￥' valueStyle={{fontSize:16}} value={basicInfo.total_profit} />}
          </Col>
          <Col span={12} style={{display:'flex',alignItems:'center'}}>
            毛利率：{<Statistic suffix='%' valueStyle={{fontSize:16}} value={basicInfo.profit_rate} />}
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={24}>
            毛利说明：{basicInfo.settle_notes}
          </Col>
        </Row>
      </Card>

      {basicInfo.id &&
        <>
          <SettleOrderInfo id={basicInfo.id} onRefresh={getBasicInfo} status={canEdit}/>
          <CostInfo id={basicInfo.id} onRefresh={getBasicInfo} status={canEdit}/>
          <InOutInfo id={basicInfo.id} onRefresh={getBasicInfo} status={canEdit}/>
          <SalesmanInfo id={basicInfo.id} onRefresh={getBasicInfo} status={canEdit}/>
          <OtherCostInfo id={basicInfo.id} onRefresh={getBasicInfo} status={canEdit}/>
        </>
      }

      <Card
        title='报表明细'
        style={{marginTop: 20}}
      >
        <Row style={{marginBottom: 20}} type='flex' align="middle">
          <div style={{fontSize: 18, width: '15%'}}>支出信息：</div>
          <div style={{lineHeight: '27px', width: '85%', display: 'flex', alignItems: 'center'}}>
            [成本 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={localStorage.getItem('costPrice') || 0} precision={2}/></span>] +
            [其他成本 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={localStorage.getItem('othPrice') || 0} precision={2}/></span>]
            [业务员提成 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={localStorage.getItem('salesmanPrice') || 0} precision={2}/></span>]
            = <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_cost} precision={2}/></span>元
          </div>
        </Row>
        {/*<Row style={{marginBottom: 20}} type='flex' align="middle">*/}
        {/*  <div style={{fontSize: 18, width: '15%'}}>收入信息：</div>*/}
        {/*  <div style={{lineHeight: '27px', width: '85%', display: 'flex', alignItems: 'center'}}>*/}
        {/*    [其他收入 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.inPrice} precision={2}/></span>] +*/}
        {/*    [订单收入 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_price - basicInfo.inPrice} precision={2}/></span>]*/}
        {/*    = <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_price} precision={2}/></span>元*/}
        {/*  </div>*/}
        {/*</Row>*/}
        <Row style={{marginBottom: 20}} type='flex' align="middle">
          <div style={{fontSize: 18, width: '15%'}}>纯毛利：</div>
          <div style={{lineHeight: '27px', width: '85%', display: 'flex', alignItems: 'center'}}>
            [总收入 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_revenue} precision={2}/></span>] -
            [总成本 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_cost} precision={2}/></span>]
            = <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_revenue - basicInfo.total_cost} precision={2}/></span>元
          </div>
        </Row>
        {localStorage.getItem('count') && localStorage.getItem('count') !== '0' &&<Row style={{marginBottom: 20}} type='flex' align="middle">
          <div style={{fontSize: 18, width: '15%'}}>人均成本：</div>
          <div style={{lineHeight: '27px', width: '85%', display: 'flex', alignItems: 'center'}}>
            [总成本 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_cost} precision={2}/></span>] /
            [人数 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={localStorage.getItem('count')}/></span>]
            = <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={(basicInfo.total_cost / localStorage.getItem('count')).toFixed(2)} precision={2}/></span>元
          </div>
        </Row>}
        <Row style={{marginBottom: 20}} type='flex' align="middle">
          <div style={{fontSize: 18, width: '15%'}}>毛利率：</div>
          <div style={{lineHeight: '27px', width: '85%', display: 'flex', alignItems: 'center'}}>
            [纯毛利 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_profit} precision={2}/></span>]
            / [营业款 <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.total_revenue} precision={2}/></span>]
            = <span style={{color: '#F60'}}><Statistic valueStyle={{fontSize: 18, color: '#f60'}} value={basicInfo.profit_rate} precision={2}/></span>%
          </div>
        </Row>
      </Card>


      <SettleModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={basicInfo}
      />
    </>
  )
}

export default SettleDetail
