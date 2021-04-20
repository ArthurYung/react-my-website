import React, {Component} from 'react'
import Icon from '@c/icons'
import { homeIcon } from '@c/imgurls'
import ShowMe from '../showme'
import Msgs from '../msg'
import Setting from '../setting'
import {figureBox} from '../../home.scss'
import SupPug from '../suppug'
import axios from '@/axios'
/**
 * @name 首页图标组件
 */
export default class MyIcon extends Component{
  constructor(props){
    super(props)
    this.state = {
      figures:[
        { src: homeIcon.sup, 
          text: '点赞', 
          isShow: false,
          unmove:true, 
          child: SupPug,
          type:'none', 
          add:{
            num:0,
            upSup:this.upSup.bind(this)}
        },
        { src: homeIcon.readme, text: '说明', isShow: false, child: ShowMe,type:'main'},
        { src: homeIcon.msg, text: '留言', isShow: false, child: Msgs,type:'wathet'},
        { src: homeIcon.setting, text: '设置', isShow: false, child: Setting,type:'setting'}
      ]
    }
    this.upload = 0
    this.axiosUp = 0
  }
  componentDidMount(){
    this.getSups()
  }
  getSups(){
    if(this.upload === 3) return; //最多请求三次，还是错误就不请求了
    axios.get('u/showSup/').then(response => {
      if(response.data.status === 1){
        this.setSup(response.data.data.supNum)
      }else{
        this.getSups()
        this.upload ++
      }
    }).catch(err=>console.log(err))
  }
  upSup(){
    if(this.axiosUp === 3) return; //最多请求三次，还是错误就不请求了
    axios.get('u/upSup/').then(response => {
      if(response.data.status === 1){
        this.setSup.call(this,response.data.data)
      }else{
        this.upSup()
        this.axiosUp ++
      }
    }).catch(err=>console.log(err))
  }
  setSup(num){
    let newFigures = this.state.figures
    newFigures[0].add.num = num
    this.setState({
      figures: newFigures
    })
  }
  resfule(){
    let newFig = this.state.figures
    newFig.map(n => n.isShow = false)
    return newFig
  }
  close(){
    let newFig = this.resfule()
    this.setState({
      figures: newFig
    })
  }
  shows(n){
    let index = this.state.figures.indexOf(n)
    let newFig = this.resfule()
    newFig[index].isShow = true;
    this.setState({
      figures: newFig
    })   
  }
  render(){
    return(
      <div className={figureBox}>
        {this.state.figures.map((fig,i) => <Icon key={i} 
        show={this.shows.bind(this,fig)} 
        close = {this.close.bind(this)} 
        other = {this.props}
        {...fig}/>)}
        <div  className='figure-flex'>
          <figure onClick={() => window.open('https://ox.vanoc.top')}>
            <img src={homeIcon.ox} alt=""/>
            <figcaption>跨端复制</figcaption>
          </figure>
      </div>
      </div>
    )
  }
}
