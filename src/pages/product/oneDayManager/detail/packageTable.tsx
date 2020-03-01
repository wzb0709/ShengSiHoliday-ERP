import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Select, Table } from 'antd'
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
  const [addVisible,setAddVisible] = useState<boolean>(false)
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
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'start_time', title: '出发时间' },
    { dataIndex: '', title: '套餐价格' ,render:recode => <>
        <div>成人：￥{recode.package_adult_price}</div>
        <div style={{marginTop:10}} >儿童：￥{recode.package_child_price}</div>
      </>},
    { dataIndex: '', title: '分销佣金' ,render:recode => <>
        <div>成人：￥{recode.package_adult_commission}</div>
        <div style={{marginTop:10}}>儿童：￥{recode.package_child_commission}</div>
      </>},
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
    { dataIndex: '', title: '套餐价格',render:recode => <>
        <div>成人：￥{recode.package_adult_price}</div>
        <div style={{marginTop:10}} >儿童：￥{recode.package_child_price}</div>
      </> },
    { dataIndex: '', title: '分销佣金' ,render:recode => <>
        <div>成人：￥{recode.package_adult_commission}</div>
        <div style={{marginTop:10}}>儿童：￥{recode.package_child_commission}</div>
      </>},
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
    }else{
      planServices.addPlanPackage({ ...params}).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getPackageList()
      })
    }
  }

  const handleAddPackage = () => {
    setId('')
    setInitialValue({})
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
      {/*<Modal*/}
      {/*  title='添加套餐'*/}
      {/*  width={600}*/}
      {/*  onCancel={() => setAddVisible(false)}*/}
      {/*  destroyOnClose={true}*/}
      {/*  visible={addVisible}*/}
      {/*  onOk={handleAddPackage}*/}
      {/*>*/}
      {/*  <Row type='flex' align='middle'>*/}
      {/*    <div>套餐名称</div>*/}
      {/*    <Select*/}
      {/*      placeholder='请选择套餐'*/}
      {/*      style={{ marginLeft: 10, width: 300 }}*/}
      {/*      mode="multiple"*/}
      {/*      // onChange={handleSelectChange}*/}
      {/*    >*/}
      {/*      {packageList.map((item: any) => {*/}
      {/*        return (*/}
      {/*          <Select.Option key={item.id}>*/}
      {/*            {item.package_title}*/}
      {/*          </Select.Option>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </Select>*/}
      {/*  </Row>*/}
      {/*</Modal>*/}
    </Card>
  )
}

export default PackageTable
