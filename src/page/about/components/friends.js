import React from 'react'
import {firends} from '../about.scss'

const friends = [
                {link:'https://www.zcool.com.cn/u/13292809',name:'杰神',title:'设计圈张国荣'},
                {link:'http://fxyblog.com/',name:'Apple',title:'前端大佬'},
                {link:'https://dribbble.com/-Nancy',name:'木木夕',title:'美女插画师'},
                {link:'https://github.com/liangmeie',name:'娥妹子',title:'前端程序媛'}]

const Link = (props) => {
  return(
    <a href={props.link}><span>{props.name}</span>{props.title}</a>
  )
}

export default ()=>{
  return(
    <div className={firends}>
      {friends.map((f,i)=><Link key={i} {...f}/>)}
    </div>
  )
}