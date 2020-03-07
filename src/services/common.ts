import axios from 'axios'

export function getUploadData() {
  return axios.get('/aliyunOss/GetUpload')
}

export function getImgList(id:string) {
  return axios.get(`/contentDetail/${id}`)
}

export function setImgList(id:string,detailList:Array<any>) {
  return axios.put(`/contentDetail/${id}`,detailList)
}

export function getDeptInfo() {
  return axios.get(`/sysConfig/dept`)
}

export function getEmployees() {
  return axios.get(`/sysConfig/employees`)
}

export function changeMember(id:string,userid:string,type:number) {
  const params = {
    id,userid,type
  }
  return axios.put(`/baseOrder/changesaleop`,params)
}

export function getBasicOrderInfo(id:string) {
  return axios.get(`/baseOrder?id=${id}`)
}


export function updateBasicOrderInfo(item:any) {
  return axios.put(`/baseOrder`,item)
}

export function updateOrderStatus(id:string,status:number) {
  const params = {
    id,status
  }
  return axios.put(`/baseOrder/status`,params)
}

export function getExpressList() {
  return axios.get(`/sysConfig/expresscompany`)
}

export function getExpressInfo(expressno :string) {
  return axios.get(`/express/${expressno}`)
}
