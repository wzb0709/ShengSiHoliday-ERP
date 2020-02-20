import axios from 'axios'
import { IAuthItem } from '@/pages/system/auth/authTable'

export function getUserList({status,page, size, search}:{status:number,page:number,size:number,search:string}) {
  return axios.get(`/sysUser/${status}/${page}/${size}?search=${search}`)
}


export function getUserInfo({id}:{id:string}) {
  return axios.get(`/sysUser/${id}`)
}

export interface IUserInfo {
  roleList:Array<IAuthItem>
  user_name:string
  company:string
  account:string
  pwd:string
  phone:string
  id?:string
}

export function updateUserInfo({id,info}:{id:string,info:IUserInfo}) {
  return axios.put(`/sysUser/${id}`,info)
}


export function deleteUser({id}:{id:string}) {
  return axios.delete(`/sysUser/${id}`)
}


export function updateUserStatus({id,status}:{id:string,status:number}) {
  return axios.put(`/sysUser/${id}/${status}`)
}


export function addUser({info}:{info:IUserInfo}) {
  const params = {...info}
  return axios.post(`/sysUser`,params)
}
