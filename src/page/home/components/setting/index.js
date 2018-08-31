import React,{Component} from 'react';
import {setting} from '../../home.scss'
import Color from './bgcolor'
import Fileter from './fileter'

/**
 * @name 设置组件弹窗
 */
export default class Setting extends Component{
  constructor(){
    super()
  }
  render(){
    return (
      <div className={setting}>
        <p>background</p>
        <Color/>
        <p style={{marginTop:'1.8rem'}}>choose filter</p>
        <Fileter/>
      </div>
    )
  }
}
