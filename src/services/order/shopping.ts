import axios from 'axios'

export function getShoppingOrderList(search:string,status:number,sear_time:string,end_time:string,page:number,size:number) {
  const params = {
    status,search,sear_time,end_time,page,size
  }
  return axios.get(`/shopOrder`,{params})
}

interface IShoppingOrderItem {
  consignee_name:string,
  consignee_phone:string,
  consignee_address:string,
  logistics_company_id:string,
  logistics_no:string
}

export function updateShoppingOrder(item:IShoppingOrderItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/shopOrder`,params)
}

export function getShoppingOrderInfo(id:string) {
  return axios.get(`/shopOrder/detail/${id}`)
}

export function getPackageList(orderid:string) {
  return axios.get(`/shopOrderPackage?orderid=${orderid}`)
}

interface IPackageItem {
  count:number,
}

export function addPackage(item:IPackageItem) {
  return axios.post(`/shopOrderPackage`,item)
}

export function updatePackage(item:IPackageItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/shopOrderPackage`,params)
}

export function deletePackage(id:string) {
  return axios.delete(`/shopOrderPackage/${id}`)
}

