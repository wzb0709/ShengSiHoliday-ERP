import axios from 'axios'

export function getMemberList({search,size,page}:{search:string,size:number,page:number}) {
  return axios.get(`/member/${page}/${size}?search=${search}`)
}

export function getMemberInfo({id}:{id:string}) {
  return axios.get(`/member/${id}`)
}

export function getMemberOrderList({memberid,page,size}:{memberid:string,page:number,size:number}) {
  return axios.get(`/member/${memberid}/${page}/${size}`)
}
