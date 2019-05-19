import React, {Component} from 'react'
import marked from 'marked'
import Prism from 'prismjs'
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
    this.refs.article.scrollTop = '0px'
  }
  render () {
    const { body, title } = this.props.data
    if (!body) {
      return (<div></div>)
    }
    const html = marked(body, {renderer})
    return (
      <div ref="article" className = {blogCss.article}>
        <div className = {blogCss['article-center']}>
          <h1 style={{marginBottom: '24px'}}> {title} </h1>
          <div className={blogCss.view} dangerouslySetInnerHTML={{__html:html}}>
          </div>
        </div>
      </div>
    )
  }
}