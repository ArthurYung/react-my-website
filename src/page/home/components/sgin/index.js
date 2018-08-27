import React, {Component} from 'react'
import {homeImg} from '@c/imgurls'
import {sginDiv,sginInput,erroText,buttonAnimate} from '../../home.scss'
import axios from '@/axios'
import {CSSTransition} from 'react-transition-group'
import checkText from '@/utils/checkText'
const checkMail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 

/**
 * @name 邮箱登陆组件
 */
export default class SginIn extends Component{
  constructor(){
    super()
    this.state = {
      email: null,
      nameInput: false,
      erro:false,
      erroText:'',
    }
    this.email = null
  }
  // 邮箱地址请求
  getUser(dom){
    if(this.state.erro) return false; // 判断是否在执行错误提示的动画
    const value = dom.value.toString().replace(/<|>/g,' ')
    if(!checkMail.test(value)) return this.upErro("请输入正确的邮箱地址!")  
    axios.get('u/getUser/', {
      params: {
        email: value
      },
      timeout: 5000,
    })
    .then((response) => {
       if(response.data.status === 1){
         this.isOk(response.data.data.name, response.data.data.email)
       }else{
         this.setState({
           nameInput: true
         })
         console.log(this.state.value)
         this.email = value
         dom.value=''
       }
    })
    .catch((error) => {
      console.log(1)
      this.props.isErro()
    });
  }

  // 获取用户名请求注册接口
  getName(dom){
    if(this.state.erro) return false;
    const value = dom.value.toString().replace(/<|>/g,' ')
    if(!this.CheckTexts(value)) return this.upErro("禁止使用敏感词汇！")
     axios.post('u/saveUser/', {
         email: this.email,
         name: value},{
           timeout: 5000
         }
     )
     .then((response) => { 
        if(response.data.status === 1){
         this.isOk(response.data.data.name, response.data.data.email)
        }else{
         this.props.isErro()
        }
     })
     .catch((error) => {
       this.props.isErro()
     });   
  }
  // 敏感词检测
  CheckTexts(str){
    for(let i = 0; i - checkText.length;i++){
     if(str.indexOf(checkText[i])>-1) return false 
    }
    return true
  } 
  // 注册或登陆成功，将保存用户名和email账号
  isOk(name,email){
    this.props.setUser({
      name: name,
      email: email
    })
    this.props.close()
  }
  upErro(text){
    this.setState({
      erro: true,
      erroText:text
    })
    this.timeOuts = setTimeout(()=>{this.setState({erro:false})}, 2000) 
  }
  componentWillUnmount(){
    clearTimeout(this.timeOuts)
  }
  render(){
    console.log(this.props)
    const statu = this.state.nameInput
    return(  
    <div className={sginDiv}>
      <img src={statu? homeImg.smile: homeImg.mail} alt=""/>
      <h1>{statu?'第一次来吧，取个名呗':'邮箱地址登陆'}</h1>
      <p>{statu?'净化荧屏，世界和平。请勿使用敏感词汇':'邮箱地址是您的唯一标示，认真点啊'}</p>
      <div className={sginInput}>
        <input type="text" placeholder={statu?"请输入用户名":"请输入您的邮箱"} ref="inputer"/>
        {statu
        ?<button className={this.state.erro?buttonAnimate:''} onClick={this.getName.bind(this, this.refs.inputer)}>OK</button>
        :<button className={this.state.erro?buttonAnimate:''} onClick={this.getUser.bind(this, this.refs.inputer)}>OK</button>}
      </div>
      <CSSTransition
        in={this.state.erro}
          key='tests'
          timeout={200}
          unmountOnExit
          classNames="fade">      
      <div className={erroText}>{this.state.erroText}</div>
      </CSSTransition>
    </div>)
  }
}