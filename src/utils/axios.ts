import axios from 'axios'
import { message } from 'antd'
import {router} from 'umi'

function axiosConfig() {
  axios.defaults.baseURL = 'http://test.allentravel.cn/api'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response.data
  }, function(error) {
    // 对响应错误做点什么
    // console.log(error.response)
    if(error.response){
      if(error.response.status === 401){
        router.replace('/login')
        message.destroy()
        message.error('登陆授权已过期!请重新登陆')
      }
      if(error.response.data){
        message.error(error.response.data.toString())
      }
    }
    return Promise.reject(error)
  })
}

export default axiosConfig
