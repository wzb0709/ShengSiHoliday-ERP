import axios from 'axios'

interface IParams {
  search:string,
  status:number,
  op_id:string,
  start_time:string,
  end_time:string,
  page:number,
  size:number
}

export function getOneDayList(item:IParams){
  const params = {...item}
  return axios.get(`/product/list`,{params})
}

interface IOneDayItem {
  product_title:string
  product_sub_title:string
  create_id:string
  product_img:string
  fee_desc:string
  announcements:string
  warm_prompt:string
  product_tag:string
  travel_person:number
}

export function updateOneDay(item:IOneDayItem,id:string) {
  return axios.put(`/product/${id}`,item)
}

export function addOneDay(item:IOneDayItem) {
  return axios.post(`/product`,item)
}

export function getOneDayInfo(id:string) {
  return axios.get(`/product/${id}`)
}

export function deleteOneDay(id:string) {
  return axios.delete(`/product/${id}`)
}

export function updateOneDayStatus(id:string,status:number) {
  return axios.put(`/product/${id}/${status}`)
}

export function getPackageList(id:string) {
  return axios.get(`/productPackage/${id}`)
}

interface IPackageItem {
  package_title:string,
  product_id:string,
  package_summary:string,
  package_child_price:number,
  package_child_commission:number,
  package_adult_price:number,
  package_adult_commission:number,
  package_count:number,
  advance_booking:string,
  persistence_time:string,
  start_time:string
}

export function addPackage(item:IPackageItem) {
  return axios.post(`/productPackage`,item)
}

export function updatePackage(item:IPackageItem,id:string) {
  return axios.put(`/productPackage/${id}`,item)
}

export function updatePackageStatus(id:string,status:number) {
  return axios.put(`/productPackage/${id}/${status}`)
}

export function deletePackage(id:string) {
  return axios.delete(`/productPackage/${id}`)
}


export function getOtherPackageList(id:string) {
  return axios.get(`/productExtraPackage/${id}`)
}

interface IOtherPackageItem {
  package_title:string,
  product_id:string,
  package_price:number,
  package_commission:number,
}

export function addOtherPackage(item:IOtherPackageItem) {
  return axios.post(`/productExtraPackage`,item)
}

export function updateOtherPackage(item:IOtherPackageItem,id:string) {
  return axios.put(`/productExtraPackage/${id}`,item)
}

export function updateOtherPackageStatus(id:string,status:number) {
  return axios.put(`/productExtraPackage/${id}/${status}`)
}

export function deleteOtherPackage(id:string) {
  return axios.delete(`/productExtraPackage/${id}`)
}

export function copyProduct(id:string) {
  return axios.put(`/product/copy?id=${id}`)
}

export function getPlan(productid:string,month?:number) {
  const params = {
    productid,month
  }
  return axios.get('/productDate',{params})
}

