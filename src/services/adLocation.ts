import axios from 'axios'

export function getAdvertisingLocationList({page,size,status,search}:{page:number,size:number,status:number,search:string}) {
  const params = {page,size,status,search}
  return axios.get('/advertisingLocation',{params})
}

export function updateAdvertisingLocation({advertising_title,id}:{advertising_title:string,id:string}) {
  const params = {id,advertising_title}
  return axios.put('/advertisingLocation',params)
}

export function addAdvertisingLocation({advertising_title}:{advertising_title:string}) {
  const params = {advertising_title}
  return axios.post('/advertisingLocation',params)
}

export function updateAdvertisingLocationStatus({status,id}:{status:number,id:string}) {
  return axios.put(`/advertisingLocation/${id}/${status}`)
}

export function deleteAdvertisingLocation({id}:{id:string}) {
  return axios.put(`/advertisingLocation/${id}`)
}
