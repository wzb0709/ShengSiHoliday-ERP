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
