import axios from 'axios'

export function getAddressBookList(search:string) {
  return axios.get('/sysConfig/employees')
}

