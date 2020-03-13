import axios from 'axios'


export function getSettleSalesmanList(settleid:string,page:number,size:number) {
  const params = {
    settleid,page,size
  }
  return axios.get(`/settleSaleman`,{params})
}

export function updateSettleSalesman(item:any,id:string) {
  const params = {
    ...item,
    id
  }
  return axios.put(`/settleSaleman`,params)
}

export function addSettleSalesman(item:any) {
  return axios.post(`/settleSaleman`,item)
}

export function deleteSettleSalesman(id:string) {
  return axios.delete(`/settleSaleman/${id}`)
}
