import axios from 'axios'

interface IParams {
  search:string,
  source:number,
  type:number,
  status:number,
  start_time:string,
  end_time:string,
  page:number,
  size:number
}

export function getCouponList(params:IParams) {
  return axios.get(`/coupon`,{params})
}

export function getMemberList(params:any) {
  return axios.get(`/coupon/member`,{params})
}

export function getAllCouponList() {
  return axios.get(`/coupon/list`)
}

interface ICouponItem {
  coupon_title:string,
  coupon_use:number,
  coupon_type:number,
  start_time:string,
  end_time:string,
  coupon_count:number,
  coupon_take:number,
  coupon_maxtake:number,
  coupon_moeny:number,
  coupon_summary:string
}

export function updateCoupon(item:ICouponItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/coupon`,params)
}

export function addCoupon(item:ICouponItem) {
  return axios.post(`/coupon`,item)
}

export function updateCouponStatus(id:string,status:number) {
  return axios.put(`/coupon/${id}/${status}`)
}

export function deleteCoupon(id:string) {
  return axios.delete(`/coupon/${id}`)
}


