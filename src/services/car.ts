import axios from 'axios'

export function getCarList(search:string,status:number,page:number,size:number) {
  const params = {
    search,status,page,size
  }
  return axios.get('/carInfo',{params})
}

interface ICarItem {
  car_title:string,
  car_pic:string,
  car_site:number,
  time_price:number,
  day_price:number
}

export function updateCar(item:ICarItem,id:string) {
  const params = {...item,id}
  return axios.put('/carInfo',params)
}

export function addCar(item:ICarItem) {
  return axios.post('/carInfo',item)
}

export function updateStatus(id:string,status:number) {
  return axios.put(`/carInfo/${id}/${status}`)
}

export function deleteCar(id:string) {
  return axios.delete(`/carInfo/${id}`)
}
