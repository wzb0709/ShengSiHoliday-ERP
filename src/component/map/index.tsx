import React, { Component } from 'react'
// @ts-ignore
import BMap from 'BMap'

interface IProps {
  lat:string | undefined,
  lgt:string | undefined,
  onRef:any
  onChange:any
}

class BDMap extends Component<IProps,{}> {

  componentDidMount(): void {
    this.props.onRef(this)
    this.renderMap()
  }

  map:any = undefined

  renderMap = () => {
    if(this.props.lat && this.props.lgt){
      this.map = new BMap.Map('map')
      let point = new BMap.Point(this.props.lgt,this.props.lat)
      this.map.centerAndZoom(point,18)
      this.map.addOverlay(new BMap.Marker(point));
    }else{
      this.map = new BMap.Map('map')
      let point = new BMap.Point(122.213931,29.991275)
      this.map.centerAndZoom(point,18)
    }
    this.map.enableScrollWheelZoom()
    this.map.addEventListener("click", (e:any) => {
      const pt = e.point;
      this.props.onChange(pt.lng,pt.lat)
      this.map.centerAndZoom(pt, 18);
      this.map.clearOverlays()
      this.map.addOverlay(new BMap.Marker(pt));
    });
  }

  handleMarker = (address:string) => {
    const myGeo = new BMap.Geocoder();
  // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(address, (point:any) => {
        if (point) {
          this.props.onChange(point.lng,point.lat)
          this.map.centerAndZoom(point, 18);
          this.map.clearOverlays()
          this.map.addOverlay(new BMap.Marker(point));
        }
      },
      "舟山市");
  }

  render() {
    return (
      <>
        <div style={{width:'100%',height:350,}} id='map' />
      </>
    )
  }
}

export default BDMap
