import React, {Component} from 'react';
import axios from '@/axios'
import {CSSTransition} from 'react-transition-group'
import SginIn from '../sgin'
import Portal from '@c/portal'
import Pop from '@c/windo'
import checkText from '@/utils/checkText'
import Msg from './msgs'
import Css from '../../home.scss'

/**
 * @name 留言弹窗组件
 */

export default class Msgs extends Component{
  constructor(props){
    super(props)
    this.state = {
      isInput:false,
      msgs:[],
      onReset: false,
      moreText: null
    }
    this.onLoad = false
    this.loadAll = false
  }
  componentDidMount(){
    this.reList()
  }
  componentWillUnmount(){
    clearTimeout(this.restTimeout)
  }
  reList(){
    this.setState({
      onReset: true
    })
  this.restTimeout =  setTimeout(()=>{
    axios.get('m/showMsg/', {
      params: {
        msgId: 1
      },
      timeout: 3000,
    })
    .then((response) => { 
      if(response.data.status === 1){
        this.setState({
          msgs: response.data.data,
          onReset: false
        })
      }else{
        alert("未知错误，请重试")
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
    },400)
  }
  //  弹出/关闭登陆窗
  toggleShow(){
    this.setState({
      isInput: !this.state.isInput
    })
  }
  messagesUp(){
    this.loadAll = false
    const input = this.refs.msgInput
    let value = this.CheckTexts(input.value)
    if(value.replace(/\s+/g, "") === "") return; // 如果输入的全是空格，则不提交
    axios.post('m/saveMsg/', {
      email: this.props.other.user.email,
      message: value
    },{
      timeout: 3000    
    }).then(response => {
      if(response.data.status === 1){
        this.reList()
        input.value = ""
      }else{
        console.log(response)
      }
    }).catch(err => console.log(err))
  }
  CheckTexts(str){
    let _str = str.toString().replace(/<|>/g,' ')
    let reg = ''
    checkText.map(i => {
      reg = new RegExp(i,"g")
      _str = _str.replace(reg,"河蟹")
    })
    return _str
  }
  onScroll(e){
    if(this.onLoad || this.loadAll || this.state.onReset) return;
    if(this.refs.msgUl.offsetHeight - e.target.scrollTop - e.target.offsetHeight < 10 ){
      this.setState({moreText:"正在加载中..."})
      const loadId = this.state.msgs[this.state.msgs.length - 1]._id
      this.onLoad = true
      axios.get('m/showMsg/', {
        params: {
          msgId: loadId
        },
        timeout: 3000,
      })
      .then((response) => { 
        if(response.data.status === 1){
          this.loadTimeout = setTimeout(()=>{
            if(response.data.data.length === 0){
              this.setState({
                moreText: "并不是深不可测的"
              })
              this.loadAll = true
            }else{
              let newMsgs = this.state.msgs.concat(response.data.data)     
              this.setState({
                moreText:null,
                msgs: newMsgs
              })
            } 
            this.onLoad = false
          },400)
        }else{
          alert("未知错误，请重试")
          this.onLoad = false
        }
      })
      .catch(function (error) {
        this.onLoad = false
      })
    }
  }
  render(){
    console.log(this.props.other)
    return(
      <div className={Css.msgCenter}>
        <div onScroll={this.onScroll.bind(this)} className="figure-pop-main">
          {this.state.onReset
          ? <div className="loading-spinner"></div>
          : <ul ref="msgUl" className={Css.msgBox}>
          {this.state.msgs.map(msg => <Msg key={msg._id} {...msg}/>)}
          </ul>}
          <div style={{textAlign:"center",transform:"translateY(-50px)"}}>{this.state.moreText}</div>
        </div>
        {!this.props.other.user.email
          ?<span onClick={this.toggleShow.bind(this)} className={Css.putButton}>
            留言
          </span>
          :<div onMouseDown={e => e.stopPropagation()} className={Css.msgInput}>
            <input ref="msgInput" placeholder="净化荧屏，世界和平" type="text"/>
            <span onClick={this.messagesUp.bind(this)} className={Css.msgButton}>留言</span>
          </div>
        }
        <CSSTransition
          in={this.state.isInput}
            key='tests'
            timeout={200}
            unmountOnExit
            classNames="fade">
         <Portal>
           <Pop unmove={true} close={this.toggleShow.bind(this)} title="登陆" type="white">
            <SginIn user={this.props.other.user} close={this.toggleShow.bind(this)} isErro={this.props.other.isErro} setUser={this.props.other.setUser}/>
           </Pop>
         </Portal>
        </CSSTransition>
      </div>
    )
  }
}