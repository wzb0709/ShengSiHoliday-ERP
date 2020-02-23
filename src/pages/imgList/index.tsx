import React, { Component } from 'react'
// @ts-ignore
import ImgCard from '@/component/imageCard'
import * as commonServer from '@/services/common'
import { message } from 'antd'

interface IProps {
  match:any
}

class ImgList extends Component<IProps,{}> {


  state = {
    imgList:[],
    loading:true
  }

  getImgList = () => {
    commonServer.getImgList(this.props.match.params.id).then(res=>{
      this.setState({imgList:res,loading:false})
    })
  }

  componentDidMount(): void {
    this.getImgList()
  }

  handleConfirm = (values:any) => {
    let detailList:any = []
    values.forEach((item:any,index:number)=>{
      detailList.push({
        img_url:item.image_url,
        sort:index,
        summary:item.description
      })
    })
    commonServer.setImgList(this.props.match.params.id,detailList).then((()=>{
      message.success('操作成功！')
      this.getImgList()
    }))
  }

  render() {
    return (
      <>
        {!this.state.loading && <ImgCard
          list={this.state.imgList}
          onConfirm={this.handleConfirm}
        />}
      </>
    )
  }
}

export default ImgList
