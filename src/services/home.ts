import axios from 'axios'

export function getTodo(id:string | null) {
  return axios.get(`/main/todo/${id}`)
}

export function getUnPaid(id:string | null) {
  return axios.get(`/main/unpaid/${id}`)
}

export function showNotice(page:number,size:number) {
  return axios.get(`/main/shownotice`)
}
