import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Table, Statistic } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

import * as oneDayServices from '@/services/onDay'
import PackageModal from '@/pages/product/oneDay/packageModal'

interface IProps {
  id: string,
  canEdit: boolean
}

const PackageInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})

  const columns: ColumnProps<Object>[] = props.canEdit ? [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'package_summary', title: '套餐描述' ,width:300,render:recode => <div style={{width:300}} className='textOverFlow'>{recode}</div>},
    { dataIndex: '', title: '默认套餐价格' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_price} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_price} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: '', title: '默认分销佣金' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_commission} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_commission} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: 'package_count', title: '默认数量' },
    { dataIndex: 'advance_booking', title: '下单截止' ,render:recode => `${recode}小时`},
    { dataIndex: 'persistence_time', title: '暂留时间',render:recode => `${recode}小时` },
    { dataIndex: 'start_time', title: '出发时间' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
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
    { dataIndex: 'package_summary', title: '套餐描述' ,width:300,render:recode => <div style={{width:300}} className='textOverFlow'>{recode}</div>},
    { dataIndex: '', title: '默认套餐价格' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_price} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_price} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: '', title: '默认分销佣金' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_commission} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_commission} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: 'package_count', title: '默认数量' },
    { dataIndex: 'advance_booking', title: '下单截止' ,render:recode => `${recode}小时`},
    { dataIndex: 'persistence_time', title: '暂留时间' ,render:recode => `${recode}小时`},
    { dataIndex: 'start_time', title: '出发时间' },
    {
      dataIndex: '', title: '上架状态', render: recode =>
        <Row type='flex'>
          <div style={{color:recode.is_show === 1 ? '#00CD00' : 'red'}}>{recode.is_show === 1 ? '已上线' : '未上线'}</div>
        </Row>,
    },
  ]

  const getPackageList = useCallback(() => {
    oneDayServices.getPackageList(props.id).then(res => {
      setDataSource(res)
    })
  }, [props.id])
  useEffect(() => {
    getPackageList()
  }, [getPackageList])

  const handleChangeStatus = (id: string, status: number) => {
    oneDayServices.updatePackageStatus(id, status === 1 ? 0 : 1)
      .then(() => {
        message.success('操作成功！')
        getPackageList()
      })
  }

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      start_time: values.start_time.format('HH:mm'),
      product_id:props.id
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
      start_time : moment(item.start_time,'HH:mm:ss')
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
      extra={props.canEdit && <a onClick={handleAddPackage}>添加套餐</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
      />
      <PackageModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
    </Card>
  )
}

export default PackageInfo
