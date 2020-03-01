import axios from 'axios'

export function userLogin({account,pwd}:{account:string,pwd:string}) {
  const params = { account,pwd }
  return axios.get('/login',{params})
}

export function getUserInfo() {
  return axios.get(`/login/token`)
}
