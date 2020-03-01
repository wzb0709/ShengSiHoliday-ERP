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
  size:number
}

export function getOneDayOrderList(params:IParams) {
  return axios.get(`/groupOrder`,{params})
}

export function getOneDayOrderInfo(id:string) {
  return axios.get(`/groupOrder/detail?id=${id}`)
}

export function changeCarPoint(id:string,carpointid:string) {
  const params = {
    id,carpointid
  }
  return axios.put(`/groupOrder/carpoint`,params)
}

export function changeProduct(orderid:string,productid:string,dateid:string) {
  const params = {
    orderid,productid,dateid
  }
  return axios.put(`/groupOrder/changepro`,params)
}
