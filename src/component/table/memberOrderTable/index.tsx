import React, { FC, useState } from 'react'
import { Modal, Select } from 'antd'
import OneDayTable from '@/component/table/memberOrderTable/oneDay'
import ShopTable from '@/component/table/memberOrderTable/shop'
import PartyTable from '@/component/table/memberOrderTable/party'
import CarTable from '@/component/table/memberOrderTable/car'

interface IProps {
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  memberId:string
}

const MemberOrder:FC<IProps> = (props) => {

  const [type,setType] = useState<number>(1)

  const handleSelect = (val:number) => {
    setType(val)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='订单列表'
      width={1200}
      destroyOnClose={true}
      footer={null}
    >
      <Select onChange={handleSelect} placeholder='请选择订单类型' style={{width:150,marginBottom:20}} >
        <Select.Option value={1}>一日游</Select.Option>
        <Select.Option value={2}>购物</Select.Option>
        <Select.Option value={3}>定制游</Select.Option>
        <Select.Option value={4}>汽车租赁</Select.Option>
      </Select>
      {type === 1 && <OneDayTable memberId={props.memberId} />}
      {type === 2 && <ShopTable memberId={props.memberId} />}
      {type === 3 && <PartyTable memberId={props.memberId} />}
      {type === 4 && <CarTable memberId={props.memberId} />}
    </Modal>
  )
}

export default MemberOrder
