import axios from 'axios'

interface IParams {
  search:string,
  status:number,
  salesid:string,
  opid:string,
  issettle:number,
  start_time:string,
  end_time:string,
  page:number,
  size:number,
  car_point_id:string
}

export function getOneDayOrderList(params:IParams) {
  return axios.get(`/groupOrder`,{params})
}

export function getOneDayOrderInfo(id:string) {
  return axios.get(`/groupOrder/detail?id=${id}`)
}

export function changeCarPoint(id:string,carpointid:string) {
  return axios.put(`/groupOrder/carpoint?id=${id}&carpointid=${carpointid}`)
}

export function changeProduct(orderid:string,productid:string,dateid:string) {
  const params = {
    orderid,productid,dateid
  }
  return axios.put(`/groupOrder/changepro`,params)
}

export function getWaitOrderList(page:number,size:number) {
  const params = {page,size}
  return axios.get(`/groupOrder/wait`,{params})
}

export function getWaitOrder(orderid:string) {
  const params = {orderid}
  return axios.put(`/groupOrder/wait`,params)
}
