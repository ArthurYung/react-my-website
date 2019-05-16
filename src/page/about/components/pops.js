import React, { Component } from 'react'
import Pop from '@c/windo'
import Css from '../about.scss'
import {aboutImg} from '@c/imgurls'
import CityRun from './city'
import MyLabel from './label'
import Friends from './friends'
/**
 * @name 页面各区域
 */

// 照片组件
export function Photo(){
  return (
    <Pop  
      noClose={true}
      title="Phonto"
      type="main"
      unmove={true}
    >
     <div className={Css.myfont}>
      <img src={aboutImg.myfont} alt=""/>
    </div> 
    </Pop>
  )
}

// 邮箱组件
export function Mail(){
  return (
    <Pop  
      noClose={true}
      title="Mail"
      type="pink"
      unmove={true}
    >
      <div className={Css.img}>
        <img src={aboutImg.imail} alt=""/>
      </div> 
      <h3>arthur.ou@foxmail.com</h3>
      <a href="mailto:arthur.ou@foxmail.com" className={Css.linkIcon}></a>
    </Pop>
  )
}

//  About Me组件
export class Introduce extends Component{
  render(){
    return(
      <Pop  
        noClose={true}
        title="About Me"
        type="light"
        unmove={true}
      >
      <div className={Css.city}>
        <CityRun/>
        <MyLabel/>
      </div> 
      </Pop>      
    )
  }
}

// Git组件
export function Git(){
  return (
    <Pop  
      noClose={true}
      title="GitHub"
      type="violet"
      unmove={true}
    >
      <div className={Css.img}>
        <img src={aboutImg.igit} alt=""/>
      </div> 
      <h3>https://github.com/ArthurYung</h3>
      <a href="https://github.com/ArthurYung" rel="external" target="_blank" className={Css.linkIcon}></a>
    </Pop>
  )
}

// 微信组件
export function WeiChart(){
  return (
    <Pop  
      noClose={true}
      title="WeChat"
      type="wathet"
      unmove={true}
    >
      <div className={Css.img}>
        <img src={aboutImg.icode} alt=""/>
      </div> 
      <h3>oyyc270079245</h3> 
    </Pop>
  )
}


// 地址组件
export function MyAdd(){
  return (
    <Pop  
      noClose={true}
      title="Where"
      type="wathet"
      unmove={true}
    >
      <div className={Css.addImg}>
        <img src={aboutImg.iadd} alt=""/>
      </div> 
    </Pop>
  )
}


// 友情链接组件
export function OurLink(){
  return (
    <Pop  
      noClose={true}
      title="Friends"
      type="pink"
      unmove={true}
    >
     <Friends/>
    </Pop>
  )
}