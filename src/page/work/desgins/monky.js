import React from 'react'
import LazyImg from '@c/lazyImg'
import monky1 from '@/images/work/monky1.jpg'
import monky2 from '@/images/work/monky2.jpg'
import monky3 from '@/images/work/monky3.jpg'
import monky4 from '@/images/work/monky4.jpg'
import monky5 from '@/images/work/monky5.jpg'

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