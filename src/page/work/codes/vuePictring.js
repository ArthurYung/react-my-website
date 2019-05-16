import React from 'react'
import Prism from 'prismjs'
import PopLink from '@c/poplink'

const text = {
   directives:`  directives: {
      picAnimate: {
        bind: (el, binding) => {
          el.addEventListener(prefix ? wrapper + 'TransitionEnd' : 'transitionend', function () {
            // 在挂载时，元素监听transitionEnd事件，消除元素的tramsition属性并执行回调函数
            this.style[prefix + 'transition'] = ''
            this.$animate.call(el)
            // 执行完回调函数后，将回掉函数清除（一次动画只执行一次）
            this.$animate = function () { }
          })
        },
        update: (el, binding) => {
          if (binding.value === binding.oldValue) return
           // 添加参数中的css3属性至dom.style,并添加tranition属性
          let transitions = []
          for (let v in binding.value.to) {
            el.style[v] = binding.value.to[v]
            transitions.push(v)
          }
          el.style[prefix + 'transition'] = transitions + ' 300ms ' + ease
          // 元素绑定的$animate属性赋值为value参数中的fn
          el.$animate = binding.value.fn || function () { } 
        }
      }
    }`,
    use:`template: '<pic-up ref=vueupfile :max=max :imgType=type :compress=compress :version=version :size=size></pic-up>',
    components: {
        picUp
    },
    data: () => {
        return {
        max: options.max || 9, // 图片最大数量
        type: options.img || 'base', // 返回图片的格式
        compress: options.compress || '0.8', // 压缩质量
        size: options.size || '80', // 容器尺寸
        version: 'v1.0.0'
        }
    },
    methods: {
        up() { // 返回选中的图片
        return this.$refs.vueupfile.showfiles()
        },
        empty() { // 清空上传列表
        this.$refs.vueupfile.emptyfiles()
        }
    }`
}

const vueHtml = Prism.highlight(text.directives,Prism.languages.javascript, 'javascript')
const vueUseHtml = Prism.highlight(text.use,Prism.languages.javascript, 'javascript')
export default ()=> {
  return(
    <article className="work-pop-main work-pop-code">
      <h1>vue-pictring Vue图片上传插件</h1>
      <p>Pictring的Vue版本</p>
      <h5>简介</h5>
      <p>Pictring.js是通过对图片数组的监听来改变dom元素，在Vue里已经帮我们实现了这一步；不同的是，在Vue里在不改变dom结构的情况下添加Css动画需要自定义指令，代码如下</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:vueHtml}}></pre> 
      <p style={{marginTop:'1.6rem'}}>我们还需要在注册插件时需要改变一些选项以及在使用插件时调用插件内获取选中图片的方法，所以我们需要包裹一层组件</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:vueUseHtml}}></pre> 
      <p style={{marginTop:'1.6rem'}}>详细介绍请关注GitHub，试试看吧～</p>
      <PopLink href = "https://github.com/ArthurYung/vue-pictring"/>
    </article>
  )
}