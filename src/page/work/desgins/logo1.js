import React from 'react'
import logo1 from '@/images/work/logo1.jpg'
import LazyImg from '@c/lazyImg'
export default () => {
    return(
      <article className="work-pop-main">
        <h1>优品养车 Logo设计(方案一)</h1>
        <LazyImg w="1920px" h="1920px" src={logo1}/>
        <strong>END</strong>
      </article>
    )
}