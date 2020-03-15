import axios from 'axios'

export function getMemberList(
  {search,start_time,end_time,sourceid,size,page}
  :
    {search:string,size:number,page:number,start_time:string,end_time:string,sourceid:string}) {
  const params = {
    search,sourceid,start_time,end_time,page,size
  }
  return axios.get(`/member`,{params})
}

export function getMemberInfo({id}:{id:string}) {
  return axios.get(`/member/${id}`)
}

export function getMemberOrderList({memberid,page,size}:{memberid:string,page:number,size:number}) {
  return axios.get(`/member/${memberid}/${page}/${size}`)
}
