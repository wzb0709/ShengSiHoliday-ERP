import React, {Component} from 'react'
import {Row} from "antd"
import CardItem from './cardItem'

export default class CardList extends Component{

  render() {
    const {dataSource} = this.props
    return (
      <div>
        <Row type="flex" justify="start">
          {dataSource.map((item, index) => {
            return (
              <CardItem
                key={item.number}
                index={index}
                image={item.image_url}
                lastIndex={dataSource.length - 1}
                describe={item.description}
                Delete={this.props.onDelete}
                Modal={this.props.onModal}
                DND={this.props.onDND}
              />
            )
          })}
        </Row>
      </div>
    )
  }
}
