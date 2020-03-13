import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import * as settleServices from '@/services/settle/baisc'
import * as teamServices from '@/services/teamManager'
import FoodModal from '@/pages/basic/food/foodModal'
import { Card, Col, Divider, message, Modal, Row, Statistic, Table, Tag } from 'antd'
import { Link, router } from 'umi'
import GuideModal from '@/pages/team/guide/guideModal'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'
import SettleModal from '@/pages/money/settle/settleModal'
import SettleOrderInfo from '@/pages/money/settle/order'
import CostInfo from '@/pages/money/settle/cost'
import InOutInfo from '@/pages/money/settle/inOut'
import SalesmanInfo from '@/pages/money/settle/salesman'
import OtherCostInfo from '@/pages/money/settle/otherCost'


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
    })

  const [visible,setVisible] = useState<boolean>(false)

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

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
          <SettleOrderInfo id={basicInfo.id} onRefresh={getBasicInfo}/>
          <CostInfo id={basicInfo.id} onRefresh={getBasicInfo}/>
          <InOutInfo id={basicInfo.id} onRefresh={getBasicInfo}/>
          <SalesmanInfo id={basicInfo.id} onRefresh={getBasicInfo}/>
          <OtherCostInfo id={basicInfo.id} onRefresh={getBasicInfo}/>
        </>
      }


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
