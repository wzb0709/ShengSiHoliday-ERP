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
    configServices.getConfig().then((res:any)=>{
      if(res.register_coupons !== '') res.register_coupons = JSON.parse(res.register_coupons)
      if(res.group_order_coupons !== '') res.group_order_coupons = JSON.parse(res.group_order_coupons)
      if(res.shop_order_coupons !== '') res.shop_order_coupons = JSON.parse(res.shop_order_coupons)
      if(res.car_order_coupons !== '') res.car_order_coupons = JSON.parse(res.car_order_coupons)
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
    if(values.register_coupons) values.register_coupons = JSON.stringify(values.register_coupons)
    if(values.group_order_coupons) values.group_order_coupons = JSON.stringify(values.group_order_coupons)
    if(values.shop_order_coupons) values.shop_order_coupons = JSON.stringify(values.shop_order_coupons)
    if(values.car_order_coupons) values.car_order_coupons = JSON.stringify(values.car_order_coupons)
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
