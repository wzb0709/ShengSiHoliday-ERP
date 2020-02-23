import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Row, Tag } from 'antd'

import * as shoppingServices from '@/services/shopping'
import { router, Link } from 'umi'
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

const ShoppingDetail: FC<IProps> = (props) => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>(
    {
      shop_title: '',
      shop_subtitle: '',
      shop_tags: [],
      warm_prompt: '',
      buy_person: 0,
      shop_pics: [],
      product_no:'',
    })

  const [visible,setVisible] = useState<boolean>(false)

  const tagColor = ['magenta', 'red', 'volcano']

  const getBasicInfo = useCallback(() => {
    shoppingServices.getShoppingInfo(props.match.params.id).then((res: any) => {
      res.shop_tags = JSON.parse(res.shop_tags)
      res.shop_pics = JSON.parse(res.shop_pics)
      setBasicInfo(res)
    })
  }, [props.match.params.id])
  useEffect(() => {
    getBasicInfo()
  }, [getBasicInfo])

  const handleDelete = () => {
    const id = props.match.params.id
    Modal.confirm({
      title:"提示",
      content:"是否要删除该产品？",
      onOk:() => {
        shoppingServices.deleteShopping(id).then(() => {
          message.success('删除成功！')
          router.replace('/product/shopping')
        })
      }
    })
  }


  return (
    <>
      <Card
        title='基本信息'
        extra={<>
          <Link to={`/product/shopping/${props.match.params.id}/edit`} >编辑产品</Link>
          <Divider type='vertical' />
          <Link to={`/product/shopping/${props.match.params.id}/img`} >图文编辑</Link>
          <Divider type='vertical' />
          <a>复制产品</a>
          <Divider type='vertical' />
          <a>转让产品</a>
          <Divider type='vertical' />
          <a onClick={handleDelete} style={{color:'red'}}>删除产品</a>
        </>}
      >
        <Row style={{ marginBottom: 10 }}>产品标题：{basicInfo.shop_title}</Row>
        <Row style={{ marginBottom: 10 }}>产品副标题：{basicInfo.shop_subtitle}</Row>
        <Row style={{ marginBottom: 10 }}>产品标签：{basicInfo.shop_tags.map(item => {
          return (<Tag key={item} color={tagColor[Math.floor((Math.random() * tagColor.length))]}>{item}</Tag>)
        })}</Row>
        <Row style={{ marginBottom: 10 }}>购买人数：{basicInfo.buy_person}人</Row>
        <Row style={{ marginBottom: 10 }}>温馨提示：{basicInfo.warm_prompt}</Row>
      </Card>
      <Card
        title='计调信息'
        style={{ marginTop: 20 }}
      >
        111
      </Card>
      <ShoppingPackageInfo id={props.match.params.id} canEdit={false}/>
    </>
  )
}

export default ShoppingDetail
