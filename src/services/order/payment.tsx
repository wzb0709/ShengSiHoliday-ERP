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

export function getAudit(type:number,status:number,start_time:string,end_time:string,page:number,size:number) {
  const params = {
    type,status,start_time,end_time,page,size
  }
  return axios.get(`/payment/audit`,{params})
}

export function judgePayment(item:any,id:string,type:number) {
  const params = {
    ...item,id
  }
  return axios.put(`/payment/audit/${type}`,item)
}

export function getStatistical(type:number,status:number,start_time:string,end_time:string) {
  const params = {
    type,status,start_time,end_time
  }
  return axios.get(`/payment/statistical`,{params})
}

export function excelExport(type:number,search:string,sourceid:string,status:number,start_time:string,end_time:string) {
  const params = {
    search,status,start_time,end_time,sourceid,type
  }
  return axios.get(`/report/expense`,{params})
}
