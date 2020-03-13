import axios from 'axios'


export function getSettleOtherCostList(settleid:string,page:number,size:number) {
  const params = {
    settleid,page,size
  }
  return axios.get(`/settleOthCoust`,{params})
}

export function updateSettleOtherCost(item:any,id:string) {
  const params = {
    ...item,
    id
  }
  return axios.put(`/settleOthCoust`,params)
}

export function addSettleOtherCost(item:any) {
  return axios.post(`/settleOthCoust`,item)
}

export function deleteSettleOtherCost(id:string) {
  return axios.delete(`/settleOthCoust/${id}`)
}
