import axios from 'axios'

export function getWithdrawList(search:string,status:number,start_time:string,end_time:string,page:number,size:number) {
  const params = {
    search,status,start_time,end_time,page,size
  }
  return axios.get(`/withdrawal`,{params})
}

export function addWithdraw(item:any) {
  return axios.post(`/withdrawal`,item)
}

export function updateWithdrawStatus(id:string,status:number) {
  const params = {
    id,status
  }
  return axios.put(`/withdrawal/status`,params)
}

export function deleteWithdraw(id:string) {
  return axios.delete(`/withdrawal/${id}`)
}

export function getStatistical(search:string,status:number,start_time:string,end_time:string) {
  const params = {
    search,status,start_time,end_time
  }
  return axios.get(`/withdrawal/statistical`,{params})
}

export function excelExport(search:string,status:number,start_time:string,end_time:string) {
  const params = {
    search,status,start_time,end_time
  }
  return axios.get(`/report/withdrawal`,{params})
}
