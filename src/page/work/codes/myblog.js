import React from 'react'
import LazyImg from '@c/lazyImg'
import Prism from 'prismjs'
import PopLink from '@c/poplink'
const blog = '//cdn.toofook.com/my-blog/work/myblog.jpg'

const text = {
  create:`    {
    test: /\.scss$/,
    use: [
        ...
        require.resolve(paths.appNodeModules + '/sass-loader'), // sass-loader
        ...
    ]
    },`,
    root:`    import Loadable from 'react-loadable'; 
    // 还需要将babel-plugin-syntax-dynamic-import配置到babel-loader的plugs中
    ...
    // 路由按需加载
    const AsyncHome = Loadable({
        loader: () => import('./page/home/page'),
        loading: MyLoadingComponent
    })
    ...`,
    link:`    this.setHistory = setTimeout(()=>{
      history.push(herf)
    },1000) `,
    com:`   this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
    ...
    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }
    ...
    render() {
        return createPortal(
        <div className="dialog">
            <div className="dialog-bg"></div>
            {this.props.children}
        </div>, // 塞进传送门的JSX
        this.node // 传送门的另一端DOM node
        );
    }`
}

const creatHtml = Prism.highlight(text.create,Prism.languages.javascript, 'javascript')
const rootHtml = Prism.highlight(text.root,Prism.languages.javascript, 'javascript')
const linkHtml = Prism.highlight(text.link,Prism.languages.javascript, 'javascript')
const comHtml = Prism.highlight(text.com,Prism.languages.javascript, 'javascript')
export default ()=> {
  return(
    <article className="work-pop-main work-pop-code">
      <h1>我的个人博客</h1>
      <p>设计/前端／后台；React + koa2 + mongoDB实现的个人博客</p>
      <LazyImg w="800px" h="444px" src={blog}/>
      <h5>前端构建</h5>
      <p>create-react-app脚手架是非常好用的，如果不选择run eject,webpack的相关配置需要找到node_modules/react-script/config文件夹里进行修改，如sass:</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:creatHtml}}></pre>
      <h5>Router</h5>
      <p>react-router的文档已经足够详细，用法也很简单；本项目通过官方介绍的react-loadable实现了路由按需加载，但这样会出现一个问题，按需加载后没办法使用react-transfrom-group来实现陆游跳转动画。</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:rootHtml}}></pre>
      <p style={{marginTop:'1.6rem'}}>没关系，既然用不了就不用它了；在路由组件挂载时触发进入动画，在路由组件卸载时触发离开动画，当然路由间的跳转就不能使用Link组件了，因为它是实时跳转，而我们需要等到离开动画结束后再进行跳转。</p>
      <p>前端路由的原理是通过监听hashchange事件来触发路由跳转，那这就好办了，设置一个定时器，在页面离开动画结束后向history push相应的值即可。</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:linkHtml}}></pre>
      <h5>组件</h5>
      <p>我本人是非常喜欢react的组件，写起来就是比其它的要爽很多。这里我简单介绍一下项目里的弹窗组件是怎么实现的（因为用的比较多）</p>
      <p>很多时候我们的弹窗需要脱离当前组件的dom树，添加到body的最下方（z-index属性只对同层级的dom有效），如果我们直接操作dom的话不仅开销大，虚拟dom会带来意想不到的惊喜。这个时候就需要用到我们的传送门createPortal了(在组件卸载时需要移除创建的节点)</p>
      <pre className="language-javascript" dangerouslySetInnerHTML={{__html:comHtml}}></pre>
      <p style={{marginTop:'1.6rem'}}>完整代码：</p>
      <PopLink href = "https://github.com/ArthurYung/react-my-website"/>
    </article>
  )
}
