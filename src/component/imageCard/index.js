import React, {Fragment, Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {Button,Row} from 'antd'
import uuid from "uuid/v1"
import X2JS from "x2js"
import * as commonServer from '@/services/common'
import BatchAddModal from './batchAddModal'
import CardList from '@/component/imageCard/cardList'
import ImageModal from '@/component/imageCard/modal'
import PreviewModal from './previewModal'

/**
*@fileName:index.js
*@author:WangZiBin
*@time:2019/7/23
*@desc:图文上传编辑组件
*/

class ImageCard extends Component{

  state = {
    dataSource: [],
    id: '',
    tmpFileList: [],
    uploadData:{},
    initialValue:{},
    visible:false,
    imgVisible:false,
    previewVisible:false
  }

  componentDidMount = () => {
    this.handleInitPropsList()
  }

  /**
   *@funcDesc:获取阿里云图片上传凭证
   *@author:WangZiBin
   *@time:2019/7/23 13:01
   */
  handleGetAccessCode = () => {
    commonServer.getUploadData().then(res=>{
      this.setState({
        uploadData:{
          /* eslint-disable */
          key: uuid().replace(/-/g, '') + '${filename}',
          policy: res.policy,
          OSSAccessKeyId: res.ossAccessKeyId,
          Signature: res.signature,
          success_action_status: 201
        }
      })
    })
  }

  /**
   *@funcDesc:处理传入来的产品图文数组
   *@author:WangZiBin
   *@time:2019/7/23 14:28
   */
  handleInitPropsList = () => {
    let {list} = this.props
    console.log(list)
    let dataSource = []
    list.forEach(item=>{
      dataSource.push({
        description: item.summary === '' ? '点击下方按钮新增图文描述' : item.summary,
        image_url: item.img_url,
        number: Math.random()
      })
    })
    dataSource.push({
      description: "点击下方按钮新增图文描述",
      image_url: "",
      number: Math.random()
    })
    this.setState({dataSource})
  }

  /**
  *@funcDesc:批量上传文件变化时处理
  *@author:WangZiBin
  *@time:2019/7/23 14:39
  */
  handleBatchChange = ({file, fileList}) => {
    let tmpFileList = this.state.tmpFileList
    if (file.status === 'done') {
      const url = new X2JS().xml2js(file.response).PostResponse.Location
      tmpFileList.push({
        image_url: url,
        uid: file.uid
      })
      this.setState({
        tmpFileList
      })
    } else if (file.status === 'removed') {
      tmpFileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          tmpFileList.splice(index, 1)
          this.setState({
            tmpFileList
          })
        }
      })
    }
  }

  /**
  *@funcDesc:确认文件批量上传
  *@author:WangZiBin
  *@time:2019/7/23 14:41
  */
  handleConfirmBatch = () => {
    let {tmpFileList} = this.state
    let dataSource = this.state.dataSource

    dataSource.splice(dataSource.length - 1, 1)
    tmpFileList.forEach(item => {
      dataSource.push({
        description: "点击下方按钮新增图文描述",
        image_url: item.image_url,
        number: Math.random()
      })
    })

    dataSource.push({
      description: "点击下方按钮新增图文描述",
      image_url: "",
      number: Math.random()
    })

    this.setState({
      dataSource,
      visible:false
    })
  }

  /**
  *@funcDesc:DND拖拽处理
  *@author:WangZiBin
  *@time:2019/7/23 14:42
  */
  handelDND = (dragIndex, hoverIndex) => {
    let dataSource = this.state.dataSource
    let tmp
    tmp = dataSource[dragIndex]
    // gallery[dragIndex] = gallery[hoverIndex];
    // gallery[hoverIndex] = tmp;
    dataSource.splice(dragIndex, 1)
    dataSource.splice(hoverIndex, 0, tmp)
    this.setState({
      dataSource
    })
  }

  /**
  *@funcDesc:删除一项图文描述
  *@author:WangZiBin
  *@time:2019/7/23 14:43
  */
  handleDelete = (index) => {
    let {dataSource} = this.state
    if(index === dataSource.length -1){
      return false
    }
    dataSource.splice(index,1)
    this.setState({dataSource})
  }

  /**
  *@funcDesc:打开图文描述模态框
  *@author:WangZiBin
  *@time:2019/7/23 14:43
  */
  handleModal = (index) => {
    commonServer.getUploadData().then(res=>{
      this.setState({
        uploadData:{
          /* eslint-disable */
          key: uuid().replace(/-/g, '') + '${filename}',
          policy: res.policy,
          OSSAccessKeyId: res.ossAccessKeyId,
          Signature: res.signature,
          success_action_status: 201
        }
      },()=>{
        let dataSource = this.state.dataSource
        //console.log(index)
        this.setState({
          imgVisible: true,
          initialValue: dataSource[index],
          EditIndex: index
        })
      })
    })
  }

  /**
  *@funcDesc:完成图文描述编辑
  *@author:WangZiBin
  *@time:2019/7/23 14:43
  */
  handleEdit = (list) => {
    const index = this.state.EditIndex
    let dataSource = this.state.dataSource
    dataSource[index] = {
      ...list,
      number: Math.random()
    }
    if (index === dataSource.length - 1) {
      dataSource.push({
        description: "点击下方按钮新增图文描述",
        image_url: "",
        number: Math.random()
      })
    }
    this.setState({
      dataSource
    })
  }


  /**
  *@funcDesc:打开批量添加模态框
  *@author:WangZiBin
  *@time:2019/7/23 14:43
  */
  handleBatchAdd = () => {
    commonServer.getUploadData().then(res=>{
      this.setState({
        uploadData:{
          /* eslint-disable */
          key: uuid().replace(/-/g, '') + '${filename}',
          policy: res.policy,
          OSSAccessKeyId: res.ossAccessKeyId,
          Signature: res.signature,
          success_action_status: 201
        }
      },()=>{
        this.setState({visible:true,tmpFileList: []})
      })
    })
  }

  /**
  *@funcDesc:完成图文编辑并将数组返回给父组件
  *@author:WangZiBin
  *@time:2019/7/23 15:29
  */
  handleConfirm = () => {
    let {dataSource} = this.state
    this.props.onConfirm(dataSource.slice(0,dataSource.length-1))
  }


  render() {
    return (
      <Fragment>
        <BatchAddModal
          visible={this.state.visible}
          onCancel={() => this.setState({visible:false})}
          uploadData={this.state.uploadData}
          onChange={this.handleBatchChange}
          onOk={this.handleConfirmBatch}
        />
        <ImageModal
          visible={this.state.imgVisible}
          initialValue={this.state.initialValue}
          onCancel={() => this.setState({imgVisible:false})}
          onEdit={this.handleEdit}
        />
        <Row type="flex">
          <Button
            type='primary'
            style={{marginBottom: 20}}
            onClick={this.handleBatchAdd}
          >
            批量添加
          </Button>
          <Button
            type='primary'
            style={{marginBottom: 20,marginLeft:20}}
            onClick={this.handleConfirm}
          >
            完成编辑
          </Button>
          <Button
            type='primary'
            style={{marginBottom: 20,marginLeft:20}}
            onClick={() => this.setState({previewVisible:true})}
          >
            预览
          </Button>
        </Row>
        <CardList
          dataSource={this.state.dataSource}
          onDND={this.handelDND}
          onModal={this.handleModal}
          onDelete={this.handleDelete}
        />
        <PreviewModal
          visible={this.state.previewVisible}
          onCancel={() => this.setState({previewVisible:false})}
          dataSource={this.state.dataSource}
        />
      </Fragment>
    )
  }
}

export default DragDropContext(HTML5Backend)(ImageCard)
