import axios from 'axios'

export function getNoticeList(search: string, page: number, size: number) {
  const params = {
    size, search, page,
  }
  return axios.get(`/noticeInfo`, { params })
}

interface INoticeItem {
  notice_title: string,
  notice_content: string
}

export function updateNotice(item: INoticeItem, id: string) {
  const params = {
    ...item, id,
  }
  return axios.put(`/noticeInfo`, params)
}

export function addNotice(item: INoticeItem) {
  const params = {
    ...item,
  }
  return axios.post(`/noticeInfo`, params)
}

export function updateNoticeStatus(id: string, status: number) {
  return axios.put(`/noticeInfo/${id}/${status}`)
}

export function deleteNotice(id: string) {
  return axios.delete(`/noticeInfo/${id}`)
}
