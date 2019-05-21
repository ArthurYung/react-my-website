import React, {Component} from 'react'
import {aboutImg} from '@c/imgurls'
import * as loginCss from './login.scss'
import Axios from 'axios';
import Model from '@c/model'
export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      type: '',
      text: ''
    }
  }
  showModel(opt) {
    this.setState(opt)
    this.refs.model.show()
  }
  async submitGithub() {
    const account = this.refs.account.value
    const password = this.refs.password.value

    if (!account || !password) {
      this.showModel({
        type: 'err',
        text: '账号密码不能为空'
      })
    }

    const token = `Basic ${btoa(account + ':' + password)}`
    try {
      await Axios.get('https://api.github.com/user', {
        headers: {
          Authorization: token
        }
      })
      localStorage.setItem('githubToken', token)
      this.showModel({
        type: 'ok',
        text: '您已成功登陆'
      })
      setTimeout(()=>this.props.reGetter(), 1600)
    } catch (e) {
      this.showModel({
        type: 'err',
        text: '账号或密码错误'
      })
    }
  }
  render() {
    return (
      <div className={loginCss['login-box']}>
        <div className={loginCss['login-content']}>
          <img src={aboutImg.igit} alt=""/>
          <h3>API限制，请登陆你的Github</h3>
          <p>Authenticated requests get a higher rate limit. Check out the documentation for more details.</p>
          <div className={loginCss['login-input-box']}>
            <input type="text" placeholder="Github account" ref="account" onKeyUp={e => {e.keyCode==13 && this.submitGithub()}}/>
            <input type="password" placeholder="Github password" ref="password" onKeyUp={e => {e.keyCode==13 && this.submitGithub()}}/>
            <button className={loginCss['login-input-submit']} onClick={()=> this.submitGithub()}>Login</button>
          </div>
        </div>
        <Model ref="model" type={this.state.type} text={this.state.text}/>
      </div>
    )
  }
}
