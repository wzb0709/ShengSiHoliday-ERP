import React, { FC, useCallback, useEffect, useState } from 'react'
import { Form, Input, Select, Modal } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import * as commonServer from '@/services/common'
import uuid from 'uuid/v1'
import X2JS from 'x2js'

interface IProps {
  readonly visible: boolean,
  readonly onCancel: (e: React.MouseEvent<HTMLElement>) => void
  form: WrappedFormUtils
  readonly onOk: (values: any) => void
  readonly initialValue: any
  readonly typeList:any
}

const FormItem = Form.Item
const Option = Select.Option

const BusModal: FC<IProps> = (props) => {

  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }


  const handleConfirm = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onOk(values)
      }
    })
  }

  const myUploadFn = async (param:any) => {

    let uploadData:any = {}
    await commonServer.getUploadData().then((res:any)=>{
      uploadData = {
        key: uuid().replace(/-/g, '') + '${filename}',
        policy: res.policy,
        OSSAccessKeyId: res.ossAccessKeyId,
        Signature: res.signature,
        success_action_status: 201
      }
    })

    const serverURL = 'https://pzyfile.oss-cn-hangzhou.aliyuncs.com'
    const xhr = new XMLHttpRequest
    const fd = new FormData()

    const successFn = (response:any) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        // @ts-ignore
        url: new X2JS().xml2js(xhr.responseText).PostResponse.Location,
      })
    }

    const progressFn = (event:any) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response:any) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('key',uploadData.key)
    fd.append('policy',uploadData.policy)
    fd.append('OSSAccessKeyId',uploadData.OSSAccessKeyId)
    fd.append('Signature',uploadData.Signature)
    fd.append('success_action_status',uploadData.success_action_status)
    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='添加/编辑公交信息'
      width={1200}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='公交分类' {...formItemLayout}>
        {getFieldDecorator('bus_type', {
          initialValue: props.initialValue.bus_type ? props.initialValue.bus_type.toString() : undefined,
          rules: [
            {
              required: true,
              message: '请选择公交分类',
            },
          ],
        })(<Select placeholder='请选择公交分类' style={{ width: '90%' }}>
          {props.typeList.map((item:any)=>{
            return(
              <Option key={item.id}>{item.type_title}</Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label='公交详情' {...formItemLayout}>
        {getFieldDecorator('bus_content', {
          initialValue: props.initialValue.bus_content ? BraftEditor.createEditorState(props.initialValue.bus_content) : undefined,
          rules: [{
            required: true,
            validator: (_, value, callback) => {
              if (value.isEmpty()) {
                callback('请输入正文内容')
              } else {
                callback()
              }
            }
          }]
        })(<BraftEditor
          media={{uploadFn: myUploadFn}}
          style={{border:'1px solid #ccc'}}
        />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(BusModal)
