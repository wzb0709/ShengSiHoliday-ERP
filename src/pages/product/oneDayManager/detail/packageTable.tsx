import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as planServices from '@/services/oneDayManager'
import DatePlanModal from '@/pages/product/oneDayManager/datePlanModal'
import * as oneDayServices from '@/services/onDay'

interface IProps {
  id: string,
  canEdit: boolean
}

const PackageTable: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})

  // const [packageList, setPackageList] = useState<any>([])
  // const getTotalPackageList = useCallback(() => {
  //   oneDayServices.getPackageList(props.match.params.id).then(res => {
  //     setPackageList(res)
  //   })
  // }, [props.id])
  // useEffect(() => {
  //   getPackageList()
  // }, [getTotalPackageList])


  const columns: ColumnProps<Object>[] = props.canEdit ? [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'start_time', title: '出发时间' },
    { dataIndex: 'package_price', title: '套餐价格' },
    { dataIndex: 'package_commission', title: '分销佣金' },
    { dataIndex: 'package_count', title: '数量' },
    {
      dataIndex: '', title: '上线状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上线' : '未上线'}</div>
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
    { dataIndex: 'start_time', title: '出发时间' },
    { dataIndex: 'package_price', title: '套餐价格' },
    { dataIndex: 'package_commission', title: '分销佣金' },
    { dataIndex: 'package_count', title: '数量' },
    {
      dataIndex: '', title: '上线状态', render: recode =>
        <Row type='flex'>
          <div>{recode.is_show === 1 ? '已上线' : '未上线'}</div>
        </Row>,
    },
  ]

  const getPackageList = useCallback(() => {
    planServices.getPlanPackage(props.id).then(res => {
      setDataSource(res)
    })
  }, [props.id])
  useEffect(() => {
    getPackageList()
  }, [getPackageList])

  const handleChangeStatus = (id: string, status: number) => {
    planServices.updatePlanPackageStatus(id, status === 1 ? 0 : 1)
      .then(() => {
        message.success('操作成功！')
        getPackageList()
      })
  }


  const handleConfirm = (values: any) => {
    const params = {
      ...values,
    }
    if (id !== '') {
      planServices.updatePlanPackage({ ...params ,id},id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    }
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
        planServices.deletePlanPackage(id).then(() => {
          message.success('操作成功!')
          getPackageList()
        })
      }
    })
  }

  return (
    <Card
      title='套餐信息'
      style={{ marginTop: 20 }}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
      />
      <DatePlanModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default PackageTable
