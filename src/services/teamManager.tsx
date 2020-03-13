import axios from 'axios'

interface IParams {
  search:string,
  guideid:string,
  opid:string,
  start_time:string,
  end_time:string,
  month:string,
  page:number,
  size:number
}

export function getGroupTeamList(params:IParams) {
  return axios.get(`/groupTeam`,{params})
}

interface IGroupTeamItem {
  team_no:string,
  team_title:string,
  trave_date:string,
  order_count:number,
  guide_id:string,
}

export function updateGroupTeam(item:IGroupTeamItem,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/groupTeam`,params)
}

export function addGroupTeam(item:IGroupTeamItem) {
  return axios.post(`/groupTeam`,item)
}

export function deleteGroupTeam(id:string) {
  return axios.delete(`/groupTeam/${id}`)
}

export function getGroupTeamDetail(id:string) {
  return axios.get(`/groupTeam/detail/${id}`)
}

export function getWaitOrder(ordertype:number,trave_date:string,page:number,size:number) {
  const params = {
    ordertype,trave_date,page,size
  }
  return axios.get(`/groupTeam/waitorder`,{params})
}

export function getGroupOrderList(groupid:string,page:number,size:number) {
  const params = {
    groupid,page,size
  }
  return axios.get(`/groupTeam/order`,{params})
}

export function addGroupOrder(groupid:string,orderids:Array<string>) {
  return axios.post(`/groupTeam/order/${groupid}`,orderids)
}

export function deleteGroupTeamOrder(id:string) {
  return axios.delete(`/groupTeam/order/${id}`)
}
