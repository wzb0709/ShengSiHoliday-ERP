import React, { FC, useEffect, useState,useCallback } from 'react'
import { Button, Row, Input, message, Modal } from 'antd'

import CharacterTable, { ICharacterItem } from '@/pages/system/character/characterTable'
import * as roleServices from '@/services/role'
import * as authServices from '@/services/auth'
import CharacterModal, { IFormItem } from '@/pages/system/character/characterModal'
import { IAuthItem } from '@/pages/system/auth/authTable'
import RoleModal from '@/pages/system/character/roleModal'

const Search = Input.Search

const CharacterList:FC = (props) => {

  const [dataSource,setDataSource] = useState<Array<ICharacterItem>>([])
  const [page,setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [search,setSearch] = useState<string>('')
  const [count,setCount] = useState<number>(0)
  const [initialValue,setInitialValue] = useState({})
  const [visible,setVisible] = useState<boolean>(false)
  const [roleVisible,setRoleVisible] = useState<boolean>(false)
  const [authList,setAuthList] = useState<Array<IAuthItem>>([])
  const [id,setId] = useState<number>(0)

  const getCharacterList = useCallback(() => {
    roleServices.getRoleList({
      page,size,search
    }).then((res:any)=>{
      setDataSource(res.data)
      setCount(res.count)
    })
  },[page, search, size])

  const getAuthList = () => {
    authServices.getAuthList({page:1,size:100,search:''}).then(res=>{
      setAuthList(res.data)
    })
  }

  useEffect(() => {
    getCharacterList()
    getAuthList()
  },[getCharacterList])

  const handleAddCharacter = () => {
    setVisible(true)
  }

  const handleConfirmAddCharacter = (values:IFormItem) => {
    roleServices.addRole({roleInfo:{title:values.title}}).then(() => {
      setVisible(false)
      message.success('操作成功！')
      getCharacterList()
    })
  }

  const handleUpdateRole = (id:number) => {
    setId(id)
    setRoleVisible(true)
    const obj = dataSource.find(item => item.id === id)
    let value:any = []
    if(obj){
      obj.authList.forEach(item=>{
        value.push({
          key:item.id,
          label:item.title
        })
      })
    }
    setInitialValue({authList:value})
  }

  const handleConfirmUpdateRole = (values:any) => {
    let arr:Array<IAuthItem> = []
    values.authList.forEach((item:any)=>{
      arr.push({
        id:item.key,
        title:item.label
      })
    })
    roleServices.updateRole({
      id,roleInfo:arr
    }).then(()=>{
      setRoleVisible(false)
      message.success('操作成功！')
      getCharacterList()
    })
  }

  const handleDeleteCharacter = (id:number) => {
    Modal.confirm({
      title:'提示',
      content:'是否确认要删除该项？',
      onOk:() => {
        roleServices.deleteRole({id}).then(() => {
          message.success('操作成功！')
          getCharacterList()
        })
      }
    })
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
      <Button type='primary' onClick={handleAddCharacter}>添加角色</Button>
      <CharacterModal
        onCancel={() => setVisible(false)}
        onOk={handleConfirmAddCharacter}
        visible={visible}
      />
      <RoleModal
        onCancel={() => setRoleVisible(false)}
        onOk={handleConfirmUpdateRole}
        visible={roleVisible}
        initialValue={initialValue}
        authList={authList}
      />
      <Row>
        <Search
          placeholder='请输入关键词'
          style={{margin:'20px 0',width:300}}
          enterButton="搜索"
          onSearch={handleSearch}
        />
      </Row>
      <CharacterTable
        dataSource={dataSource}
        page={page}
        size={size}
        count={count}
        onUpdateRole={handleUpdateRole}
        onDeleteCharacter={handleDeleteCharacter}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default CharacterList
