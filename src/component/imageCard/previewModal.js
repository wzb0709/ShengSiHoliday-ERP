import React, { Component } from 'react'
import { Modal } from 'antd'

class PreviewModal extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        title='预览'
        onCancel={this.props.onCancel}
        footer={null}
        destroyOnClose
        width={400}
      >
        <div style={{width:360,height:735,position:'relative'}} >
          <img style={{position:'absolute',top:0,left:0}} src={require('@/assets/phone.png')} width={360} alt=""/>
          <div style={{position:'absolute',left:29,top:155,maxHeight:492,overflowY:'auto'}}>
            {this.props.dataSource.map((item,index)=>{
              return item.image_url !== '' && (
                <div key={index}>
                  <img src={item.image_url} alt="" style={{width:300,borderRadius:10}}/>
                  <div style={{margin:'10px 0'}}>{item.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    )
  }
}

export default PreviewModal
