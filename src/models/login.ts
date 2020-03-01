import * as loginServices from '@/services/login'
import axios from 'axios'
import { message } from 'antd'
import { router } from 'umi'

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
  },
  reducers: {
    setUserInfo(state: any, { payload: userInfo }: { payload: IUserInfo }) {
      return {userInfo}
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
      yield put({type:'setUserInfo',payload:res})
    }
  },
}
