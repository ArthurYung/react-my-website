import React from 'react'
import LazyImg from '@c/lazyImg'
import PopLink from '@c/poplink'
const pictring1 = '//cdn.toofook.com/my-blog/work/pictring1.gif'
const pictring2 = '//cdn.toofook.com/my-blog/work/pictring2.gif'
const pictring3 = '//cdn.toofook.com/my-blog/work/pictring3.gif'
export default ()=> {
  return(
    <article className="work-pop-main work-pop-code">
      <h1>Pictring.js 一款移动端图片上传JS插件</h1>
      <p>一个高效&简洁&功能强大的Js插件</p>
      <h5>功能介绍</h5>
      <ol className="work-list">
        <li><span>多图上传</span></li>
        <li><span>图片压缩</span></li>
        <li><span>图片预览</span></li>
        <li><span>图片删除</span></li>
        <li><span>长按拖拽排序</span></li>
      </ol>
      <p>上传图片后会在视图区生成图片缩略图，缩略图会根据图片尺寸自适应裁剪成正方形的尺寸。点击缩略图可以放大至全屏，还可以左右滑动切换浏览。</p>
      <LazyImg w="320px" h="574px" src={pictring1}/>
      <p>当然，你还可以选择删除你不想要的图片，点击右删除按钮后该图片的缩略图也会一并消失。对了，顶部的菜单栏在你滑动查看图片时是会收缩的，当你点击屏幕它才会降下来。</p>
      <LazyImg w="320px" h="566px" src={pictring2}/>
      <p>以上都是图片上传的基本功能，下面我要向大家介绍插件的特色——图片拖拽排序。当你长按缩略图时，该缩略图会放大并呈现半透明状以提示用户可拖拽，你可以与任意图片交换位置。
      </p>
      <LazyImg w="320px" h="568px" src={pictring3}/>
      <p>上传图片的最大值|图片压缩质量|是否可拖拽|缩略图容器宽度等，这些都可以在实例化时候传入参数设置，详细代码使用方式请关注github，试试看吧～</p>
      <PopLink href="https://github.com/ArthurYung/PicTring"/>
    </article>
  )
}
