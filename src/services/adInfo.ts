import axios from 'axios'

interface IAdInfo {
  locationid: string
  search: string,
  type: number,
  dType: number,
  status: number,
  page: number
  size: number
}

export interface IAdInfoItem {
  advertising_title: string,
  advertising_type: number,
  detail_type: number,
  advertising_url:string,
  sort: number,
  location_id: string
}

export function getAdInfoList({ locationid, search, size, status, type, dType, page }: IAdInfo) {
  const params = {
    locationid, search, status, size, page, type, dType,
  }
  return axios.get('/advertising', { params })
}

export function updateAdInfo(item: IAdInfoItem, id: string) {
  const params = { ...item, id }
  return axios.put('/advertising', params)
}

export function addAdInfo(item: IAdInfoItem) {
  return axios.post('/advertising', item)
}

export function updateAdStatus(id: string, status: number) {
  return axios.put(`/advertising/${id}/${status}`)
}

export function deleteAdInfo(id: string) {
  return axios.delete(`/advertising/${id}`)
}
