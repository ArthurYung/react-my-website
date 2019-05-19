import React, {Component} from 'react';

import Css from '../../home.scss'
import {homeImg} from '@c/imgurls'
import SginIn from '../sgin'
import Portal from '@c/portal'
import {CSSTransition} from 'react-transition-group'
import Pop from '@c/windo'
import isPhone from '@/utils/isPhone'

/**
 * @name ‘关于’组件
 */

export default class ShowMe extends Component{
  constructor(){
    super()
    this.state = {
      isInput:false // 是否弹出登陆框
    }
  }
  toAbout(){
    isPhone 
    ? document.querySelector(".mobile-nav").getElementsByTagName("a")[3].click() 
    : document.querySelector(".nav").getElementsByTagName("a")[3].click() // 跳转至ablout页面
  }
  // 弹出/关闭登陆弹窗
  showSign(){
    this.setState({
      isInput:!this.state.isInput      
    })
  }
  render(){
    console.log(this.props.other)
    return(
      <div className="figure-pop-main">
        <ul className={Css.settBox}>
          <li>
            <div className={Css.glitch}>
              <img src={homeImg.glitch} alt=""/>
            </div>
          </li>
          <li>Mr.Ou Personal Web</li>
          <li>v2.1.0</li>
          <li className={Css.settLink}><a className='needsclick' onClick={this.toAbout}>View More</a></li>
          <li><hr align='center' width='60%' style={{margin:'18px auto'}} color='#b99f51' size="1"/></li>
          <li>{this.props.other.user.email
              ?<em>{this.props.other.user.email}</em>
              :<a onClick={this.showSign.bind(this)}>尚未登陆</a>}
          </li>
          <li><em>{this.props.other.user.name}</em></li>
        </ul>
        <CSSTransition
          in={this.state.isInput}
            key='testsss'
            timeout={200}
            unmountOnExit
            classNames="fade">
         <Portal>
           <Pop unmove={true} close={this.showSign.bind(this)} title="登陆" type="white">
            <SginIn user={this.props.other.user} close={this.showSign.bind(this)} isErro={this.props.other.isErro} setUser={this.props.other.setUser}/>
           </Pop>
         </Portal>
        </CSSTransition>
      </div>
    )
  }
}