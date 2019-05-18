import React, { Component } from 'react';
import homeCss from '../../home.scss'
/**
 * @name home页文字动画组件
 */
export default class TextNode extends Component {
  constructor() {
    super()
    this.state = {
      span1:false,
      span2:false,
      span3:false,
      cursor:false
    }
  }
  componentDidMount(){
    this.setTimeout0 = setTimeout(()=>{
      this.setState({
        span1:true
      })
    },1200)
    this.setTimeout1 = setTimeout(()=>{
      this.setState({
        span2:true
      })
    },1400)
    this.setTimeout2 = setTimeout(()=>{
      this.setState({
        span3:true
      })
    },1600)
    this.setTimeout3 = setTimeout(()=>{
      this.setState({
        cursor:true
      })
    },2400)
  }
  componentWillUnmount(){
    clearTimeout(this.setTimeout0)
    clearTimeout(this.setTimeout1)
    clearTimeout(this.setTimeout2)
    clearTimeout(this.setTimeout3)
  }
  render() {
    return (
      <div className={homeCss.text}>
        <span className={this.state.span1?homeCss.animate:''}>Hey There</span><br/>
        <span className={this.state.span2?homeCss.animate:''}>I'm Bruce.Au</span><br/>
        <span className={this.state.span3?homeCss.animate:''}>( σ'ω')σ<strong>#Skr</strong><i className={this.state.cursor?homeCss.cursor:''}></i></span>
      </div>
    )
  }
}
