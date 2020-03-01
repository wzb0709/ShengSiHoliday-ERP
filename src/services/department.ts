import axios from 'axios'

export function getDepartmentList(search:string,page:number,size:number) {
  const params = {
    search,page,size
  }
  return axios.get('/department',{params})
}

interface IDepartmentItem {
  car_title:string,
}

export function updateDepartment(item:IDepartmentItem,id:string) {
  const params = {...item,id}
  return axios.put('/department',params)
}

export function addDepartment(item:IDepartmentItem) {
  return axios.post('/department',item)
}

export function deleteDepartment(id:string) {
  return axios.delete(`/department/${id}`)
}
