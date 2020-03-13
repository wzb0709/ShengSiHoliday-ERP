import axios from 'axios'

export function getTouristList(orderid:string,page:number,size:number) {
  const params = {
    orderid,page,size
  }
  return axios.get(`/orderTourists`,{params})
}

interface ITouristItem {
  tourist_name:string,
  certification_type:number,
  certification_no:string,
  tourist_sex:number,
  tourist_birthday:string,
  tourist_type:number,
}

export function updateTourist(item:ITouristItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/orderTourists`,params)
}

export function addTourist(item:ITouristItem) {
  const params = {
    ...item
  }
  return axios.post(`/orderTourists`,params)
}

export function deleteTourist(id:string) {
  return axios.delete(`/orderTourists?id=${id}`)
}

export function updateTouristStatus(id:string,status:number) {
  return axios.put(`/orderTourists/status?id=${id}&status=${status}`)
}

export function uploadTouristFile(file:FormData,orderid:string) {
  return axios.post(`/orderTourists/file/${orderid}`,file)
}

export function changeAllTouristStatus(orderid:string,ids:string[]) {
  return axios.put(`/orderTourists/batchexit/${orderid}`,ids)
}
