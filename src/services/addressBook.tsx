import axios from 'axios'

export function getAddressBookList() {
  return axios.get('/sysConfig/employees')
}

