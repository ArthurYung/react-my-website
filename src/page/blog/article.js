import React, {Component} from 'react'
import marked from 'marked'
import Prism from 'prismjs'
import Labels from './labels'
import moment from 'moment'
import Login from './login'
import Comments from './comments'
import * as blogCss from './blog.scss'

const renderer = new marked.Renderer()
renderer.link = (href, title, text) => `<a target="_blank" href="${href}" title="${title}">${text}</a>`

marked.setOptions({
  highlight(code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang)
    }
    return code
  }
})

export default class Article extends Component {
  resetScrollTop() {
    this.refs.article && (this.refs.article.scrollTop = '0px')
  }
  render () {
    const { 
      body, 
      title, 
      html_url, 
      labels, 
      created_at,
      needLoginGithub
    } = this.props.data
    if (needLoginGithub) {
      return (<Login resetUserInfo={this.props.resetUserInfo} reGetter={this.props.reGetter}/>)
    }
    if (!body) {
      return (<div></div>)
    }
    const html = marked(body, {renderer})
    return (
      <div ref="article" className = {blogCss.article}>
        <div className = {blogCss['article-center']}>
          <h1> {title} </h1>
          <a target="_blank" href={html_url}>[原文链接]</a>
          <span className = { blogCss['blog-menu-time'] }>{ moment(created_at).format('YYYY-MM-DD') }</span>
          <Labels labels={labels} />
          <div className={blogCss.view} dangerouslySetInnerHTML={{__html:html}} />
          <Comments data={this.props.data} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} showLogin={this.props.showLogin}/>
        </div>
      </div>
    )
  }
}
