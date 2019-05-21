import React from 'react';
import {CSSTransition} from 'react-transition-group'
import Model from './model'

/**
 * @name 警示弹窗
 * @props.type 弹窗种类 'ok' || 'err'
 * @props.time 弹窗持续时间 :Number<String>
 * @props.close 弹窗关闭方法 :Function
 */
export default class MyPortal extends React.Component {
  constructor() {
    super()
    this.state = {
      model: false
    }
  }
  show() {
    this.setState({
      model: true
    })
    this.timeOut = setTimeout(()=>this.setState({model: false}), 1600)
  }
  componentWillUnmount(){
    clearTimeout(this.timeOut)
  }
  render() {
    return (
    <CSSTransition
    in={this.state.model}
    key='tests'
    timeout={200}
    unmountOnExit
    classNames="slide">
      <Model type={this.props.type} text={this.props.text}/>
    </CSSTransition>
    )
  }
}
