import React, { FC, useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Col, message, Row } from 'antd'
import moment from 'moment'
import InfoModal from '@/pages/administrative/person/infoModal'
import PasswordModal from '@/pages/administrative/person/passwordModal'

import axios from 'axios'
import { getDeptInfo } from '@/services/common'
import { router } from 'umi'

const PersonInfo: FC = (props) => {


  const [userInfo,setUserInfo] = useState<any>({})

  const [visible,setVisible] = useState<boolean>(false)
  const [pwdVisible,setPwdVisible] = useState<boolean>(false)
  const [deptList,setDeptList] = useState<any>([])

  const getBasicInfo = useCallback(() => {
    axios.get(`/sysUser/${localStorage.getItem('id')}`).then(res=>{
      setUserInfo(res)
    })
  },[localStorage.getItem('id')])

  useEffect(() => {
    getBasicInfo()
    getDeptInfo().then(res=>{
      setDeptList(res)
    })
  },[getBasicInfo])

  const handleConfirmBasicInfo = (values:any) => {
    axios.post(`/main/userdata`,{...values}).then(() => {
      message.success('编辑成功！')
      setVisible(false)
      getBasicInfo()
    })
  }

  const handleConfirmPassword = (values:any) => {
    axios.post(`/main/updatepwd`,{...values}).then(() => {
      message.success('编辑成功！')
      setPwdVisible(false)
      router.replace('/login')
      localStorage.clear()
    })
  }

  return (
    <>
      {userInfo.head_img !== '' && <Avatar size={80} src={userInfo.head_img}/>}
      {userInfo.head_img === '' && <Avatar size={80} style={{ backgroundColor: '#87d068' }} icon="user"/>}
      <Row style={{marginTop:20}}>
        <Col span={12}>
          姓名：{userInfo.user_name}
        </Col>
        <Col span={12}>
          生日：{userInfo.birth_day ? moment(userInfo.birth_day).format('YYYY-MM-DD') : ''}
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col span={12}>
          联系方式：{userInfo.phone}
        </Col>
        <Col span={12}>
          所属部门：{userInfo.position}
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col span={12}>
          职位：{deptList.find((item:any) => item.id === userInfo.department_id) && deptList.find((item:any) => item.id === userInfo.department_id).department_name}
        </Col>
        <Col span={12}>
          账号：{userInfo.account}
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col span={4}>
          <Button type='primary'>编辑资料</Button>
        </Col>
        <Col span={4}>
          <Button type='primary'>修改密码</Button>
        </Col>
      </Row>

      <InfoModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirmBasicInfo}
        initialValue={userInfo}
      />
      <PasswordModal
        visible={pwdVisible}
        onCancel={() => setPwdVisible(false)}
        onOk={handleConfirmPassword}
      />
    </>
  )
}

export default PersonInfo
