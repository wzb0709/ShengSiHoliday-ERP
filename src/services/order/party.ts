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

export function getPartyOrderList(item:IParams) {
  const params = {
    ...item
  }
  return axios.get(`/customerOrder`,{params})
}

interface IPartyOrderItem {
  travel_date:string,
}

export function updatePartyOrder(item:IPartyOrderItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/customerOrder`,params)
}

export function getPartyOrderInfo(id:string) {
  return axios.get(`/customerOrder/detail/${id}`)
}
