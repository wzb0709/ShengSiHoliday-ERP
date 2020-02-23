import React, {Component, Fragment} from 'react'
import {Form, Input,Modal} from 'antd'
import FormUpload from '@/component/upload/formUpload'

const FormItem = Form.Item

class ImageModal extends Component{

  handleConfirm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log(values)
        this.props.onEdit(values)
        this.props.onCancel()
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18}
    }
    return (
      <Fragment>
        <Modal
          visible={this.props.visible}
          title='图文编辑'
          onCancel={this.props.onCancel}
          onOk={this.handleConfirm}
          destroyOnClose
        >
          <FormItem label="描述信息" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: false,
                  message: '请输入描述信息'
                }
              ],
              initialValue: this.props.initialValue.description === "点击下方按钮新增图文描述" ? "" : this.props.initialValue.description
            })(
              <Input.TextArea
                placeholder="请输入描述信息"
                autosize={{minRows: 2, maxRows: 4}}
              />
            )}
          </FormItem>
          <FormItem
            label="描述图片"
            extra="png、jpg、jpeg文件"
            {...formItemLayout}
          >
            {getFieldDecorator('image_url', {
              normalize: value => {
                if (typeof value === 'string') {
                  return value
                } else if (Array.isArray(value)) {
                  return value.length > 0 ? value.slice(-1)[0] : ''
                }
              },
              initialValue: this.props.initialValue.image_url === '' ? '' : this.props.initialValue.image_url,
              rules: [
                {
                  required: false,
                  message: '请上传描述图片'
                }
              ]
            })(
              <FormUpload
                accept="image/jpeg,image/jpg,image/png"
                listType={'picture'}
                action="https://pzyfile.oss-cn-hangzhou.aliyuncs.com"
              />
            )}
          </FormItem>
        </Modal>
      </Fragment>
    )
  }
}

export default Form.create()(ImageModal)
