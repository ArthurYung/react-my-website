import React, {Component} from 'react';
import TextNode from './components/text'
import Footer from './components/footer'
import Switch from '@c/switch'
import MyIcon from './components/icons'
import Model from '@c/model'
/**
 * 页面入口主组件
 */

export default class Home extends Component{
  constructor(){
    super();
    this.state = {
      switchin:true,
      user:{
        email:null,
        name:null,
      },
      model: false,
      modelType: 'ok'
    }
    this.upload = 0
  }
  componentWillMount(){
    // 组件加载时查看Cookie是否有保存用户信息
    let email = this.getCookie("testEmali")
    if(email){
      let name = this.getCookie("testName")
      this.setState({
        user:{
          name:name,
          email:email
        }
      })
    }
  }

  /**
   * 获取kookie
   * @param {string} name 
   */
  getCookie(name) 
  { 
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
  } 
  setCookie(name,value){
        var exp = new Date();
        exp.setTime(exp.getTime() + 7 * 24 * 3600 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  }
  /**
   * 保存用户信息至state（子组件注册成功调用）
   * @param {object} opt 
   */
  setLoading(opt){
    this.setState({
      user: opt,
      modelType: 'ok'
    })
    this.setCookie("testEmali",opt.email)
    this.setCookie("testName",opt.name)
    this.refs.model.show()
  }
  isErro(){
    this.setState({
      modelType: 'err'
    }) 
    this.refs.model.show()
  }
  // 页面切换动画控制
  switchOut(n){
    this.setState({
      switchin:n
    })
  }
  render(){
    return(
      <main className="page">
        <div className="app-center">
          <TextNode/>
          <Footer/>
          <MyIcon 
            user={this.state.user} 
            setUser={this.setLoading.bind(this)}
            isErro={this.isErro.bind(this)} 
          />
        </div>
        <Model ref='model' type={this.state.modelType} time="2000"/>
      {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
      </main>
    )
  }
}
