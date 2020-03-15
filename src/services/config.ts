import axios from 'axios'

export function getConfig() {
  return axios.get(`/config`)
}

export function updateConfig(item:any) {
  return axios.put(`/config`,item)
}

export function getBack() {
  return axios.get(`/configBack`)
}

export function updateBack(item:any,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/configBack`,params)
}

export function addBack(item:any) {
  return axios.post(`/configBack`,item)
}

export function deleteBack(id:string) {
  return axios.delete(`/configBack/${id}`)
}
