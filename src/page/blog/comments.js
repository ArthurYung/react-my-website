import React from 'react'
import comCss from './comment.scss'
import Axios from '@/utils/request'
import CommentInput from './input.js'

export default class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      reactions: [],
    }
  }
  componentWillMount() {
    this.getArticleReactions(this.props.data)
  }
  componentWillReceiveProps(newProps) {
    this.setState({ reactions: [] })
    this.getArticleReactions(newProps.data)
  }
  async handleReactionModify(type, item) {
    if (!this.props.userInfo.id) {
      this.props.showLogin()
      return
    }
    if (item) {
     await Axios({
        url: `https://api.github.com/reactions/${item.id}`,
        method: 'delete',
        headers: {
          'Accept': 'application/vnd.github.squirrel-girl-preview+json'
        }
      })
    } else {
      await Axios({
        url: `${this.props.data.url}/reactions`,
        method: 'post',
        data: { content: type === 'like' ? 'heart' : '+1' },
        headers: {
          'Accept': 'application/vnd.github.squirrel-girl-preview+json'
        }
      })
    }
    this.getArticleReactions(this.props.data)
  }
  async getArticleReactions(dataInfo) {
    const { data } = await Axios({ 
      url: `${dataInfo.url}/reactions?time=${Date.now()}`, 
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview+json'
      }
    })
    if (data) {
      this.setState({ reactions: data })
    } else {
      this.props.showLogin()
    }
  }
  render () {
    const { reactions } = this.state
    const { id } = this.props.userInfo
    const reactionsUpItems = reactions.filter(item => item.content === '+1')
    const reactionsLikeItems = reactions.filter(item => item.content === 'heart')
    const upActiveItem = reactionsUpItems.find(item => item.user.id === id)
    const likeActiveItem = reactionsLikeItems.find(item => item.user.id === id)

    let upIconClass = comCss['reaction-up']
    let likeIconClass = comCss['reaction-like']
    
    if (upActiveItem) upIconClass += ` ${comCss['reaction-up-active']}`
    if (likeActiveItem) likeIconClass += ` ${comCss['reaction-like-active']}`

    return (
      <div>
        <section className={comCss['reaction-box']}>
          <div className={upIconClass} onClick={()=>this.handleReactionModify('up', upActiveItem)}>
            <i></i>
            <span>{reactionsUpItems.length}</span>
          </div>
          <div className={likeIconClass} onClick={()=>this.handleReactionModify('like', likeActiveItem)}>
            <i></i>
            <span>{reactionsLikeItems.length}</span>
          </div>        
        </section>
        <section className={comCss['comment-form']}>
          <CommentInput/>
        </section>
      </div>
    )
  }
}
