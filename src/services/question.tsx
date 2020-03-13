import axios from 'axios'

export function getQuestionList(search:string,status:number,page:number,size:number) {
  const params = {
    search,page,size
  }
  return axios.get('/question',{params})
}

interface IQuestionItem {
  question_title:string,
  question_content:string,
}

export function updateQuestion(item:IQuestionItem,id:string) {
  const params = {...item,id}
  return axios.put('/question',params)
}

export function addQuestion(item:IQuestionItem) {
  return axios.post('/question',item)
}

export function updateQuestionStatus(id:string,status:number) {
  return axios.put(`/question/${id}/${status}`)
}

export function deleteQuestion(id:string) {
  return axios.delete(`/question/${id}`)
}


