import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Select, Statistic, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as planServices from '@/services/oneDayManager'
import DatePlanModal from '@/pages/product/oneDayManager/datePlanModal'
import * as oneDayServices from '@/services/onDay'
import AddPlanPackageModal from '@/pages/product/oneDayManager/detail/detailModal'
import { WrappedFormUtils } from 'antd/es/form/Form'
import packageModal from '@/pages/product/oneDay/packageModal'

interface IProps {
  id: string,
  canEdit: boolean,
  packageList?:any
}

const PackageTable: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [addVisible,setAddVisible] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  //
  // const [packageList, setPackageList] = useState<any>([])
  // const getTotalPackageList = useCallback(() => {
  //   oneDayServices.getPackageList(props.match.params.id).then(res => {
  //     setPackageList(res)
  //     console.log(res)
  //   })
  // }, [props.id])
  // useEffect(() => {
  //   getPackageList()
  // }, [getTotalPackageList])


  const columns: ColumnProps<Object>[] = props.canEdit ? [
    { dataIndex: 'package_title', title: '套餐名称'},
    { dataIndex: 'start_time', title: '出发时间' },
    { dataIndex: '', title: '套餐价格' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_price} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_price} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: '', title: '分销佣金' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_commission} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_commission} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: 'package_count', title: '数量' },
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
    { dataIndex: 'start_time', title: '出发时间' },
    { dataIndex: '', title: '套餐价格',render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_price} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_price} precision={2} prefix='￥' /></Row>
      </> },
    { dataIndex: '', title: '分销佣金' ,render:recode => <>
        <Row type='flex' align='middle'>成人：<Statistic valueStyle={{fontSize:14}} value={recode.package_adult_commission} precision={2} prefix='￥' /></Row>
        <Row type='flex' align='middle'>儿童：<Statistic valueStyle={{fontSize:14}} value={recode.package_child_commission} precision={2} prefix='￥' /></Row>
      </>},
    { dataIndex: 'package_count', title: '数量' },
    {
      dataIndex: '', title: '上线状态', render: recode =>
        <Row type='flex'>
          <div style={{color:recode.is_show === 1 ? '#00CD00' : 'red'}}>{recode.is_show === 1 ? '已上线' : '未上线'}</div>
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
    }else{
      planServices.addPlanPackage({ ...params}).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    }
  }

  const handleAddPackage = () => {
    let count = 0
    dataSource.forEach((item:any) => {
      const index = props.packageList.findIndex((item1:any) => item1.id === item.package_id)
      if(index > -1){
        count++
      }
    })
    if(count === props.packageList.length){
      message.warning('没有可以添加的套餐')
      return false
    }
    setId('')
    setInitialValue({})
    setAddVisible(true)
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

  const handleSelect = (values:any) => {
    values.keys.forEach((item:string,index:number) => {
      const obj = {
        package_count: values.package_count,
        is_show: values.is_show,
        package_adult_price: values.package_adult_price,
        package_adult_commission: values.package_adult_commission,
        package_child_price: values.package_child_price,
        package_child_commission: values.package_child_commission,
        date_id:props.id,
        package_id:item
      }
      planServices.addPlanPackage({...obj}).then(() => {
        if(index === values.keys.length -1){
          message.success('操作成功!')
          setAddVisible(false)
          getPackageList()
        }
      })
    })
  }
  return (
    <Card
      title='套餐信息'
      style={{ marginTop: 20 }}
      extra={props.canEdit  && <a onClick={handleAddPackage}>添加套餐</a>}
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
      />
      <DatePlanModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
      {props.packageList && <AddPlanPackageModal
        // @ts-ignore
        packageList={props.packageList}
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        onOk={handleSelect}
      />}
    </Card>
  )
}

export default PackageTable
