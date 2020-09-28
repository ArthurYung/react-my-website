import React from 'react'
import LazyImg from '@c/lazyImg'
const monky1 = '//cdn.toofook.com/my-blog/work/monky1.jpg'
const monky2 = '//cdn.toofook.com/my-blog/work/monky2.jpg'
const monky3 = '//cdn.toofook.com/my-blog/work/monky3.jpg'
const monky4 = '//cdn.toofook.com/my-blog/work/monky4.jpg'
const monky5 = '//cdn.toofook.com/my-blog/work/monky5.jpg'

const pictrues = [monky1,monky2,monky3,monky4,monky5]
export default ()=>{
  return(
    <article  className="work-pop-main">
      <h1>校招H5</h1>
      <p>“校园招聘h5广告”</p>
      <h5>部分截图:</h5>
      {pictrues.map((img,i) => <LazyImg key={i} src={img} w='375px' h='667px'/>)}
      <strong>END</strong>
    </article>
  )
}
