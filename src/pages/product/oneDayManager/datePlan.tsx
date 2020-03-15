import React, { FC, useCallback, useEffect, useState } from 'react'
import { Calendar, Card, Row, Radio, Table, Divider, Modal, Select, Button, message } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import * as oneDayServices from '@/services/onDay'
import * as planServices from '@/services/oneDayManager'
import DatePlanModal from '@/pages/product/oneDayManager/datePlanModal'
import moment from 'moment'
import AddPlanPackageModal from '@/pages/product/oneDayManager/detail/detailModal'
import { router } from 'umi'

interface IProps {
  match: any
}

const DatePlan: FC<IProps> = (props) => {

  const [dateList, setDateList] = useState<Array<string>>([])
  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [packageVisible, setPackageVisible] = useState<boolean>(false)
  const [packageList, setPackageList] = useState<any>([])
  const [initialValue, setInitialValue] = useState<any>({})
  const [id, setId] = useState<string>('')
  const [status, setStatus] = useState<number>(-1)
  const [datePlan,setDataPlan] = useState<any>([])

  const getPackageList = useCallback(() => {
    oneDayServices.getPackageList(props.match.params.id).then(res => {
      setPackageList(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getPackageList()
  }, [getPackageList])

  const getDatePlan = useCallback(() => {
    oneDayServices.getPlan(props.match.params.id).then(res=>{
      setDataPlan(res)
    })
  },[props.match.params.id])
  useEffect(() => {
    getDatePlan()
  },[getDatePlan])



  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'package_title', title: '套餐名称' },
    { dataIndex: 'start_time', title: '开始时间' },
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
      dataIndex: 'id', title: '操作', render: recode => <>
        <a onClick={() => handleUpdatePackage(recode)}>编辑</a>
        <Divider type='vertical'/>
        <a style={{ color: 'red' }} onClick={() => handleDelete(recode)}>删除</a>
      </>,
    },
  ]


  const handleSelect = (value: any) => {
    const date = value.format('YYYY-MM-DD')
    const index = dateList.findIndex(item => item === date)
    const arr: Array<string> = JSON.parse(JSON.stringify(dateList))
    if (index !== -1) {
      arr.splice(index, 1)
    } else {
      arr.push(date)
    }
    setDateList(arr)
  }


  const handleAddPackage = (values:any) => {
    let arr:any = []
    values.keys.forEach((item:string,index:number) => {
      const packageItem:any = packageList.find((item1:any) => item1.id === item)
      const obj = {
        package_count: values.package_count,
        is_show: values.is_show,
        package_adult_price: values.package_adult_price,
        package_adult_commission: values.package_adult_commission,
        package_child_price: values.package_child_price,
        package_child_commission: values.package_child_commission,
        package_id:item,
        package_title:packageItem.package_title,
        start_time:packageItem.start_time
      }
      arr.push(obj)
    })
    setDataSource(arr)
    setVisible(false)
  }

  const handleUpdatePackage = (id: string) => {
    const obj = dataSource.find((item: any) => item.id === id)
    if (obj) {
      setInitialValue(obj)
      setPackageVisible(true)
      setId(id)
    }
  }

  const handleConfirm = (values: any) => {
    const arr: any = JSON.parse(JSON.stringify(dataSource))
    arr.forEach((item: any) => {
      if (item.id === id) {
        item.package_adult_price = values.package_adult_price
        item.package_adult_commission = values.package_adult_commission
        item.package_child_price = values.package_child_price
        item.package_child_commission = values.package_child_commission
        item.package_count = values.package_count
      }
    })
    setDataSource(arr)
    setPackageVisible(false)
    setId('')
  }

  const handleDelete = (id: string) => {
    const arr: any = JSON.parse(JSON.stringify(dataSource))
    const index = arr.findIndex((item: any) => item.id === id)
    if (index > -1) {
      arr.splice(index, 1)
    }
    setDataSource(arr)
  }


  const handleConfirmPlan = () => {
    if (dateList.length === 0) {
      message.warning('请选择计划的日期')
      return false
    }
    if (status === -1) {
      message.warning('请选择是否需要上架')
      return false
    }
    if (dataSource.length === 0) {
      message.warning('请选择套餐')
      return false
    }
    let planItem = {
      date_array: dateList,
      product_id:props.match.params.id,
      packages:dataSource
    }
    console.log(planItem)
    return  false
    planServices.addPlan(planItem).then(() => {
      message.success('操作成功!')
      router.replace('/product/oneDayManager')
    })
  }

  const handleRender = (date:any) => {
    const a = datePlan.find((item:any) => date.format('YYYY-MM-DD') === moment(item.start_date).format('YYYY-MM-DD'))
    if(a){
      return true
    }else{
      return false
    }
  }

  return (
    <>
      <Card
        title='批量添加计划'
      >
        <Calendar onSelect={handleSelect} disabledDate={handleRender} />
        <Row type='flex' align='middle'>
          <div>已选时间：</div>
          {dateList.map(item => {
            return (
              <Card style={{ marginRight: 20, marginBottom: 20 }} key={item}>{item}</Card>
            )
          })}
        </Row>
        <Row style={{ marginTop: 20 }}>
          上架状态
          <Radio.Group style={{ marginLeft: 20 }} onChange={(val) => setStatus(val.target.value)}>
            <Radio value={1}>上架</Radio>
            <Radio value={0}>不上架</Radio>
          </Radio.Group>
        </Row>
      </Card>
      <Card
        title='套餐信息'
        style={{ marginTop: 20 }}
        extra={<a onClick={() => setVisible(true)}>添加套餐</a>}
      >
        <Table
          bordered={true}
          columns={columns}
          dataSource={dataSource}
          rowKey='id'
        />
      </Card>
      {visible && <AddPlanPackageModal
        // @ts-ignore
        packageList={packageList}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleAddPackage}
      />}
      {/*<Modal*/}
      {/*  title='添加套餐'*/}
      {/*  width={600}*/}
      {/*  onCancel={() => setVisible(false)}*/}
      {/*  destroyOnClose={true}*/}
      {/*  visible={visible}*/}
      {/*  onOk={handleAddPackage}*/}
      {/*>*/}
      {/*  <Row type='flex' align='middle'>*/}
      {/*    <div>套餐名称</div>*/}
      {/*    <Select*/}
      {/*      placeholder='请选择套餐'*/}
      {/*      style={{ marginLeft: 10, width: 300 }}*/}
      {/*      mode="multiple"*/}
      {/*      onChange={handleSelectChange}*/}
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
      <DatePlanModal
        onOk={handleConfirm}
        visible={packageVisible}
        onCancel={() => setPackageVisible(false)}
        initialValue={initialValue}
      />
      <div style={{ textAlign: 'right', marginTop: 20 }}>
        <Button type='primary' onClick={handleConfirmPlan}>新增计划</Button>
      </div>
    </>
  )
}

export default DatePlan
