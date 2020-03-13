import axios from 'axios'


export function getSettleCostList(settleid:string,page:number,size:number) {
  const params = {
    settleid,page,size
  }
  return axios.get(`/settleCost`,{params})
}

export function updateSettleCost(item:any,id:string) {
  const params = {
    ...item,
    id
  }
  return axios.put(`/settleCost`,params)
}

export function addSettleCost(item:any) {
  return axios.post(`/settleCost`,item)
}

export function deleteSettleCost(id:string) {
  return axios.delete(`/settleCost/${id}`)
}
