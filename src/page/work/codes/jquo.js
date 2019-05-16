import React from 'react'
import Prism from 'prismjs'
import PopLink from '@c/poplink'

const text = {
  fn:`    //工厂函数
    function jQuo(selector) {
        return new jQuo.fn.init(selector);
    }
    jQuo.fn = jQuo.prototype = {
        //修正指向
        constructor: jQuo,
        ...
    }
    // init入口
    var init = jQuo.fn.init = function(selector) {
        ...
    }
    //提供制作插件访问原型的接口
    init.prototype = jQuo.fn;
    w.jQuo = w.$ = jQuo;`,
    init:`    var init = jQuo.fn.init = function(selector) {
        if (!selector) {
            return this;
        }
        if (typeof selector == 'function') {
            jQuo.ready(selector);
        } else if (typeof selector === "string") {
            var ele = jQuo.trim(selector);
            //如果是html片段  创建dom添加到实列
            if (jQuo.isHtml(ele)) {
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = ele;
                [].push.apply(this, tempDiv.childNodes);
                return this;
            } else {
                try {
                    var nodes = document.querySelectorAll(ele);
                    [].push.apply(this, nodes);
                    return this;
                } catch (e) {
                    this.length = 0;
                    return this;
                }
            }
        } else if (jQuo.isLikeArray(selector)) {
            //解决IE8 apply无法借用伪数组
            [].push.apply(this, [].slice.call(selector));
            return this;
        } else {
            this[0] = ele;
            this.length = 1;
        }
    };`
}

const jqHtml = Prism.highlight(text.fn,Prism.languages.javascript, 'javascript')
const jqinitHtml = Prism.highlight(text.init,Prism.languages.javascript, 'javascript')
export default ()=>{
  return(
    <article className="work-pop-main work-pop-code">
      <h1>jQuo.js 一款精简版的jQuery</h1>
      <p>js进阶练习</p>
      <h5>简介</h5>
      <p>没有什么比jQuery源码更适合用来学习与js原型了。</p>
      <p>jQuery() 实际上返回了一个jQuery.fn.init的实列对象</p>
      <p>jQuery.prototype 即是 jQuery 的原型，挂载在上面的方法，即可让所有生成的jQuery对象使用</p>
      <p>jQuery.fn.init.prototype = jQuery.fn又将jQuery的原型赋值给init原型,让init实例化之后可以调用jQuery的原型方法</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:jqHtml}}></pre> 
      <p style={{marginTop:'1.6rem'}}>实例化之后的jQuery对象是一个包含了选择器返回的dom节点的伪数组，伪数组不仅可以像数组一样操作自身的dom节点集合，还可以直接使用原型上的方法，简直完美。</p>
      <p>最后我们来看一遍选择器做了什么，至此jQuery的工作原理已基本实现。</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:jqinitHtml}}></pre> 
      <p style={{marginTop:'1.6rem'}}>详细代码请关注GitHub～</p>
      <PopLink href = "https://github.com/ArthurYung/jQuo/blob/master/jquo.js"/>
    </article>
  )
}