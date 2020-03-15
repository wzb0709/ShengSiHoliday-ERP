import axios from 'axios'

export function getShoppingList(search:string,status:number,page:number,size:number) {
  const params = {
    search,size,status,page
  }
  return axios.get(`/shopProduct/list`,{params})
}

export function getShoppingInfo(id:string) {
  return axios.get(`/shopProduct/detail/${id}`)
}

interface IShoppingItem {
  shop_title:string,
  shop_subtitle:string,
  buy_person:number,
  shop_pics:string,
  shop_tags:string,
  warm_prompt:string,
  create_id?:string
}

export function updateShopping(item:IShoppingItem,id:string) {
  const params = {...item,id}
  return axios.put(`/shopProduct`,params)
}

export function addShopping(item:IShoppingItem) {
  return axios.post(`/shopProduct`,item)
}

export function updateShoppingStatus(id:string,status:number) {
  return axios.put(`/shopProduct/${id}/${status}`)
}
export function deleteShopping(id:string) {
  return axios.delete(`/shopProduct/${id}`)
}

export function getShoppingPackage(id:string) {
  return axios.get(`/shopPackage?id=${id}`)
}

interface IShoppingPackageItem {
  package_title:string,
  product_id:string,
  package_price:number,
  package_commission:number,
  package_count:number
}

export function addShoppingPackage(item:IShoppingPackageItem) {
  return axios.post(`/shopPackage`,item)
}

export function updateShoppingPackage(item:IShoppingPackageItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/shopPackage`,params)
}

export function updateShoppingPackageStatus(id:string,status:number) {
  return axios.put(`/shopPackage/${id}/${status}`)
}

export function deleteShoppingPackage(id:string) {
  return axios.delete(`/shopPackage/${id}`)
}

export function copyProduct(id:string) {
  return axios.put(`/shopProduct/copy?id=${id}`)
}
