import React, {Component} from 'react'
import Selects from './selects'
import isPhone from '@/utils/isPhone'
/**
 * 下拉列表组件
 * @redux 项目未使用reudx管理状态，此方法为组件载入时获取当前所选状态的方式
 */
const eventlistener = isPhone ? 'touchstart' : 'click'
export default class Select extends Component{
  constructor(props) {
    super(props)
    this.state = {
      curr: this.props.redux() || this.props.lists[0].value,
      showlist: false
    }
    this.close = this._close.bind(this)
  }
  choose(index){
    this.setState({
      curr: index.value,
      showlist: false 
    })
    index.fn()
  }
  _close(e){
    if(!this.state.showlist)return
    this.setState({
      showlist: false
    })
    console.log(1)
    e.stopPropagation()
  }
  ShowList(e){
    this.setState({
      showlist: !this.state.showlist
    })
    e.stopPropagation();
  }
  componentDidMount(){
    window.addEventListener(eventlistener, this.close)
  }
  componentWillUnmount(){
    window.removeEventListener(eventlistener, this.close)
  }
  render(){
    const ownstyle = this.props.style || 'ext'
    return(
      <div className={`select-style-${ownstyle}`}>
        {isPhone
          ?<div onTouchStart={this.ShowList.bind(this)} className="select-curr">{this.state.curr}</div>
          :<div onClick={this.ShowList.bind(this)} className="select-curr">{this.state.curr}</div>}
        {this.state.showlist?<Selects lists={this.props.lists} click={this.choose.bind(this)}/> : null}
      </div>
    )
  }
}