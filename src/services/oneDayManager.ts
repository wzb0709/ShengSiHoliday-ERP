import axios from 'axios'

export function getPlan(productid:string,month:number) {
  const params = {
    productid,month
  }
  return axios.get('/productDate',{params})
}

interface IPlanItem {
  date_array:Array<string>
  product_id:string
  packages:IPackageItem
}

interface IPackageItem {
  id:string,
  product_id:string,
  package_title:string,
  package_summary:string,
  is_show:number,
  package_price:number,
  package_commission:number,
  package_count:number,
  advance_booking:number,
  persistence_time:number,
  start_time:number
}

export function addPlan(item:IPlanItem) {
  return axios.post('/productDate',item)
}

interface IPlanPackage {
  date_id:string,
  package_id:string,
  package_count:number,
  package_price:number,
  package_commission:number
}

export function updatePlanPackage(item:IPlanPackage,id:string) {
  return axios.put(`/productDate/${id}`,item)
}

export function deletePlan(id:string) {
  return axios.delete(`/productDate/${id}`)
}

export function updatePlanStatus(id:string,status:number) {
  return axios.put(`/productDate/${id}/${status}`)
}

export function getPlanList(search:string,status:number,start_time:string,end_time:string,op_id:string,page:number,size:number) {
  const params = {
    search,status,start_time,end_time,page,size,op_id
  }
  return axios.get('/productDatePackage',{params})
}

export function getPlanPackage(prodateid:string) {
  return axios.get(`/productDatePackage/date/${prodateid}`)
}

export function getPlanInfo(id:string) {
  return axios.get(`/productDatePackage/datail/${id}`)
}

export function deletePlanPackage(id:string) {
  return axios.delete(`/productDate/package/${id}`)
}

export function updatePlanPackageStatus(id:string,status:number) {
  return axios.put(`/productDate/package/${id}/${status}`)
}

export function addPlanPackage(item:any) {
  return axios.post(`/productDate/addpackage`,item)
}
