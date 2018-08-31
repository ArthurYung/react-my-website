import React from 'react'
import Select from '@c/select'

/**
 * @name filter选择组件
 */

const bod = document.body
const listFn = (c, n)=>{
  bod.className= c ; 
  bod.setAttribute('fileter',n)
}
const lists = [
  {value:'none',fn:()=>{listFn('','none')}},
  {value:'hue rotate',fn:()=>{listFn('hue-rotate','hue rotate')}},
  {value:'negative',fn:()=>{listFn('negative','negative')}},
  {value:'black and white',fn:()=>{listFn('black-white','black and white')}}
]
const redux = ()=> {
  return bod.getAttribute('fileter')
}
export default ()=>{
    return(
      <Select lists={lists} redux={redux}/>
    )
}