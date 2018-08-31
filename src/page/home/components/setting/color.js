import React from 'react'
import {colorChoose} from '../../home.scss'

/**
 * @name 颜色选择组件
 */

export default (props) => {
  return(
    <span className = {props.color.isChoose ? `${props.color.value} ${colorChoose}`: props.color.value}
          onClick = {props.choose}
    ></span>
  )
}
