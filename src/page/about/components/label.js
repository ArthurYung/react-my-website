import React from 'react'
import Cloud from './cloud'
import {mylabel} from '../about.scss'

/**
 * @name AboutMe云朵集组件
 */

const labels = [
                 '#金牛座',
                 '#90后',
                 '[腾讯]',
                 '#闷骚',
                 '[周大福]',
                 '#CDCer',
                ]

export default ()=>{
  return(
    <div className={mylabel}>
      {labels.map((t,i) => <Cloud key={i} text={t} index={i}/>)}
    </div>
  )
}
