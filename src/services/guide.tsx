import axios from 'axios'

export function getGuideList(search:string,status:number,type:number,page:number,size:number) {
  const params = {search,size,page,status,type}
  return axios.get('/guide',{params})
}

interface IGuideItem {
  tour_name:string,
  tour_phone:string,
  tour_start:string,
  tour_type:number,
}

export function updateGuide(item:IGuideItem,id:string) {
  const params = {
    ...item,
    id
  }
  return axios.put(`/guide`,params)
}

export function addGuide(item:IGuideItem) {
  const params = {
    ...item,
  }
  return axios.post(`/guide`,params)
}

export function updateGuideStatus(id:string,status:number) {
  return axios.put(`/guide/status?id=${id}&status=${status}`)
}

export function deleteGuide(id:string) {
  return axios.delete(`/guide/${id}`)
}

export function getGuideDetails(id:string) {
  return axios.get(`/guide/detail/${id}`)
}
