import axios from 'axios'

export function getPointList() {
  return axios.get(`/carPoint`)
}

interface IPointItem {
  point_title: string,
  lat: string,
  lgt:string,
  point_address:string,
  point_type:number
}

export function updatePoint(item: IPointItem, id: string) {
  const params = {
    ...item, id,
  }
  return axios.put(`/carPoint`, params)
}

export function addPoint(item: IPointItem) {
  const params = {
    ...item,
  }
  return axios.post(`/carPoint`, params)
}

export function updatePointStatus(id: string, status: number) {
  return axios.put(`/carPoint/${id}/${status}`)
}

export function deletePoint(id: string) {
  return axios.delete(`/carPoint/${id}`)
}
