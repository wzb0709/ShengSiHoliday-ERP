import axios from 'axios'

export function getPaymentList(id:string,page:number,size:number) {
  const params = {
    id,page,size
  }
  return axios.get(`/payment`,{params})
}

interface IPaymentItem {
  payment_source:number,
  payment_money:number,
  remark:string,
  pay_type:number
}

export function addPayment(item:IPaymentItem) {
  return axios.post(`/payment`,item)
}

export function updatePayment(item:IPaymentItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/payment`,params)
}

export function deletePayment(id:string) {
  return axios.delete(`/payment/${id}`)
}

export function getPaymentSource() {
  return axios.get(`/payment/paymenysource`)
}
