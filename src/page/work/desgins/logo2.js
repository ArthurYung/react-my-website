import React from 'react'
import LazyImg from '@c/lazyImg'
const logo2 = '//cdn.toofook.com/my-blog/work/logo2.jpg'
export default ()=> {
    return(
      <article className="work-pop-main">
        <h1>优品养车 Logo设计(方案二)</h1>
        <LazyImg w="1920px" h="1920px" src={logo2}/>
        <strong>END</strong>
      </article>
    )
}
