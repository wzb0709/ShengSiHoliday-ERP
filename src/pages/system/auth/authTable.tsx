import React, { FC } from 'react'
import { Table, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'

interface IProps {
  readonly dataSource: Array<IAuthItem>
  readonly page: number
  readonly size: number
  readonly count: number
  readonly onUpdateAuth:(id:number) => void
  readonly onDeleteAuth:(id:number) => void
  readonly onPageChange:(page:number) => void
}

export interface IAuthItem {
  readonly id: number
  readonly title: string
}

const AuthTable: FC<IProps> = (props) => {

  const columns: ColumnProps<Object>[] = [
    { title: '权限编号', dataIndex: 'id' },
    { title: '权限名称', dataIndex: 'title' },
    {
      title: '操作', dataIndex: '', render: recode => <>
        <a onClick={() => props.onUpdateAuth(recode.id)}>编辑</a>
        <Divider type="vertical"/>
        <a style={{ color: '#F60' }} onClick={() => props.onDeleteAuth(recode.id)}>删除权限</a>
      </>,
    },
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
      bordered={true}
    />
  )
}

export default AuthTable
