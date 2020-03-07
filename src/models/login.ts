import * as loginServices from '@/services/login'
import axios from 'axios'
import { message } from 'antd'
import { router } from 'umi'
import { getAllList } from '@/utils/common'

export interface IUserInfo {
  id:string,
  user_name:string,
  dept_name:string,
  head_img:string,
  phone:string,
  position:string,
  issale:boolean,
  isop:boolean,
  roleList:Array<IRole>
}

export interface IMember {
  id:string,
  name:string,
  phone:string,
  dept_id:number,
  department_name:string,
  position:string,
  is_sales:boolean,
  is_op:boolean,
}

interface IRole {
  authList:Array<IAuth>
  id:number,
  title:string
}

interface IAuth {
  id:number,
  title:string
}

export default {
  namespace: 'login',
  state: {
    userInfo: {},
    memberList:[]
  },
  reducers: {
    setUserInfo(state: any, { payload: {userInfo,memberList}} : {payload:{userInfo:IUserInfo,memberList:Array<IMember>}}) {
      return {userInfo,memberList}
    },
  },
  effects: {
    * userLogin({ payload: { account, pwd } }: { payload: { account: string, pwd: string } }, { call, put }: any) {
      const res = yield call(() => loginServices.userLogin({account,pwd}))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.token
      localStorage.setItem('token',res.token)
      localStorage.setItem('id',res.id)
      yield put({type:'getUserInfo',payload:{id:res.id}})
      message.success('登录成功！')
      router.push('/')
    },
    * getUserInfo({},{call,put}:any){
      const res = yield call(() => loginServices.getUserInfo())
      if(!res.id || res.id === '' || res.id == null){
        message.error('您还没有登录，即将跳转至登录界面')
        router.replace('/login')
        return Promise.reject('用户未登录')
      }
      const res2 = yield call(() => getAllList())
      yield put({type:'setUserInfo',payload:{userInfo:res,memberList:res2}})
    }
  },
}
