import React, {Component} from 'react'
import history from '@/utils/history'
const  navlist = [
        {text:'HOME',herf:'/'},
        {text:'BLOG',herf:'/blog'},
        {text:'WORK',herf:'/work'},
        {text:'ABOUT',herf:'/about'}
      ]
const HashIndex = ()=>{
    let paths = []
    navlist.map((i)=>paths.push(i.herf.toString())) 
    const path = history.location.pathname.toString();
    const index = paths.indexOf(path)> -1 ? paths.indexOf(path) : 1
    return index
}
export default class Mobile extends Component{
  constructor(){
    super()
    this.state = {
      isShow: false,
      active: '',
      now: HashIndex()
    }
  }
  toggleNav(click){
    clearTimeout(this.timeOut)
    const type = click === 1 ? true : this.state.isShow
    this.setState({
      isShow: !type,
      active: type ? 'mobile-live-active' : 'mobile-in-active'
    })
    if(type)this.timeOut = setTimeout(()=>{this.setState({active: ''})},300)
  }
  toLink(n){
    // if(n.text==='BLOG')return window.location.href='http://blog.vanoc.top'
    this.toggleNav(1)
    const index = navlist.indexOf(n)
    if(index===this.state.now)return;
    this.props.isRoute(true);
    this.setHistory = setTimeout(()=>{
      this.props.history.push(navlist[index].herf)
      this.setState({
        now: index
      })
    },1000) 
  }
  render(){
    const menuClass = this.state.isShow ? 'mobile-menu-active' : '';
    return(
      <div className="app-center">
        <div className="mobile-logo">
          <img src={this.props.logo} alt=""/>
          <span>Arthur.O</span>
        </div>
        <a onClick={this.toggleNav.bind(this)} className={`mobile-menu ${menuClass}`}>
          <div></div>
          <div></div>
          <div></div>
        </a>
        <nav className={`mobile-nav ${this.state.active}`}>
          {navlist.map((nav,i) => <a onClick={this.toLink.bind(this, nav)} key={i}>{nav.text}</a>)}
        </nav>
      </div>
    )
  }
}