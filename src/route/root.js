import React, { Component } from 'react';
import '@c/globalcss/index.scss'
import Header from '@c/header'
import {Router} from 'react-router-dom'
import history from '@/utils/history';
import SwitchAnimate from '@c/switch'
import RouterMap from './RouterMap'


export default class App extends Component {
  constructor(){
    super();
    this.state={
        isRouter:false
    }
  }
  componentDidMount(){
      // 挂在组件后将loading dom删除
      var loading = document.getElementById("pageloading")
      document.body.removeChild(loading)
      loading = null
  }
  isRoute(){
    // 添加router跳转动画的组件
    this.setState({
        isRouter:true
    })
  }
  clearAnimate(n){
    //  删除router跳转动画的组件
    this.setState({
        isRouter:n
    })   
  }
  render() {
    return (
      <Router  history={history}> 
        <div className="main">
          <Header history = {history}  isRoute={this.isRoute.bind(this)}/>
          <RouterMap/>
          {this.state.isRouter?<SwitchAnimate type = 'leave' callback={this.clearAnimate.bind(this)}/>:''}
        </div>
      </Router>
    );
  }
}
