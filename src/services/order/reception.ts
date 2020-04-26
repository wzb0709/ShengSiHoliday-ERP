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

export function getReceptionOrderList(item:IParams) {
  const params = {
    ...item
  }
  return axios.get(`/receptionOrder`,{params})
}

interface IPartyOrderItem {
  travel_date:string,
}

export function updateReceptionOrder(item:IPartyOrderItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/receptionOrder`,params)
}

export function getReceptionInfo(id:string) {
  return axios.get(`/receptionOrder/detail/${id}`)
}

export function addReception(item:any) {
  return axios.post(`/receptionOrder`,item)
}
