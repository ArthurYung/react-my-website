import React, { Component } from 'react'

/**
 * @class 图标弹窗组件
 * props.noClose  是否有关闭按钮
 * props.unmove 是否可拖动
 * props.title 标题文本
 * props.type 颜色样式
 * 
 */
export default class PopSelf extends Component {
  constructor() {
    super()
    this.isMove = false
    this.positions = { //弹窗的位置
      left:0,
      top:0,
      constx:0,
      consty:0,
      w:0,
      h:0
    }
    this.Move = this.handleMove.bind(this)
  }
  componentDidMount(){
    !this.props.unmove && window.addEventListener("mousemove", this.Move)
  }
  componentWillUnmount(){
    window.removeEventListener("mousemove", this.Move)
  }
  handleDown(event){
    if(this.props.unmove) return
    let pops = this.refs.pops.getBoundingClientRect()
    this.positions.w = pops.width
    this.positions.h = pops.height
    this.positions.constx = event.clientX - pops.left // 因为弹窗用translate(-50%)来居中，所以posiiton需要减去宽高一半
    this.positions.consty = event.clientY - pops.top  
    this.isMove = true
  }
  handleMove(event){ 
    if(!this.isMove || this.props.unmove) return;
    this.positions.left = event.clientX - this.positions.constx + this.positions.w/2
    this.positions.top = event.clientY - this.positions.consty + this.positions.h/2
    this.refs.pops.style.left = ~~this.positions.left + 'px'
    this.refs.pops.style.top = ~~this.positions.top + 'px'
  }
  handleUp(){
    this.isMove = false
  }
  render() {
    const title = ()=>{
      if(this.props.type !== 'none'){ // 如果元素类别不是none（专用点赞），则渲染标题
          if(this.props.noClose) return <p>{this.props.title}</p> 
          return <p 
          onMouseDown={this.props.unmove?()=>{}:this.handleDown.bind(this)}
          onMouseUp={this.props.unmove?()=>{}:this.handleUp.bind(this)}
          style={{cursor:this.props.unmove?'auto':''}}
          ><a onClick={this.props.close} title="关闭"></a>{this.props.title}</p> 
      }
    }
    let myClass = this.props.noClose ? `figure-pop-about figure-style-${this.props.type}`: `figure-pop figure-style-${this.props.type}`
    if (this.props.class) {
      myClass += ` ${this.props.class}`
    }
    return (
      <div ref="pops" 
        className={myClass}>
        {title()}
        {this.props.children}  {/*子元素*/}
      </div>)
  }
} 