import axios from 'axios'

export function getCustomerList(search:string,status:number,opid:string,page:number,size:number) {
  const params = {search,size,page,status,opid}
  return axios.get('/costomerTravel',{params})
}

interface ICustomerItem {
  travel_title:string,
  travel_subtitle:string,
  travel_tags:string,
  travel_person:number,
  travel_recommend:string,
  travel_price:number,
  travel_pics:string,
  create_id:string
}

export function updateCustomer(item:ICustomerItem,id:string) {
  const params = {
    ...item,
    id
  }
  return axios.put(`/costomerTravel`,params)
}

export function addCustomer(item:ICustomerItem) {
  const params = {
    ...item,
  }
  return axios.post(`/costomerTravel`,params)
}

export function updateCustomerStatus(id:string,status:number) {
  return axios.put(`/costomerTravel/${id}/${status}`)
}

export function deleteCustomer(id:string) {
  return axios.delete(`/costomerTravel/${id}`)
}

export function getCustomerDetails(id:string) {
  return axios.get(`/costomerTravel/detail/${id}`)
}

export function copyProduct(id:string) {
  const params = {id}
  return axios.put(`/costomerTravel/copy`,params)
}
