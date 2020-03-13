import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Table, Upload, Button, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

import * as feeServices from '@/services/order/fee'
import FeeModal from '@/pages/order/feeInfo/feeModal'

interface IProps {
  id: string,
}

const FeeInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [count, setCount] = useState<number>(0)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '金额',render:recode=><div style={{color:recode.fee_type === 1 ? '#00cd00' : 'red'}}>{recode.fee_type === 1 ? `+${recode.fee_price}` : '-${recode.fee_price}'}</div>},
    { dataIndex: 'fee_summary', title: '备注' },
    { dataIndex: 'create_time', title: '操作时间',render:recode=>moment(recode).format('YYYY-MM-DD HH:mm:ss') },
    {
      dataIndex: '', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleUpdate(recode.id)} >编辑</a>
        <Divider type='vertical'/>
        <a onClick={() => handleDelete(recode.id)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getFeeList = useCallback(() => {
    feeServices.getFeeList(props.id,page,size).then((res:any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [props.id])
  useEffect(() => {
    getFeeList()
  }, [getFeeList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      order_id:props.id,
      create_id:localStorage.getItem('id')
    }
    if (id === '') {
      feeServices.addFee({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getFeeList()
      })
    } else {
      feeServices.updateFee({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getFeeList()
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
      content:'是否需要删除该费用?',
      onOk:() => {
        feeServices.deleteFee(id).then(() => {
          message.success('操作成功!')
          getFeeList()
        })
      }
    })
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <Card
      title='费用信息'
      style={{marginTop:20}}
      extra={
        <>
          <a onClick={handleAdd}>添加费用</a>
        </>
      }
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange,hideOnSinglePage:true }}
        columns={columns}
        rowKey='id'
      />
      <FeeModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default FeeInfo
