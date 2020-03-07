import axios from 'axios'

export function getFeeList(id:string,page:number,size:number) {
  const params = {
    id,page,size
  }
  return axios.get(`/fee`,{params})
}

interface IFeeItem {
  fee_type:number,
  fee_summary:string,
  fee_price:string,
}

export function addFee(item:IFeeItem) {
  return axios.post(`/fee`,item)
}

export function updateFee(item:IFeeItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/fee`,params)
}

export function deleteFee(id:string) {
  return axios.delete(`/fee/${id}`)
}
