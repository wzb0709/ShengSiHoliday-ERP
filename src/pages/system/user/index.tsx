import React, { FC, useEffect, useState, useCallback } from 'react'
import { Button, message, Modal } from 'antd'
import UserSearch, { IUserSearch } from '@/pages/system/user/userSearch'
import *as userServices from '@/services/user'
import * as roleServices from '@/services/role'
import { IUserInfo } from '@/services/user'
import UserTable from '@/pages/system/user/userTable'
import UserModal from '@/pages/system/user/userModal'
import { IAuthItem } from '@/pages/system/auth/authTable'

const User: FC = (props) => {

  const [visible, setVisible] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [status, setStatus] = useState<number>(-1)
  const [search, setSearch] = useState<string>('')
  const [dataSource, setDataSource] = useState<Array<IUserInfo>>([])
  const [count, setCount] = useState<number>(0)
  const [initialValue, setInitialValue] = useState({})
  const [id, setId] = useState<string>('')
  const [characterList, setCharacterList] = useState<Array<IAuthItem>>([])

  const getUserList = useCallback(() => {
    userServices.getUserList({
      page, search, status, size,
    }).then((res: any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [page, size, status, search])

  const getCharacterList = () => {
    roleServices.getRoleList({ size: 1000, search: '', page: 1 })
      .then(res => {
        setCharacterList(res.data)
      })
  }

  useEffect(() => {
    getUserList()
    getCharacterList()
  }, [getUserList])

  const handelSearch = (values: IUserSearch) => {
    setStatus(values.status)
    setSearch(values.search)
  }

  const handleAddUser = () => {
    setVisible(true)
    setId('')
    setInitialValue({})
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleChangeUserStatus = (id: string, status: number) => {
    userServices.updateUserStatus({
      id, status: status === 1 ? 0 : 1,
    }).then(() => {
      message.success('操作成功！')
      getUserList()
    })
  }

  const handleViewUserInfo = (id: string) => {
    userServices.getUserInfo({id}).then((res:any)=>{
      res.roleList.forEach((item:any)=>{
        item.key = item.id.toString()
        item.lable = item.title
      })
      setVisible(true)
      setId(id)
      setInitialValue(res)
    })
  }

  const handleDeleteUser = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '是否确认要删除该项？',
      onOk: () => {
        userServices.deleteUser({ id }).then(() => {
          message.success('操作成功！')
          getUserList()
        })
      },
    })
  }

  const handleConfirmUser = (values:any) => {
    let arr:any = []
    values.roleList.forEach((item:any)=>{
      arr.push({
        id:item.key,
        title:item.label
      })
    })
    values.roleList = arr
    if(id !== ''){
      userServices.updateUserInfo({
        id,info:{...values}
      }).then(() => {
        setVisible(false)
        message.success('操作成功！')
        getUserList()
      })
    }else{
      userServices.addUser({info:{...values}}).then(() => {
        setVisible(false)
        message.success('操作成功！')
        getUserList()
      })
    }
  }

  return (
    <>
      <UserModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirmUser}
        initialValue={initialValue}
        characterList={characterList}
      />
      <Button type='primary' onClick={handleAddUser}>添加用户</Button>
      <UserSearch
        params={{ search, status }}
        onSearch={handelSearch}
      />
      <UserTable
        onChangeUserStatus={handleChangeUserStatus}
        onViewUserInfo={handleViewUserInfo}
        onDeleteUser={handleDeleteUser}
        onPageChange={handlePageChange}
        dataSource={dataSource}
        page={page}
        size={size}
        count={count}
      />
    </>
  )
}

export default User
