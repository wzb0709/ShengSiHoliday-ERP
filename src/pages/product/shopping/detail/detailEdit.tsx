import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Card, message, Spin } from 'antd'

import * as shoppingServices from '@/services/shopping'
import ShoppingForm from '@/pages/product/shopping/shoppingForm'
import ShoppingPackageInfo from '@/pages/product/shopping/detail/shoppingPackage'

interface IProps {
  match: any
}

interface IBasicInfo {
  shop_title: string,
  shop_subtitle: string,
  shop_tags: Array<string>,
  warm_prompt: string,
  buy_person: number,
  shop_pics: Array<string>,
  product_no:string,
}

const ShoppingEdit: FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>({
    shop_title: '',
    shop_subtitle: '',
    shop_tags: [],
    warm_prompt: '',
    buy_person: 0,
    shop_pics: [],
    product_no:'',
  })
  const [loading, setLoading] = useState<boolean>(true)

  const getBasicInfo = useCallback(() => {
    shoppingServices.getShoppingInfo(props.match.params.id).then((res: any) => {
      res.shop_tags = JSON.parse(res.shop_tags)
      res.shop_pics = JSON.parse(res.shop_pics)
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
          shop_pics: JSON.stringify(values.shop_pics),
          shop_tags: JSON.stringify(values.shop_tags),
          create_id: localStorage.getItem('id'),
          id:props.match.params.id
        }
        shoppingServices.updateShopping({ ...params },props.match.params.id).then(() => {
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
        {!loading && <ShoppingForm
          initialValue={basicInfo}
          // @ts-ignore
          ref={childRef}
        />}
      </Card>
      <div style={{width:1200,margin:'0 auto'}}>
        <ShoppingPackageInfo id={props.match.params.id} canEdit={true}/>
      </div>
    </>
  )
}

export default ShoppingEdit
