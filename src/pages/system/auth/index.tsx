import React, { FC, useState, useEffect ,useCallback} from 'react'
import { Button, Input, message, Modal, Row } from 'antd'
import AuthTable, { IAuthItem } from '@/pages/system/auth/authTable'
import AuthModal, { IFormItem } from '@/pages/system/auth/authModal'
import * as authServices from '@/services/auth'

const { Search } = Input

const AuthList: FC = (props) => {

  const [visible, setVisible] = useState<boolean>(false)
  const [initialValue, setInitialValue] = useState<IFormItem>({ title: '' })
  const [page,setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [search,setSearch] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [dataSource, setDataSource] = useState<Array<IAuthItem>>([])
  const [id, setId] = useState<number>(0)

  //获取权限列表
  const getAuthList = useCallback(() => {
    authServices.getAuthList({
      page, size, search,
    }).then((res: any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  },[page, search, size])

  useEffect(() => {
    getAuthList()
  }, [getAuthList])

  const handleAddAuth = () => {
    setVisible(true)
    setInitialValue({ title: '' })
    setId(0)
  }

  const handleUpdateAuth = (id: number) => {
    setVisible(true)
    const obj = dataSource.find(item => item.id === id)
    const title = obj ? obj.title : ''
    setInitialValue({ title })
    setId(id)
  }

  const handleDeleteAuth = (id:number) => {
    Modal.confirm({
      title:'提示',
      content:'是否确认删除该项？',
      onOk:() => {
        authServices.deleteAuth({id}).then(() => {
          message.success('操作成功!')
          getAuthList()
        })
      }
    })
  }

  const handleConfirmAuth = (values: IFormItem) => {
    if (id === 0) {
      authServices.addAuth({
        info: { title: values.title },
      }).then(() => {
        getAuthList()
        setVisible(false)
        message.success('操作成功！')
      })
    } else {
      authServices.updateAuth({
        id, info: { title: values.title },
      }).then(() => {
        getAuthList()
        setVisible(false)
        message.success('操作成功！')
      })
    }
  }

  const handlePageChange = (page:number) => {
    setPage(page)
  }

  const handleSearch = (search:string) => {
    setSearch(search)
    setPage(1)
  }

  return (
    <>
      <AuthModal
        visible={visible}
        onOk={handleConfirmAuth}
        onCancel={() => setVisible(false)}
        initialValue={initialValue}
      />
      <Button type='primary' onClick={handleAddAuth}>添加权限</Button>
      <Row>
        <Search
          placeholder='请输入关键词'
          style={{ margin: '20px 0', width: 300 }}
          enterButton="搜索"
          onSearch={handleSearch}
        />
        <AuthTable
          dataSource={dataSource}
          page={page}
          size={size}
          count={count}
          onDeleteAuth={handleDeleteAuth}
          onUpdateAuth={handleUpdateAuth}
          onPageChange={handlePageChange}
        />
      </Row>
    </>
  )
}

export default AuthList
