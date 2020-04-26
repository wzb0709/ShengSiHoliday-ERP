import axios from 'axios'

export function getSettleList(search:string,status:number,opid:string,settle_date:string,page:number,size:number) {
  const params = {
    search,status,opid,settle_date,page,size
  }
  return axios.get(`/settle`,{params})
}

interface ISettleItem {
  settle_title:string,
  settle_date:string
}

export function updateSettle(item:ISettleItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/settle`,params)
}

export function updateSettleStatus(item:any) {
  return axios.put(`/settle/status`,item)
}

export function addSettle(item:ISettleItem) {
  return axios.post(`/settle`,item)
}

export function getSettleInfo(id:string) {
  return axios.get(`/settle/detail/${id}`)
}

export function getWaitSettleOrder(ordertype:number,search:string,page:number,size:number) {
  const params = {
    ordertype,search,page,size
  }
  return axios.get(`/settle/order`,{params})
}

export function deleteSettle(id:string) {
  return axios.delete(`/settle/${id}`)
}

export function getStatistical(search:string,status:number,opid:string,settle_date:string) {
  const params = {
    search,status,opid,settle_date
  }
  return axios.get(`/settle/statistical`,{params})
}

export function excelExport(search:string,status:number,opid:string,settle_date:string) {
  const params = {
    search,status,opid,settle_date
  }
  return axios.get(`/report/settle`,{params})
}
