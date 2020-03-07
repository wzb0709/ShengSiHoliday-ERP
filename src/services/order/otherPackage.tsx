import axios from 'axios'

export function getPackageList(orderid:string) {
  return axios.get(`/orderExtraPackage?orderid=${orderid}`)
}

interface IPackageItem {
  count:number,
}

export function addPackage(item:IPackageItem) {
  return axios.post(`/orderExtraPackage`,item)
}

export function updatePackage(item:IPackageItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/orderExtraPackage`,params)
}

export function deletePackage(id:string) {
  return axios.delete(`/orderExtraPackage/${id}`)
}
