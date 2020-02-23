import React, { FC } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Divider, Table } from 'antd'
import moment from 'moment'
import { IUserInfo } from '@/services/user'

interface IProps {
  readonly onChangeUserStatus: (id: string, status: number) => void
  readonly onViewUserInfo: (id: string) => void
  readonly onDeleteUser: (id: string) => void
  readonly onPageChange:(page:number) => void
  readonly dataSource: Array<IUserInfo>
  readonly page: number
  readonly size: number
  readonly count: number
}

const UserTable: FC<IProps> = (props) => {

  const columns: ColumnProps<Object>[] = [
    { title: '用户名', dataIndex: 'user_name' },
    { title: '所属公司', dataIndex: 'company' },
    { title: '电话', dataIndex: 'phone' },
    {
      title: '状态', dataIndex: '', render: recode => <>
        {recode.status === 0 ? '禁用中' : '启用中'}
        <Divider type="vertical"/>
        <a onClick={() => props.onChangeUserStatus(recode.id, recode.status)}>{recode.status === 0 ? '启用' : '禁用'}</a>
      </>,
    },
    {
      title: '创建时间', dataIndex: 'create_time',
      render: recode => moment(recode).format('YYYY-MM-DD'),
    },
    {
      title: '操作', dataIndex: 'id', render: recode => <>
        <a onClick={() => props.onViewUserInfo(recode)}>编辑用户信息</a>
        <Divider type="vertical"/>
        <a style={{ color: '#F60' }} onClick={() => props.onDeleteUser(recode)}>删除用户</a>
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
      scroll={{ y: 510 }}
      bordered={true}
    />
  )
}

export default UserTable
