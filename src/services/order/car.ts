import axios from 'axios'

interface IParams {
  search:string,
  carid:string,
  price_type:number,
  getId:string,
  backId:string,
  status:number,
  start_time:string,
  end_time:string,
  page:number,
  size:number
}

export function getCarOrder(params:IParams) {
  return axios.get(`/rentalOrder`,{params})
}

interface ICarOrderItem {
  plate_number:string,
  back_car_point_id:string,
  get_car_point_id:string,
  price_type:string,
  start_time:string,
  end_time:string
}

export function updateOrder(item:ICarOrderItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/rentalOrder`,params)
}

export function getCarOrderInfo(id:string) {
  return axios.get(`/rentalOrder/detail/${id}`)
}

export function updateCarType(orderid:string,proid:string) {
  return axios.put(`/rentalOrder?orderid=${orderid}&proid=${proid}`)
}
