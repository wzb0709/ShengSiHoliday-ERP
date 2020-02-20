import axios from 'axios'

export function getAuthList({page,size,search}:{page:number,size:number,search:string}) {
  return axios.get(`/auth/${page}/${size}?search=${search}`)
}

export interface IAuthInfo {
  title:string
}
export function addAuth({info}:{info:IAuthInfo}) {
  const params = {...info}
  return axios.post(`/auth`,params)
}

export function updateAuth({id,info}:{id:number,info:IAuthInfo}) {
  return axios.put(`/auth/${id}`,info)
}

export function deleteAuth({id}:{id:number}) {
  return axios.delete(`/auth/${id}`)
}
