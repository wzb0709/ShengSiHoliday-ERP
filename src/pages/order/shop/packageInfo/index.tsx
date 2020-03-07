import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as shopOrderServices from '@/services/order/shopping'
import * as shopServices from '@/services/shopping'
import OrderOtherPackageModal from '@/pages/order/otherPackageInfo/otherPackageModal'

interface IProps {
  id: string,
  pro_id:string,
}

const ShoppingPackageInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [packageList,setPackageList] = useState<any>([])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'count', title: '套餐数量'},
    { dataIndex: 'price', title: '套餐价格' },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleUpdatePackage(recode)} >编辑</a>
        <Divider type='vertical'/>
        <a onClick={() => handleDeletePackage(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ]

  const getPackageList = useCallback(() => {
    shopOrderServices.getPackageList(props.id).then(res => {
      setDataSource(res)
    })
  }, [props.id])
  useEffect(() => {
    getPackageList()
    shopServices.getShoppingPackage(props.pro_id).then(res=>{
      setPackageList(res)
    })
  }, [getPackageList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      order_id:props.id
    }
    if (id === '') {
      shopOrderServices.addPackage({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    } else {
      shopOrderServices.updatePackage({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    }
  }

  const handleAddPackage = () => {
    setInitialValue({})
    setId('')
    setVisible(true)
  }

  const handleUpdatePackage = (id:string) => {
    const item = dataSource.find((item:any) => item.id === id)
    const params = {
      ...item,
    }
    setInitialValue(params)
    setId(id)
    setVisible(true)
  }

  const handleDeletePackage = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否需要删除该套餐?',
      onOk:() => {
        shopOrderServices.deletePackage(id).then(() => {
          message.success('操作成功!')
          getPackageList()
        })
      }
    })
  }

  return (
    <Card
      title='套餐信息'
      style={{marginTop:20}}
      extra={<a onClick={handleAddPackage}>添加套餐</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{hideOnSinglePage:true}}
        columns={columns}
        rowKey='id'
      />
      <OrderOtherPackageModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
        packageList={packageList}
      />
    </Card>
  )
}

export default ShoppingPackageInfo
