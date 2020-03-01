import axios from 'axios'

export function getBusList(type:number,page:number,size:number) {
  const params = {
    type,page,size
  }
  return axios.get(`/bus`,{params})
}

export function getBusType() {
  return axios.get(`/bus/bustype`)
}


interface IBusInfo {
  bus_type:number,
  bus_content:string,
}
export function updateBusInfo(item:IBusInfo,id:string) {
  const params = {...item,id}
  return axios.put(`/bus`,params)
}

export function addBusInfo(item:IBusInfo) {
  const params = {...item}
  return axios.post(`/bus`,item)
}

export function updateBusStatus(id:string,status:number) {
  return axios.put(`/bus/${id}/${status}`)
}

export function deleteBusInfo(id:string) {
  return axios.delete(`/bus/${id}`)
}
