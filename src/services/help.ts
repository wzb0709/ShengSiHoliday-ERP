import axios from 'axios'

export function getTipsList(search:string,page:number,size:number) {
  const params = {
    search,page,size
  }
  return axios.get('/tips',{params})
}

interface ITipsItem {
  tips_title:string,
  tips_author:string,
  tips_content:string,
}

export function updateTips(item:ITipsItem,id:string) {
  const params = {...item,id}
  return axios.put('/tips',params)
}

export function addTips(item:ITipsItem) {
  return axios.post('/tips',item)
}

export function updateTipsStatus(id:string,status:number) {
  return axios.put(`/tips/${id}/${status}`)
}

export function deleteTips(id:string) {
  return axios.delete(`/tips/${id}`)
}


