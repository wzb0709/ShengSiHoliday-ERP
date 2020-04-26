import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as settleSalesmanServices from '@/services/settle/salesman'

import SettleInOutModal from '@/pages/money/settle/inOut/inOutModal'
import SettleSalesmanModal from '@/pages/money/settle/salesman/salesmanModal'
import { IMember } from '@/models/login'
import { useSelector } from 'dva'

interface IProps {
  id: string,
  onRefresh:any,
  status:boolean
}

const SalesmanInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})

  const memberList: Array<IMember> = useSelector((state: any) => state.login.memberList)

  const columns: ColumnProps<Object>[] = [
    // @ts-ignore
    { dataIndex: 'salesman_id', title: '业务员' ,render:recode =>memberList.find(item => item.id === recode) ? memberList.find(item => item.id === recode).name : ''},
    { dataIndex: 'total_price', title: '金额' ,render:recode=> <Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' />},
    { dataIndex: 'remark', title: '备注'},
    {
      dataIndex: 'id', title: '操作', render: recode =>props.status  && <Fragment>
        <a onClick={() => handleUpdate(recode)} >编辑</a>
        <Divider type='vertical'/>
        <a onClick={() => handleDelete(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getSalesmanList = useCallback(() => {
    settleSalesmanServices.getSettleSalesmanList(props.id,1,10000).then(res => {
      let salesmanPrice = 0
      res.data.forEach((item:any) => {
        salesmanPrice += item.total_price
      })
      localStorage.setItem('salesmanPrice',salesmanPrice.toString())
      setDataSource(res.data)
    })
  }, [props.id])
  useEffect(() => {
    getSalesmanList()
  }, [getSalesmanList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      settle_id:props.id
    }
    if (id === '') {
      settleSalesmanServices.addSettleSalesman({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getSalesmanList()
        props.onRefresh()
      })
    } else {
      settleSalesmanServices.updateSettleSalesman({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getSalesmanList()
        props.onRefresh()
      })
    }
  }

  const handleAdd = () => {
    setInitialValue({})
    setId('')
    setVisible(true)
  }

  const handleUpdate = (id:string) => {
    const item = dataSource.find((item:any) => item.id === id)
    const params = {
      ...item,
    }
    setInitialValue(params)
    setId(id)
    setVisible(true)
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否需要删除该条?',
      onOk:() => {
        settleSalesmanServices.deleteSettleSalesman(id).then(() => {
          message.success('操作成功!')
          getSalesmanList()
          props.onRefresh()
        })
      }
    })
  }

  return (
    <Card
      title='业务员提成信息'
      style={{marginTop:20}}
      extra={props.status  &&<a onClick={handleAdd}>添加业务员提成</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true}}
        columns={columns}
        rowKey='id'
      />
      <SettleSalesmanModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
        memberList={memberList}
      />
    </Card>
  )
}

export default SalesmanInfo
