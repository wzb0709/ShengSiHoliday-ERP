import axios from 'axios'
import { IAuthInfo } from '@/services/auth'

export function getRoleList({search,size,page}:{search?:string,size:number,page:number}) {
  return axios.get(`/role/${page}/${size}?search=${search || ''}`)
}

export interface IRoleInfo {
  title:string
}
export function addRole({roleInfo}:{roleInfo:IRoleInfo}) {
  return axios.post(`/role`,roleInfo)
}


export function updateRole({id,roleInfo}:{id:number,roleInfo:Array<IAuthInfo>}) {
  return axios.put(`/role/${id}`,roleInfo)
}

export function deleteRole({id}:{id:number}) {
  return axios.delete(`/role/${id}`)
}
