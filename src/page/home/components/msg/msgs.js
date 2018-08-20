import React, {Component} from 'react'
import Css from '../../home.scss'
import axios from '@/axios'



// +1气泡组件
class Bubble extends Component{
  componentDidMount(){
    this.timeOut = setTimeout(()=>this.props.out(this.props.pro),600)
  }
  componentWillUnmount(){
    clearTimeout(this.timeOut)
  }
  render(){
    return(
      <span className={Css.bubble}></span>
    )
  }
}

/**
 * @name 留言版的li
 */
export default class Msg extends Component{
  constructor(props){
    super(props)
    this.state = {
      ...this.props,
      bubbles:[] // 由于气泡动画会出现连续很多个，所以用数组来遍历渲染
    }
    this.upNum = 0
  }
  componentWillUnmount(){
    clearTimeout(this.upSupTimeout) 
  }
  upSup(){
    let newBub = this.state.bubbles 
    newBub.push({
      time:new Date().getTime() // 添加新的泡泡动画元素
    })
    this.setState({
      sup:+this.state.sup + 1,
      bubbles: newBub
    })
    this.upNum ++
    clearTimeout(this.upSupTimeout)
    this.upSupTimeout = setTimeout(this.upAxios.bind(this), 1000) // 点击之后600毫秒才会提交连续点赞后的值
  }
  upAxios(){
     axios.post('m/upSup/', {
         msgId: this.state._id,
         upNum: this.upNum
         }
     )
     .then((response) => { 
        if(response.data.status === 1){
          this.upNum = 0
         console.log("成功")
        }else{
         alert("未知错误，请重试")
        }
     })
     .catch(function (error) {
       console.log(error);
     });  
  }
  outBubble(bub){
    const newBubs = this.state.bubbles
    const index = newBubs.indexOf(bub)
    newBubs.splice(index,1)
    this.setState({
      bubbles:newBubs
    })
  }
  render(){
  const time = new Date(this.state.time)
  const now = new Date().getTime() - time.getTime()
  const data = now > 24 * 60 * 60 * 1000  // 如果是一天之前的，则显示日期，否则显示几分钟之前
  ? time.getFullYear() + '-' + (+time.getMonth() + 1) + '-' + time.getDate() 
  : ( (now > 60 * 60 * 1000) ?~~(now / 3600000)+'小时前' : ~~(now / 60000) + '分钟前')
    return(
      <li className={Css.showMsg}>
        <article className={Css.msgTitle}><strong>{this.state.name}</strong><span>{data}</span><span onClick={this.upSup.bind(this)} className={Css.msgLight}><a></a>({this.state.sup})</span></article>
        <section className={Css.message}>{this.state.msg}</section>
        {this.state.bubbles.map(bubble => <Bubble key={bubble.time} pro={bubble} out={this.outBubble.bind(this)}/>)}
      </li>
    )
  }
}