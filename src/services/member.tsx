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

export function send(id:string,couponid:string) {
  const params = {
    id,couponid
  }
  return axios.get(`/member/coupon`,{params})
}

export function getOneDay(member_id:string) {
  const params = {
    member_id,page:1,size:10000
  }
  return axios.get(`/member/grouporder`,{params})
}

export function getParty(member_id:string) {
  const params = {
    member_id,page:1,size:10000
  }
  return axios.get(`/member/customerorder`,{params})
}

export function getCar(member_id:string) {
  const params = {
    member_id,page:1,size:10000
  }
  return axios.get(`/member/rentalorder`,{params})
}

export function getShop(member_id:string) {
  const params = {
    member_id,page:1,size:10000
  }
  return axios.get(`/member/shoporder`,{params})
}
