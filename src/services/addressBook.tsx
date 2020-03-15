import axios from 'axios'

export function getAddressBookList(search:string) {
  const params = {search}
  return axios.get('/sysConfig/employees',{params})
}

