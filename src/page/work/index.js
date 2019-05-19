import React, { Component } from 'react';
import Switch from '@c/switch'
import ListCompon from './listcomponent'
import {workIcon} from '@c/imgurls'
import isPhone from '@/utils/isPhone'
import {scroll, more, moreIcon} from './work.scss'
import desgin from './desgins'
import code from './codes'

/**
 * @name work页
 */

export default class Work extends Component{
  constructor(){
    super();
    this.state={
    desginFigu:[
        { src: workIcon.logo1, text: '优品养车logo', isShow: false, child: desgin.logo1,type:'white'},
        { src: workIcon.logo2, text: '优品养车logo', isShow: false, child: desgin.logo2,type:'white'},
        { src: workIcon.chick, text: '老思鸡H5', isShow: false, child: desgin.chicken,type:'white'},
        { src: workIcon.moneky, text: '校招H5', isShow: false, child: desgin.monky,type:'white'}
      ],
    codeFigu:
    [
        { src: workIcon.game, text: '五子棋', isShow: false, child: code.game,type:'white'},
        { src: workIcon.jquo, text: 'jQuo', isShow: false, child: code.jquo,type:'white'},
        { src: workIcon.pictring, text: 'pictring', isShow: false, child: code.pictring,type:'white'},
        { src: workIcon.chick, text: '老思鸡H5', isShow: false, child: code.chicken,type:'white'},
        { src: workIcon.vue, text: 'vue-pictring', isShow: false, child: code.vuePictring,type:'white'},
        { src: workIcon.blog, text: 'My Blog', isShow: false, child: code.myblog,type:'white'},
    ],
    switchin:true
    }
  }
  show(n){
    let index = null
    let newFigu = this.state.desginFigu
    let prim = new Promise(resover => {
      index = this.state.desginFigu.indexOf(n)
      resover(index)
    })
    prim.then(index=>{
      if(index<0){
        index = this.state.codeFigu.indexOf(n)
        newFigu = this.state.codeFigu
        newFigu[index].isShow = true
        this.setState({
          codeFigu: newFigu,
          types:"code"
        })
      }else{
        newFigu[index].isShow = true;
        this.setState({
          desginFigu: newFigu,
          types:"desgin"
        })
      }
    })
  }
  close(){
    let newDesgin = this.state.desginFigu
    let newCode = this.state.codeFigu
    newDesgin.map(i=>i.isShow=false)
    newCode.map(i=>i.isShow=false)
    this.setState({
      desginFigu:newDesgin,
      codeFigu:newCode
    })
  }
  switchOut(n){
    this.setState(
      {
        switchin:n
      }
    )
  }
  toAbout(){
    isPhone 
    ? document.querySelector(".mobile-nav").getElementsByTagName("a")[3].click() 
    : document.querySelector(".nav").getElementsByTagName("a")[3].click() // 跳转至ablout页面
  }
  render(){
    const type = this.state.types
    return (
      <main className={"page "+scroll}>
        <div style={{height:'auto',paddingBottom:'6rem'}} className="app-center">
          <ListCompon style={type!=="code"} title="Desgin" figures={this.state.desginFigu} shows={this.show.bind(this)}  close={this.close.bind(this)}/>
          <ListCompon style={type==="code"} title="Code" figures={this.state.codeFigu} shows={this.show.bind(this)}  close={this.close.bind(this)}/>
          <div onClick={this.toAbout} className={more}>
            <span className={moreIcon}>
              <i></i>
            </span>
            <span className="needsclick">VIEW MORE</span>
          </div>
          {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
        </div>
      </main>
    )
  }
} 