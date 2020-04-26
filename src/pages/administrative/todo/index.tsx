import React, { FC, useCallback, useEffect, useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table } from 'antd'
import * as homeServices from '@/services/home'
import { Link } from 'umi'

const Todo: FC = (props) => {

  //表格数据源
  const [dataSource, setDataSource] = useState<Array<any>>([])


  const columns: ColumnProps<Object>[] = [
    {
      dataIndex: '', title: '内容',
      render: recode => <div style={{ color: recode.type === 1 ? 'red' : '' }}>{`${recode.type === 1 ? '[紧急]' : ''}${recode.title}`}</div>,
    },
    { dataIndex: 'count', title: '数量' },
    { dataIndex: 'key', title: '查看详情',render:recode => recode === 'claimorder' ? <Link to='/order/get' />
        : recode === 'claimorder' ? <Link to='/order/get' >查看详情</Link>
          : recode === 'grouporder' ? <Link to='/order/oneDay' >查看详情</Link>
            : recode === 'rentalorder' ? <Link to='/order/car' >查看详情</Link>
              : recode === 'customerorder' ? <Link to='/order/party' >查看详情</Link>
                : recode === 'shoporder' ? <Link to='/order/shop' >查看详情</Link>
                  : recode === 'settle' ? <Link to='/money/settle' >查看详情</Link>
                    : recode === 'expense' ? <Link to='/money/expense' >查看详情</Link>
                      : recode === 'withdrawal' ? <Link to='/money/withdrawal' >查看详情</Link>
                        : recode === 'income' ? <Link to='/money/collection' >查看详情</Link>
                          : <Link to='/money/refund' >查看详情</Link>
    },
  ]

  //获取表格源数据
  const getList = useCallback(() => {
    homeServices.getTodo()
      .then((res: any) => {
        setDataSource(res)
      })
  }, [])
  useEffect(() => {
    getList()
  }, [getList])


  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        // @ts-ignore
        scroll={{ y: parseInt(localStorage.getItem('height') - 377) }}
        bordered={true}
        rowKey='id'
      />
    </>
  )
}

export default Todo
