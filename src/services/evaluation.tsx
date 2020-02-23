import axios from 'axios'

interface IParams {
  id:string,
  status:number,
  is_virtual:number,
  start_time:string,
  end_time:string,
  page:number,
  size:number
  content_type:number
}

export function getEvaluationList(item:IParams) {
  const params = {...item}
  return axios.get(`/memberEvaluation`,{params})
}

interface IEvaluation {
  evaluation_content:string,
  evaluation_imgs:string,
  score:number
}
export function updateEvaluation(item:IEvaluation,id:string) {
  const params = {
    ...item,id
  }
  return axios.put(`/memberEvaluation`,params)
}

export function addEvaluation(item:IEvaluation) {
  return axios.post(`/memberEvaluation`,item)
}

export function updateEvaluationStatus(id:string,status:number) {
  return axios.put(`/memberEvaluation/${id}/${status}`)
}

export function deleteEvaluation(id:string) {
  return axios.delete(`/memberEvaluation/${id}`)
}
