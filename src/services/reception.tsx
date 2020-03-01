import axios from 'axios'


export function getReception(search:string,op_id:string,page:number,size:number) {
  const params = {
    search,op_id,page,size
  }
  return axios.get(`/receptionProduct/list`,{params})
}

export function getReceptionInfo(id:string) {
  return axios.get(`/receptionProduct/detail/${id}`)
}

interface IReceptionItem {
  product_title:string,
  product_subtitle:string,
  travel_summary:string,
  create_id:string
}

export function updateReception(item:IReceptionItem,id:string) {
  return axios.put(`/receptionProduct`,{...item,id})
}

export function addReception(item:IReceptionItem) {
  return axios.post(`/receptionProduct`,item)
}

export function deleteReception(id:string) {
  return axios.delete(`/receptionProduct/${id}`)
}

export function copyProduct(id:string) {
  const params = {id}
  return axios.put(`/receptionProduct/copy`,params)
}
