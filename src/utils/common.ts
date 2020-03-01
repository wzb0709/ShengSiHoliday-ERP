import * as commonServices from '@/services/common'


export async function getSaleList () {
  let list:any = []
  await commonServices.getEmployees().then((res:any)=>{
    res.forEach((item:any)=>{
      if(item.is_sales){
        list.push(item)
      }
    })
  })
  return list
}

export async function getOpList() {
  let list:any = []
  await commonServices.getEmployees().then((res:any)=>{
    res.forEach((item:any)=>{
      if(item.is_op){
        list.push(item)
      }
    })
  })
  return list
}

export async function getAllList() {
  let list:any = []
  await commonServices.getEmployees().then((res:any)=>{
    res.forEach((item:any)=>{
        list.push(item)
    })
  })
  return list
}

export async function getMemberName(id:string) {
  let name:string = ''
  await commonServices.getEmployees().then((res:any)=>{
    res.forEach((item:any)=>{
      if(item.id === id) name = item.name
    })
  })
  return name
}

