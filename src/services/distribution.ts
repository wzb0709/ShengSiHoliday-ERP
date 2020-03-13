import axios from 'axios'

export function getDistributionList(search:string,status:number,start_time:string,end_time:string,page:number,size:number) {
  const params = {
    search,status,start_time,end_time,page,size
  }
  return axios.get(`/distribution`,{params})
}
export function updateDistributionInfo(item:any,id:string) {
  const params = {...item,id}
  return axios.put(`/distribution`,params)
}

export function addDistributionInfo(item:any) {
  const params = {...item}
  return axios.post(`/distribution`,item)
}

export function updateDistributionStatus(id:string,status:number) {
  return axios.put(`/distribution/status?id=${id}&status=${status}`)
}

export function deleteDistributionInfo(id:string) {
  return axios.delete(`/distribution/${id}`)
}

export function getDistributionInfo(id:string) {
  return axios.get(`/distribution/detail/${id}`)
}



export function getCardList(id:string) {
  const params = {
    id
  }
  return axios.get(`/distributionCard`,{params})
}
export function updateCardInfo(item:any,id:string) {
  const params = {...item,id}
  return axios.put(`/distributionCard`,params)
}

export function addCardInfo(item:any) {
  const params = {...item}
  return axios.post(`/distributionCard`,item)
}

export function deleteCardInfo(id:string) {
  return axios.delete(`/distributionCard/${id}`)
}

