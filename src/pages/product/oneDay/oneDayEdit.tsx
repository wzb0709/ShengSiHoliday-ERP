import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Card, message, Spin } from 'antd'
import * as oneDayServices from '@/services/onDay'
import { IBasicInfo } from '@/pages/product/oneDay/oneDayDetail'
import OneDayForm from '@/pages/product/oneDay/oneDayForm'
import PackageInfo from '@/pages/product/oneDay/packageInfo'
import OtherPackageInfo from '@/pages/product/oneDay/otherPackageInfo'

interface IProps {
  match: any
}

const OneDayEdit: FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>({
    product_title: '',
    product_sub_title: '',
    product_img: [],
    fee_desc: '',
    announcements: '',
    warm_prompt: '',
    product_tag: [],
    travel_person: 0,
    create_id:''
  })
  const [loading, setLoading] = useState<boolean>(true)

  const getBasicInfo = useCallback(() => {
    oneDayServices.getOneDayInfo(props.match.params.id).then((res: any) => {
      res.product_tag = JSON.parse(res.product_tag)
      res.product_img = JSON.parse(res.product_img)
      setBasicInfo(res)
      setLoading(false)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
  }, [getBasicInfo])

  const childRef = useRef()
  const handleConfirm = () => {
    // @ts-ignore
    childRef.current.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          product_img: JSON.stringify(values.product_img),
          product_tag: JSON.stringify(values.product_tag),
          create_id: localStorage.getItem('id'),
          id:props.match.params.id
        }
        oneDayServices.updateOneDay({ ...params },props.match.params.id).then(() => {
          message.success('操作成功！')
          //getBasicInfo()
        })
      }
    })
  }


  return (
    <>
      <Card
        title='基本信息'
        extra={<a onClick={handleConfirm}>保存</a>}
        style={{width:1200,margin:'0 auto'}}
      >
        {!loading && <OneDayForm
          initialValue={basicInfo}
          // @ts-ignore
          ref={childRef}
        />}
      </Card>

      <PackageInfo id={props.match.params.id} canEdit={true}/>
      <OtherPackageInfo id={props.match.params.id} canEdit={true}/>
    </>
  )
}

export default OneDayEdit
