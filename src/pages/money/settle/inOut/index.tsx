import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as settleInOutServices from '@/services/settle/inOut'

import SettleInOutModal from '@/pages/money/settle/inOut/inOutModal'

interface IProps {
  id: string,
  onRefresh:any,
}

const InOutInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'title', title: '标题' },
    { dataIndex: 'type', title: '类型',render:recode => recode === 1 ? '收入' : '支出'},
    { dataIndex: 'total_price', title: '金额' ,render:recode=> <Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' />},
    { dataIndex: 'remark', title: '备注'},
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleUpdate(recode)} >编辑</a>
        <Divider type='vertical'/>
        <a onClick={() => handleDelete(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getInOutList = useCallback(() => {
    settleInOutServices.getSettleInOutList(props.id,1,10000).then(res => {
      setDataSource(res.data)
    })
  }, [props.id])
  useEffect(() => {
    getInOutList()
  }, [getInOutList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      settle_id:props.id
    }
    if (id === '') {
      settleInOutServices.addSettleInOut({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getInOutList()
        props.onRefresh()
      })
    } else {
      settleInOutServices.updateSettleInOut({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getInOutList()
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
        settleInOutServices.deleteSettleInOut(id).then(() => {
          message.success('操作成功!')
          getInOutList()
          props.onRefresh()
        })
      }
    })
  }

  return (
    <Card
      title='收入/支出信息'
      style={{marginTop:20}}
      extra={<a onClick={handleAdd}>添加收入/支出信息</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true}}
        columns={columns}
        rowKey='id'
      />
      <SettleInOutModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default InOutInfo
