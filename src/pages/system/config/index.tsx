import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, message } from 'antd'
import ConfigBasic from '@/pages/system/config/basic'
import * as configServices from '@/services/config'
import * as couponServices from '@/services/coupon'
import ConfigBack from '@/pages/system/config/back'
import ConfigCoupon from '@/pages/system/config/coupon'

const Config:FC = (props) => {

  const [basicInfo,setBasicInfo] = useState<any>({})
  const [couponList,setCouponList] = useState<any>([])

  const getBasicInfo = useCallback(() => {
    configServices.getConfig().then(res=>{
      setBasicInfo(res)
    })
  },[])
  useEffect(() => {
    getBasicInfo()
    couponServices.getAllCouponList().then(res=>{
      setCouponList(res)
    })
  },[getBasicInfo])


  const handleConfirm = (values:any) => {
    configServices.updateConfig({...values}).then(() => {
      message.success('操作成功！')
      getBasicInfo()
    })
  }

  return (
    <>
      <ConfigBasic onOk={handleConfirm} initialValue={basicInfo} />
      <ConfigBack onOk={handleConfirm} initialValue={basicInfo} />
      <ConfigCoupon onOk={handleConfirm} initialValue={basicInfo} couponList={couponList} />
    </>
  )
}

export default Config
