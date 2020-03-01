// @ts-nocheck
import React, { Component } from 'react'
import { Row, Upload, Col } from 'antd'
import styles from './index.scss'
import * as commonServer from '@/services/common'
import uuid from 'uuid/v1'
import FormUpload from '@/component/upload/formUpload'
import X2JS from 'x2js'

class BlockUpload extends Component {

  state = {
    fileList: ['', '', '', ''],
    active: -1,
  }

  constructor(props: any) {
    super(props)

    commonServer.getUploadData().then((res: any) => {
      this.setState({
        uploadData: {
          /* eslint-disable */
          key: uuid().replace(/-/g, '') + '${filename}',
          policy: res.policy,
          OSSAccessKeyId: res.ossAccessKeyId,
          Signature: res.signature,
          success_action_status: 201,
        },
      })
    })
  }

  componentDidMount(): void {
    const fileList = this.state.fileList
    if (this.props.value) {
      this.props.value.forEach((item, index) => {
        fileList[index] = item
      })
    }
    this.setState({ fileList })
  }

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done' || file.status === 'removed') {
      if (file.status === 'done') {
        for (let item of fileList) {
          if (file.uid === item.uid) {
            // @ts-ignore
            const url = new X2JS().xml2js(file.response).PostResponse.Location
            const active = this.state.active
            const imgList = this.state.fileList
            imgList[active] = url
            if (this.props.onChange) {
              this.props.onChange(imgList)
            }
            this.setState({ fileList: imgList })
            break
          }
        }
      }
    }
  }

  render() {
    const { fileList, uploadData } = this.state
    return (
      <>
        <div className="clearfix">
          <Upload
            listType="picture-card"
            className={styles.normal}
            showUploadList={false}
            beforeUpload={() => this.setState({ active: 0 })}
            data={uploadData}
            accept="image/jpeg,image/jpg,image/png"
            action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
            onChange={this.handleChange}
          >
            <div>
              {fileList[0] === '' ? '上传默认图' :
                <img src={fileList[0]} alt="avatar" style={{objectFit: 'cover' }}/>}
            </div>
          </Upload>
        </div>
        <Row type='flex'>
          <Col span={7}>
            <Upload
              listType="picture-card"
              className={styles.list}
              showUploadList={false}
              data={uploadData}
              accept="image/jpeg,image/jpg,image/png"
              beforeUpload={() => this.setState({ active: 1 })}
              onChange={this.handleChange}
              action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
            >
              <div>
                {fileList[1] === '' ? '上传图片' :
                  <img src={fileList[1]} alt="avatar" style={{ objectFit: 'cover' }}/>}
              </div>
            </Upload>
          </Col>
          <Col span={1}/>
          <Col span={7}>
            <Upload
              listType="picture-card"
              className={styles.list}
              showUploadList={false}
              data={uploadData}
              accept="image/jpeg,image/jpg,image/png"
              beforeUpload={() => this.setState({ active: 2 })}
              onChange={this.handleChange}
              action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
            >
              <div>
                {fileList[2] === '' ? '上传图片' :
                  <img src={fileList[2]} alt="avatar" style={{ objectFit: 'cover' }}/>}
              </div>
            </Upload>
          </Col>
          <Col span={1}/>
          <Col span={7}>
            <Upload
              listType="picture-card"
              className={styles.list}
              showUploadList={false}
              data={uploadData}
              accept="image/jpeg,image/jpg,image/png"
              beforeUpload={() => this.setState({ active: 3 })}
              onChange={this.handleChange}
              action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
            >
              <div>
                {fileList[3] === '' ? '上传图片' :
                  <img src={fileList[3]} alt="avatar" style={{ objectFit: 'cover' }}/>}
              </div>
            </Upload>
          </Col>
        </Row>
      </>
    )
  }
}

export default BlockUpload
