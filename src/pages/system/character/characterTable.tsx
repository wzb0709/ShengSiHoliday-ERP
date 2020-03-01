import React, { FC,Fragment } from 'react'
import { Table, Row, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IAuthItem } from '@/pages/system/auth/authTable'

interface IProps {
  readonly dataSource: Array<ICharacterItem>
  readonly page: number
  readonly size: number
  readonly count: number
  readonly onUpdateRole:(id:number) => void
  readonly onDeleteCharacter:(id:number) => void
  readonly onPageChange:(page:number) => void
}

export interface ICharacterItem {
  readonly id: number
  readonly title: string
  readonly authList:Array<IAuthItem>
}

const CharacterTable: FC<IProps> = (props) => {

  const columns: ColumnProps<Object>[] = [
    {title:'角色名称',dataIndex:'title'},
    {title:'拥有权限',dataIndex:'authList',render:recode=><Row type='flex' align='middle'>
        {recode.map((item:IAuthItem)=>{
          return(
            <Fragment key={item.id}>
              <div>{item.title}</div>
              <Divider type='vertical' />
            </Fragment>
          )
        })}
      </Row>},
    {title:'操作',dataIndex:'id',render:recode=><>
        <a onClick={() => props.onUpdateRole(recode)}>编辑权限</a>
        <Divider type="vertical" />
        <a style={{color:'#F60'}} onClick={() => props.onDeleteCharacter(recode)}>删除角色</a>
      </>},
  ]

  return (
    <Table
      dataSource={props.dataSource}
      columns={columns}
      rowKey='id'
      pagination={{
        pageSize: props.size,
        current: props.page,
        total: props.count,
        onChange:props.onPageChange
      }}
      // @ts-ignore
      scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
      bordered={true}
    />
  )
}

export default CharacterTable
