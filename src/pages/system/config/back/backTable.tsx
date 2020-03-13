import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import * as configServices from '@/services/config'
import BackModal from '@/pages/system/config/back/backModal'

const BackTable:FC = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [visible, setVisible] = useState<boolean>(false)

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'remain_time', title: '出游剩余时间',render:recode => `≤${recode}小时`},
    { dataIndex: 'refund_ratio', title: '退款比例',render:recode => `${recode}%`},
    {
      dataIndex: '', title: '操作', render: recode => <>
          <a onClick={() => handleUpdate(recode.id)} >编辑</a>
          <Divider type='vertical'/>
          <a onClick={() => handleDelete(recode.id)} style={{ color: 'red' }}>删除</a>
        </>
    },
  ]

  const getBackList = useCallback(() => {
    configServices.getBack().then((res:any) => {
      setDataSource(res)
    })
  }, [])
  useEffect(() => {
    getBackList()
  }, [getBackList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
    }
    if (id === '') {
      configServices.addBack({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getBackList()
      })
    } else {
      configServices.updateBack({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getBackList()
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
      content:'是否需要删除该规则?',
      onOk:() => {
        configServices.deleteBack(id).then(() => {
          message.success('操作成功!')
          getBackList()
        })
      }
    })
  }



  return (
    <Card
      title='退款规则'
      extra={<a onClick={handleAdd}>添加规则</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true }}
        columns={columns}
        rowKey='id'
      />

      <BackModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default BackTable
