import React from 'react'
import isPhone from '@/utils/isPhone'
export default (props) => {
  if(isPhone){
    return(
    <ul>
      {props.lists.map((list,i)=>(
      <li key={i} onTouchStart={(e)=>{props.click(list);e.stopPropagation()}}>{list.value}</li>)
      )}
    </ul>      
    )
  }else{
    return(
      <ul>
        {props.lists.map((list,i)=>(
        <li key={i} onClick={(e)=>{props.click(list);e.stopPropagation()}}>{list.value}</li>)
        )}
      </ul> 
    )
  }
}