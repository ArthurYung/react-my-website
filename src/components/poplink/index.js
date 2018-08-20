import React from 'react'

/**
 * @name 链接显示组件
 * @props.href 链接地址 :String
 */
export default function PopLink(props){
  return(
    <aside className="pop-link"> 
      <a target="_blank" href={props.href}>{props.href}</a>
    </aside>
  )
}