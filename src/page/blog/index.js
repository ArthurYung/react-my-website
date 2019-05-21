import React,{Component} from 'react'
import Switch from '@c/switch'
import axios from 'axios'
import Menu from './menu'
import Article from './article'
import Pop from '@c/windo'
import isMobile from '@/utils/isPhone'
import * as blogCss from './blog.scss'

export default class Blog extends Component {
  constructor(){
    super()
    this.state = {
      switchin: true,
      articles: [],
      currentArticle: {},
      lookPage: false,
      showLogin: false
    }
  }
  switchOut(n){
    this.setState({
      switchin: n
    })
  }
  componentWillMount() {
    this.getArticleList()
  }
  changeArticle(article) {
    this.refs.articleComponent.resetScrollTop()
    this.setState({
      currentArticle: article,
      lookPage: true
    })
  }
  toggleMenu() {
    this.setState(({ lookPage }) => ({
      lookPage: !lookPage
    }))
  }
  setLoginStatus(status) {
    this.setState({
      showLogin: status
    })
  }
  async getArticleList() {
    const token = localStorage.getItem('githubToken')
    try {
      const { data } = await axios.get('https://api.github.com/repos/ArthurYung/my-voice/issues', {
        headers: {
          Authorization: token
        }
      })
      this.setState({
        articles: data,
        currentArticle: data[0]
      })
    } catch (err) {
      this.setState({
        showLogin: true,
        lookPage: true,
        currentArticle: {
          title: 'Gihub授权',
          needLoginGithub: true
        }
      })
    }
  }
  render(){
    const { articles, currentArticle, lookPage } = this.state
    let blogClassNames = [blogCss['blog-main']]
    if (isMobile) {
      blogClassNames.push(blogCss['blog-mobile'])
    }
    if (isMobile && lookPage) {
      blogClassNames.push(blogCss['blog-look'])
    }
    blogClassNames = blogClassNames.join(' ')
    return (
      <div className="page app-center">
        <div className={ blogClassNames }>
          <Pop
            noClose={true}
            title="Blogs"
            type="white"
            unmove={true}
            class={blogCss['blog-menu-box']}
          >
            <Menu articles={ articles } currentArticle = { currentArticle } changeArticle={ article => this.changeArticle(article)}/>
          </Pop>
          <Pop
            noClose={true}
            title={currentArticle.title || ''}
            type="white"
            unmove={true}
            class={blogCss['blog-article-box']}
          >
            <Article ref="articleComponent" reGetter={()=>this.getArticleList()} data={ currentArticle }/>
          </Pop>
        </div>
        {
          isMobile 
          ? <span 
            className={blogCss['blog-toggle']} 
            onClick={() => this.toggleMenu()}>
              {lookPage ? 'BACK' : 'VIEW'}
            </span> 
          : ''
        }
        {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
      </div>
    )
  }
}
