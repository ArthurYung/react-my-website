import React from 'react'
import LazyImg from '@c/lazyImg'
import chicken from '@/images/work/chicken.gif'
import chicken1 from '@/images/work/chicken1.jpg'
import chicken2 from '@/images/work/chicken2.jpg'
import chicken3 from '@/images/work/chicken3.jpg'
import chickenCode from '@/images/work/chikenCode.png'

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