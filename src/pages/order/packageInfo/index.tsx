import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

import * as oneDayServices from '@/services/order/package'
import * as proServices from '@/services/oneDayManager'
import OrderPackageModal from '@/pages/order/packageInfo/orderPackageModal'

interface IProps {
  id: string,
  date_id:string,
}

const PackageInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [packageList,setPackageList] = useState<any>([])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'start_time', title: '出发时间' },
    { dataIndex: '', title: '套餐单价' ,render:recode => <>
        <div>成人：￥{recode.adult_price}</div>
        <div style={{marginTop:10}} >儿童：￥{recode.child_price}</div>
      </>},
    { dataIndex: '', title: '套餐数量' ,render:recode => <>
        <div>成人{recode.adult_count}</div>
        <div style={{marginTop:10}}>儿童{recode.child_count}</div>
      </>},
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
    oneDayServices.getPackageList(props.id).then(res => {
      setDataSource(res)
    })
  }, [props.id])
  useEffect(() => {
    getPackageList()
    proServices.getPlanPackage(props.date_id).then(res=>{
      setPackageList(res)
    })
  }, [getPackageList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      order_id:props.id
    }
    if (id === '') {
      oneDayServices.addPackage({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    } else {
      oneDayServices.updatePackage({ ...params },id).then(() => {
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
        oneDayServices.deletePackage(id).then(() => {
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
        columns={columns}
        pagination={{hideOnSinglePage:true}}
        rowKey='id'
      />
      <OrderPackageModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
        packageList={packageList}
      />
    </Card>
  )
}

export default PackageInfo
