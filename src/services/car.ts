import axios from 'axios'

export function getCarList(site:number,is_driver:number,rental_time_type:number,page:number,size:number) {
  const params = {
    site,is_driver,rental_time_type,page,size
  }
  return axios.get('/carRental',{params})
}

interface ICarItem {
  site_num:number,
  is_driver:number,
  rental_time_type:number,
  rental_price:number,
  rental_commission:number
}

export function updateCar(item:ICarItem,id:string) {
  const params = {...item,id}
  return axios.put('/carRental',params)
}

export function addCar(item:ICarItem) {
  return axios.post('/carRental',item)
}

export function updateStatus(id:string,status:number) {
  return axios.put(`/carRental/${id}/${status}`)
}

export function deleteCar(id:string) {
  return axios.delete(`/carRental/${id}`)
}
