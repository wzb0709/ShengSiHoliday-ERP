import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Card, Divider, message, Modal, Table, Upload, Button, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import axios from 'axios'

import * as touristServices from '@/services/order/tourist'
import TouristModal from '@/pages/order/touristInfo/touristModal'
import { RcFile } from 'antd/es/upload'

interface IProps {
  id: string,
  cantEdit?:boolean
}

const TouristInfo: FC<IProps> = (props) => {

  const [dataSource, setDataSource] = useState<any>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [fileVisible, setFileVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [initialValue,setInitialValue] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)
  const [count, setCount] = useState<number>(0)
  const [keys,setKeys] = useState<string[]>([])

  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'tourist_type', title: '类型' ,render:recode => recode === 1 ? '成人' : '儿童' },
    { dataIndex: 'tourist_name', title: '姓名'},
    { dataIndex: 'tourist_sex', title: '性别',render:recode => recode === 1 ? '男' : '女'  },
    { dataIndex: 'tourist_birthday', title: '出生日期',render:recode=>moment(recode).format('YYYY-MM-DD') },
    { dataIndex: 'certification_type', title: '证件类型',render:recode => recode === 1 ? '身份证' : recode === 2 ? '护照' : '其他' },
    { dataIndex: 'certification_no', title: '证件号码' },
    { dataIndex: 'status', title: '状态',render:recode => <div style={{color:recode === 1 ? '#00CD00' : 'red'}}>{recode === 1 ? '正常' : '退团'}</div>  },
    {
      dataIndex: '', title: '操作', render: recode =>!props.cantEdit && <Fragment>
        {recode.status === 1 &&
          <>
            <a onClick={() => handleUpdate(recode.id)} >编辑</a>
            <Divider type='vertical'/>
            <a onClick={() => handleChangeStatus(recode.id,recode.status)} style={{ color: 'red' }}>退团</a>
          </>}
        {(recode.status === 2 ||  recode.status === 0 )&&
          <>
            <a onClick={() => handleChangeStatus(recode.id,recode.status)}>恢复</a>
            <Divider type='vertical'/>
            <a onClick={() => handleDelete(recode.id)} style={{ color: 'red' }}>删除</a>
          </>}
      </Fragment>,
    },
  ]

  const getTouristList = useCallback(() => {
    touristServices.getTouristList(props.id,page,size).then((res:any) => {
      setDataSource(res.data)
      setCount(res.count)
    })
  }, [props.id])
  useEffect(() => {
    getTouristList()
  }, [getTouristList])

  const handleConfirm = (values: any) => {
    const params = {
      ...values,
      order_id:props.id,
      tourist_birthday:values.tourist_birthday.format('YYYY-MM-DD')
    }
    if (id === '') {
      touristServices.addTourist({ ...params }).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getTouristList()
      })
    } else {
      touristServices.updateTourist({ ...params },id).then(() => {
        message.success('操作成功！')
        setVisible(false)
        getTouristList()
      })
    }
  }

  const handleChangeStatus = (id:string,status:number) => {
    touristServices.updateTouristStatus(id,status === 1 ? 2 : 1).then(() => {
      message.success('操作成功！')
      getTouristList()
    })
  }

  const handleAddTourist = () => {
    setInitialValue({})
    setId('')
    setVisible(true)
  }

  const handleUpdate = (id:string) => {
    const item = dataSource.find((item:any) => item.id === id)
    const params = {
      ...item,
    }
    setInitialValue(params)
    setId(id)
    setVisible(true)
  }

  const handleDelete = (id:string) => {
    Modal.confirm({
      title:'提示',
      content:'是否需要删除该人员?',
      onOk:() => {
        touristServices.deleteTourist(id).then(() => {
          message.success('操作成功!')
          getTouristList()
        })
      }
    })
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleUploadFile = (file:RcFile,fileList:RcFile[]):(boolean | PromiseLike<void>) => {
    const formData = new FormData()
    formData.append('file',file)
    touristServices.uploadTouristFile(formData,props.id).then(()=>{
      message.success('操作成功！')
      setFileVisible(false)
      getTouristList()
    })
    return false
  }


  const rowSelection = {
    onChange: (selectedRowKeys:any) => {
      setKeys(selectedRowKeys)
    },
    getCheckboxProps: (record:any) => ({
      disabled: record.status === 2 || record.status === 0, // Column configuration not to be checked
    }),
  };

  const handleChangeAllStatus = () => {
    Modal.confirm({
      title:'提示',
      content:'是否需要批量退团?',
      onOk:() => {
        touristServices.changeAllTouristStatus(props.id,keys).then(() => {
          message.success('操作成功！')
          getTouristList()
        })
      }
    })
  }

  const handleExport = () => {
    window.open(`http://test.allentravel.cn/api/report/ordertourists?orderid=${props.id}`)

    // axios.get(`/report/ordertourists?orderid=${props.id}`).then((res:any)=>{
    //   let blob = new Blob([res])
    //   let url = window.URL.createObjectURL(blob)
    //   let a = document.createElement("a")
    //   document.body.appendChild(a)
    //   let fileName = '名单报表.xls'
    //   a.href = url
    //   a.download = fileName //命名下载名称
    //   a.click() //点击触发下载
    //   document.body.removeChild(a)
    //   window.URL.revokeObjectURL(url)
    // })
  }

  return (
    <Card
      title='名单信息'
      style={{marginTop:20}}
      extra={!props.cantEdit &&
        <>
          <a onClick={handleAddTourist}>添加名单</a>
          <Divider type='vertical' />
          <a onClick={() => setFileVisible(true)}>导入名单</a>
          <Divider type='vertical' />
          <a onClick={handleExport}>导出名单</a>
          <Divider type='vertical' />
          <a onClick={handleChangeAllStatus} style={{color:'red'}}>批量退团</a>
        </>
      }
    >
      <Table
        bordered={true}
        dataSource={dataSource}
        pagination={{ pageSize: size, total: count, current: page, onChange: handlePageChange,hideOnSinglePage:true }}
        columns={columns}
        rowSelection={rowSelection}
        rowKey='id'
      />
      <TouristModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirm}
        initialValue={initialValue}
      />
      <Modal
        title={<div>上传名单 <a onClick={() => window.open('https://pzyfile.oss-cn-hangzhou.aliyuncs.com/shengsi/tourists_import_model.xlsx')}>下载模板</a></div>}
        visible={fileVisible}
        onCancel={() => setFileVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Upload
          beforeUpload={handleUploadFile}
          accept='.xls,.xlsx'
          // action={`http://test.allentravel.cn/api/orderTourists/file/${props.id}`}
          // onChange={handleChange}
        >
          <Button>
            <Icon type="upload" /> 上传名单文件
          </Button>
        </Upload>
      </Modal>
    </Card>
  )
}

export default TouristInfo
