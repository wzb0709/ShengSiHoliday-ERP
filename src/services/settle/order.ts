import axios from 'axios'


export function getSettleOrderList(settleid:string,page:number,size:number) {
  const params = {
    settleid,page,size
  }
  return axios.get(`/settleOrder`,{params})
}

export function addSettleOrder(item:any,settleid:string) {
  return axios.post(`/settleOrder?settleid=${settleid}`,item)
}

export function deleteSettleOrder(id:string) {
  return axios.delete(`/settleOrder/${id}`)
}
