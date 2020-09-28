import React from 'react'
import LazyImg from '@c/lazyImg'
import Prism from 'prismjs'

const text = {
  obs:`    // 监听roader.change的变化，显示相应页面
         observe(obj, key){    
          Object.defineProperty(
              obj.roader, key, {
                  get: function(){
                      return this["now"];
                  },
                  set: function(x){
                    // 储存要跳转的页面及旧页面
                    this["old"]=this["now"];
                    this["now"]=x;
                    //跳转动画
                    obj.animat.call(obj, obj.roader)
                  }
              }
          )
        }
        animat(roader){
            // 获取旧页面及新页面dom,旧页面隐藏，新页面显示 ;执行绑定动画
            let [oldPage, nowPage] = [$("[index=\'"+roader["old"]+"\']"), $("[index=\'"+roader["now"]+"\']")];
            let nowFn = nowPage.attr("now")
            let oldFn = oldPage.attr("old")
            nowPage.show();
            oldFn && this.opt.old[this.rep(oldFn)](this, oldPage);
            nowFn && this.opt.now[this.rep(nowFn)](this, nowPage);
        };
        ...
        ele.find("[tap]").each(function(){
            let tapFn = iOh.opt.tap[iOh.rep($(this).attr("tap"))] 
            $(this).on("tap", function(evt){
                    tapFn.call(this, iOh, evt);
                    evt.stopPropagation();
            })
        });`,
    new:`    <div class="page" index="3" now="{{signPageIn}}" old="{{signPageOut}}">
        ...
        <span class="help" tap="{{help}}">
            <img src="./images/help.png" alt="">
        </span>
    </div>

    #index.js
    var iOh = new ioh({
        ele: "#view", // 根节点
        now: {
            ... // 新页面过渡动画
        },
        old: {
            ... // 旧页面过度动画
        },
        tap: {
            ... // 绑定的tap事件     
        }
    })`
}

const ckobsTtml = Prism.highlight(text.obs,Prism.languages.javascript, 'javascript')
const cknewHTml = Prism.highlight(text.new,Prism.languages.javascript, 'javascript')

export default ()=>{
  return(
    <article className="work-pop-main work-pop-code">
      <h1>老思鸡H5</h1>
      <p>zepto + AlloyTouch + 微信sdk实现的一个微信H5单页</p>
      <LazyImg w="320px" h="572px" src="//cdn.toofook.com/my-blog/work/ckcode.gif"/>
      <h5>简介</h5>
      <p>没错，除了设计之外前端也是我干的。项目只有3个页面，交互动画和图片居多，同时还需要在页面载入时静默授权和微信sdk验签，思考后觉得以dom操作为主引入轻量的zepto比较合项目的需求。</p>
      <p>我通过Object.defineProperty监听render值进行页面跳转，只需要改变render值，就可以触发新旧页面dom标签上声明的跳转动画;同时在实例化时将dom标签上声明的tap事件绑定到dom上</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:ckobsTtml}}></pre>
      <p style={{marginTop:'1.6rem'}}>在html标签上添加声明，并在实例化时传入相应事件，这样代码管理起来也会清晰许多，就像用了框架一样。</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:cknewHTml}}></pre>
      <p style={{marginTop:'1.6rem'}}>扫描二维码体验一下～</p>
      <LazyImg w="320px" h="572px" src="//cdn.toofook.com/my-blog/work/chikenCode.png"/>
    </article> 
  )
}
