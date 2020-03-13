import axios from 'axios'


export function getSettleInOutList(settleid:string,page:number,size:number) {
  const params = {
    settleid,page,size
  }
  return axios.get(`/settleInOut`,{params})
}

export function updateSettleInOut(item:any,id:string) {
  const params = {
    ...item,
    id
  }
  return axios.put(`/settleInOut`,params)
}

export function addSettleInOut(item:any) {
  return axios.post(`/settleInOut`,item)
}

export function deleteSettleInOut(id:string) {
  return axios.delete(`/settleInOut/${id}`)
}
