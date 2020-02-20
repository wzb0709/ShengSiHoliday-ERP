import axios from 'axios'

export function getFoodList(search:string,status:number,page:number,size:number) {
  const params = {
    status,search,page,size
  }
  return axios.get(`/food`,{params})
}

interface IFoodItem {
  food_title:string,
  food_pics:string,
  food_address:string,
  food_time:string,
  food_phones:string,
  lat:string,
  lgt:string
}

export function updateFood(item:IFoodItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/food`,params)
}

export function addFood(item:IFoodItem) {
  return axios.post('/food',item)
}
export function updateFoodStatus(id:string,status:number) {
  return axios.put(`/food/${id}/${status}`)
}
export function deleteFood(id:string) {
  return axios.delete(`/food/${id}`)
}

export function getFoodInfo(id:string) {
  return axios.get(`/food/detail?id=${id}`)
}
