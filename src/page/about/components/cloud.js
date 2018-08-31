import React from 'react'
import {cloud} from '../about.scss' 
import {aboutImg} from '@c/imgurls'

/**
 * @name AboutMe云朵组件
 */
export default (props)=>{
  const left = 4 + props.index * 14
  const top = 16 + (props.index % 2) * 14
  const style={
    left: left + '%',
    top: top + '%'
  }
  return(
    <span className={cloud} style={style}>
      <img src={aboutImg.icloud} alt=""/>
      <strong>{props.text}</strong>
    </span>
  )
}