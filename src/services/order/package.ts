import axios from 'axios'

export function getPackageList(orderid:string) {
  return axios.get(`/orderPackage?orderid=${orderid}`)
}

interface IPackageItem {
  adult_count:number,
  child_count:number,
  price:number,
}

export function addPackage(item:IPackageItem) {
  return axios.post(`/orderPackage`,item)
}

export function updatePackage(item:IPackageItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/orderPackage`,params)
}

export function deletePackage(id:string) {
  return axios.delete(`/orderPackage/${id}`)
}
