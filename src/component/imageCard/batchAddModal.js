import React, {Fragment, Component} from 'react'
import {Form,Modal,Upload,Button,Icon} from 'antd'

const FormItem = Form.Item

class BatchAddModal extends Component{
  render() {

    const props = {
      action :'https://pzyfile.oss-cn-hangzhou.aliyuncs.com',
      listType:'picture',
      defaultFileList:[],
      accept:"image/jpeg,image/jpg,image/png",
      multiple:true
    }
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    }

    return (
      <Fragment>
        <Modal
          title='批量添加'
          visible={this.props.visible}
          width={600}
          onCancel={this.props.onCancel}
          onOk={this.props.onOk}
          destroyOnClose
        >
          <FormItem label="批量添加" {...formItemLayout}>
            {getFieldDecorator('imageList', {
              rules: [
                {
                  required: true,
                  message: '请上传图片',
                },
              ],
            })(
              <Upload
                {...props}
                data={this.props.uploadData}
                onChange={this.props.onChange}
              >
                <Button>
                  <Icon type="upload"/> 批量上传
                </Button>
              </Upload>
            )}
          </FormItem>
        </Modal>
      </Fragment>
    )
  }
}

export default Form.create()(BatchAddModal)
