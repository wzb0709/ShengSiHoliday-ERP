import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as oneDayServices from '@/services/onDay'
import OtherPackageModal from '@/pages/product/oneDay/otherPackageModal'

interface IProps {
  id: string,
  canEdit: boolean
}

const OtherPackageInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})

  const columns: ColumnProps<Object>[] = props.canEdit ? [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'package_price', title: '套餐价格' ,render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row> },
    { dataIndex: 'package_commission', title: '分销佣金' },
    {
      dataIndex: '', title: '上线状态', render: recode =>
        <Row type='flex'>
          <div style={{color:recode.is_show === 1 ? '#00CD00' : 'red'}}>{recode.is_show === 1 ? '已上线' : '未上线'}</div>
          <a
            style={{ marginLeft: 10 }}
            onClick={() => handleChangeStatus(recode.id, recode.is_show)}
          >
            {recode.is_show === 1 ? '点击下架' : '点击上架'}
          </a>
        </Row>,
    },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleUpdatePackage(recode)} >编辑</a>
        <Divider type='vertical'/>
        <a onClick={() => handleDeletePackage(recode)} style={{ color: 'red' }}>删除</a>
      </Fragment>,
    },
  ] : [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'package_price', title: '套餐价格' ,render:recode => <Row type='flex' align='middle'><Statistic valueStyle={{fontSize:14}} value={recode} precision={2} prefix='￥' /></Row> },
    { dataIndex: 'package_commission', title: '分销佣金' },
    {
      dataIndex: '', title: '上线状态', render: recode =>
        <Row type='flex'>
          <div style={{color:recode.is_show === 1 ? '#00CD00' : 'red'}}>{recode.is_show === 1 ? '已上线' : '未上线'}</div>
        </Row>,
    },
  ]

  const getPackageList = useCallback(() => {
    oneDayServices.getOtherPackageList(props.id).then(res => {
      setDataSource(res)
    })
  }, [props.id])
  useEffect(() => {
    getPackageList()
  }, [getPackageList])

  const handleChangeStatus = (id: string, status: number) => {
    oneDayServices.updateOtherPackageStatus(id, status === 1 ? 0 : 1)
      .then(() => {
        message.success('操作成功！')
        getPackageList()
      })
  }

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      product_id:props.id
    }
    if (id === '') {
      oneDayServices.addOtherPackage({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    } else {
      oneDayServices.updateOtherPackage({ ...params },id).then(() => {
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
    setInitialValue(item)
    setId(id)
    setVisible(true)
  }

  const handleDeletePackage = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否需要删除该套餐?',
      onOk:() => {
        oneDayServices.deleteOtherPackage(id).then(() => {
          message.success('操作成功!')
          getPackageList()
        })
      }
    })
  }

  return (
    <Card
      title='附加套餐信息'
      style={{marginTop:20}}
      extra={props.canEdit && <a onClick={handleAddPackage}>添加附加套餐</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
      />
      <OtherPackageModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default OtherPackageInfo
