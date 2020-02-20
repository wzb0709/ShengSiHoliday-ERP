import axios from 'axios'

export function getScenicList(search:string,status:number,page:number,size:number) {
  const params = {
    status,search,page,size
  }
  return axios.get(`/scenic`,{params})
}

interface IScenicItem {
  scenic_title:string,
  scenic_pics:string,
  scenic_address:string,
  scenic_time:string,
  food_phones:string,
  lat:string,
  lgt:string
}

export function updateScenic(item:IScenicItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/scenic`,params)
}

export function addScenic(item:IScenicItem) {
  return axios.post('/scenic',item)
}
export function updateScenicStatus(id:string,status:number) {
  return axios.put(`/scenic/${id}/${status}`)
}
export function deleteScenic(id:string) {
  return axios.delete(`/scenic/${id}`)
}

export function getScenicInfo(id:string) {
  return axios.get(`/scenic/detail?id=${id}`)
}
