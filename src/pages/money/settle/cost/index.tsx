import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as settleCostServices from '@/services/settle/cost'
import * as proServices from '@/services/onDay'
import OrderOtherPackageModal from '@/pages/order/otherPackageInfo/otherPackageModal'
import SettleCostModal from '@/pages/money/settle/cost/costModal'

interface IProps {
  id: string,
  onRefresh:any,
}

const CostInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'cost_title', title: '成本标题' },
    { dataIndex: 'cost_count', title: '数量'},
    { dataIndex: 'cost_price', title: '单价' ,render:recode=> <Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' />},
    { dataIndex: 'total_price', title: '总价' ,render:recode=> <Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' />},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleUpdate(recode)} >编辑</a>
        <Divider type='vertical'/>
        <a onClick={() => handleDelete(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getCostList = useCallback(() => {
    settleCostServices.getSettleCostList(props.id,1,10000).then(res => {
      setDataSource(res.data)
    })
  }, [props.id])
  useEffect(() => {
    getCostList()
  }, [getCostList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      settle_id:props.id
    }
    if (id === '') {
      settleCostServices.addSettleCost({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getCostList()
        props.onRefresh()
      })
    } else {
      settleCostServices.updateSettleCost({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getCostList()
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
      content:'是否需要删除该成本?',
      onOk:() => {
        settleCostServices.deleteSettleCost(id).then(() => {
          message.success('操作成功!')
          getCostList()
          props.onRefresh()
        })
      }
    })
  }

  return (
    <Card
      title='成本信息'
      style={{marginTop:20}}
      extra={<a onClick={handleAdd}>添加成本信息</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true}}
        columns={columns}
        rowKey='id'
      />
      <SettleCostModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default CostInfo
