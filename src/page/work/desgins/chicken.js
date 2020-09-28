import React from 'react'
import LazyImg from '@c/lazyImg'
const chicken = '//cdn.toofook.com/my-blog/work/chicken.gif'
const chicken1 = '//cdn.toofook.com/my-blog/work/chicken1.jpg'
const chicken2 = '//cdn.toofook.com/my-blog/work/chicken2.jpg'
const chicken3 = '//cdn.toofook.com/my-blog/work/chicken3.jpg'
const chickenCode = '//cdn.toofook.com/my-blog/work/chikenCode.png'

export default ()=>{
    return(
      <article className="work-pop-main">
        <h1>老思鸡H5</h1>
        <p>“关于区块链品牌推广的养成类微信h5”</p>
        <h5>Loading页:</h5>
        <LazyImg w="320px" h="563px" src={chicken}/>
        <p>“它真的不是小游戏，只是一只H5”</p>
        <p>“即便设计风格和交互都像极了游戏界面”</p>
        <h5>其它一些页面:</h5>
        <LazyImg w="320px" h="569px" src={chicken1}/>
        <LazyImg w="320px" h="569px" src={chicken2}/>
        <LazyImg w="320px" h="569px" src={chicken3}/>
        <p>或许你可以扫描二维码亲自体验一下～</p>
        <LazyImg w="280px" h="280px" src={chickenCode}/>
        <strong>END</strong>
      </article>
    )
}
