import axios from 'axios'

export function getTodo() {
  return axios.get(`/main/todo`)
}

export function getUnPaid() {
  return axios.get(`/main/unpaid`)
}

export function showNotice(page:number,size:number) {
  return axios.get(`/main/shownotice`)
}
