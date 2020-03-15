import React, { FC, useCallback, useEffect, useState } from 'react'
import { message, Modal, Row, Table } from 'antd'
import TeamOrderSearch, { ITeamOrderSearch } from '@/pages/team/manager/detail/teamOrderSearch'
import { ColumnProps } from 'antd/lib/table'
import * as teamServices from '@/services/teamManager'
import moment from 'moment'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  readonly onOk:() => void
  readonly id:string
}

const TeamOrderModal:FC<IProps> = (props) => {

  //表格的页数
  const [page, setPage] = useState<number>(1)
  //表格每页的数量
  const [size] = useState<number>(10)
  //表格数据总量
  const [count, setCount] = useState<number>(0)
  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])
  const [keys,setKeys] = useState<Array<string>>([])

  const [params, setParams] = useState<ITeamOrderSearch>({
    ordertype: 1,
    trave_date: moment().format('YYYY-MM-DD'),
  })

  const columns: ColumnProps<Object>[] = [
    { dataIndex: '', title: '订单信息',render:recode => <>
        <div>订单类型：{recode.order_type === 1 ? '一日游'
          : recode.order_type === 2 ? '当地购物'
            : recode.order_type === 3 ? '定制游'
              : recode.order_type === 4 ? '汽车租赁'
                :  '一团一议'}</div>
        <div>订单编号：{recode.product_no}</div>
      </> },
    { dataIndex: '', title: '联系人信息' ,render:recode => <>
        <div>联系人姓名：{recode.contact_name}</div>
        <div>联系方式：{recode.contact_phone}</div>
      </> },
    { dataIndex: '', title: '订单人数' ,render:recode =><div>{recode.adult_count}成人 {recode.child_count}儿童</div>},
    // @ts-ignore
    { dataIndex: 'sale_id', width:100,title: '订单销售' ,render:recode=>memberList.find((item:any) => item.id === recode) ? memberList.find((item:any) => item.id === recode).name : ''},
    { dataIndex: 'notes', title: '备注' },
  ]

  const getTeamOrderList = useCallback(() => {
    teamServices.getWaitOrder(params.ordertype,params.trave_date,page,size)
      .then((res: any) => {
        setDataSource(res.data)
        setCount(res.count)
      })
  }, [page, size, params])
  useEffect(() => {
    getTeamOrderList()
  }, [getTeamOrderList])

  const handleConfirm = () => {
    if(keys.length === 0){
      message.success('请选择订单')
      return false
    }
    teamServices.addGroupOrder(props.id,keys).then(res=>{
      message.success('操作成功！')
      props.onOk()
    })
  }

  //查询按钮点击事件
  const handleSearch = (values: any) => {
    if(values.trave_date)values.trave_date = values.trave_date.format('YYYY-MM-DD')
    setParams({ ...values })
  }
  //监听表格页数变更
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setKeys(selectedRowKeys)
    },
  }

  return (
    <>
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        title='添加团队订单'
        width={1200}
        destroyOnClose={true}
        onOk={handleConfirm}
      >
        <Row type='flex' align='middle'>
          <TeamOrderSearch initialValue={params} onSearch={handleSearch}  />
        </Row>
        <Table
          columns={columns}
          pagination={{ hideOnSinglePage:true,pageSize: size, total: count, current: page, onChange: handlePageChange }}
          rowSelection={rowSelection}
          dataSource={dataSource}
          bordered={true}
          rowKey='id'
        />
      </Modal>
    </>
  )
}

export default TeamOrderModal
