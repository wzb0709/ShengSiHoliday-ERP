import axios from 'axios'

export function getUploadData() {
  return axios.get('/aliyunOss/GetUpload')
}
