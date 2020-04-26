import axios from 'axios'

export function getExpenseList(search:string,status:number,start_time:string,end_time:string,page:number,size:number) {
  const params = {
    search,status,start_time,end_time,page,size
  }
  return axios.get(`/expense`,{params})
}

export function updateExpense(item:any,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/expense`,params)
}

export function addExpense(item:any) {
  return axios.post(`/expense`,item)
}

export function updateExpenseStatus(id:string,status:number,status_summary?:string) {
  const params = {
    id,status,status_summary
  }
  return axios.put(`/expense/status`,params)
}

export function deleteExpense(id:string) {
  return axios.delete(`/expense/${id}`)
}

export function getExpenseInfo(id:string) {
  return axios.get(`/expense/detail/${id}`)
}

export function getAuditExpenseList(search:string,status:number,start_time:string,end_time:string,page:number,size:number) {
  const params = {
    search,status,start_time,end_time,page,size
  }
  return axios.get(`/expense/audit`,{params})
}

export function getStatistical(type:number,search:string,status:number,start_time:string,end_time:string) {
  const params = {
    type,status,search,start_time,end_time
  }
  return axios.get(`/expense/statistical`,{params})
}


export function getDetailList(expenseid:string,page:number,size:number) {
  const params = {
    expenseid,page,size
  }
  return axios.get(`/expenseDetail`,{params})
}
export function updateDetailInfo(item:any,id:string) {
  const params = {...item,id}
  return axios.put(`/expenseDetail`,params)
}

export function addDetailInfo(item:any) {
  const params = {...item}
  return axios.post(`/expenseDetail`,params)
}

export function deleteDetailInfo(id:string) {
  return axios.delete(`/expenseDetail/${id}`)
}

export function excelExport(search:string,status:number,start_time:string,end_time:string) {
  const params = {
    search,status,start_time,end_time
  }
  return axios.get(`/report/expense`,{params})
}
