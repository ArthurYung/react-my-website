import React from 'react'
import comCss from './comment.scss'
import Axios from '@/utils/request'
import { CancelToken } from 'axios'
import CommentInput from './input.js'
import Model from '@c/model'
import Comment from './comment'

export default class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      reactions: [],
      comments: [],
      type: '',
      text: '',
      commentLoading: false
    }
    this.getReactionsCancel = () => {}
    this.getCommentsCancel = () => {}
  }
  componentWillMount() {
    this.getArticleReactions(this.props.data)
    this.getArticleComments(this.props.data)
  }
  componentWillReceiveProps(newProps) {
    this.setState({ 
      reactions: [],
      comments: []
    })
    this.getArticleReactions(newProps.data)
    this.getArticleComments(newProps.data)
  }
  showModel(opt) {
    this.setState(opt)
    this.refs.model.show()
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
    this.getReactionsCancel()
    const { data } = await Axios({ 
      url: `${dataInfo.url}/reactions?time=${Date.now()}`,
      cancelToken: new CancelToken((c) => {
        this.getReactionsCancel = c;
      }),
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview+json'
      }
    })
    this.setState({ reactions: data || [] })
  }
  async getArticleComments(dataInfo) {
    this.getCommentsCancel()
    const { data = [] } = await Axios({ 
      url: `${dataInfo.url}/comments?time=${Date.now()}`,
      cancelToken: new CancelToken((c) => {
        this.getCommentsCancel = c;
      }),
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview+json'
      }
    })
    this.setState({ comments: data.reverse()})
  }
  async postComment() {
    const text = this.refs.commentInput.getValue()
    const dataInfo = this.props.data

    if (this.state.commentLoading) {
      return
    }

    if (!this.props.userInfo.id) {
      this.props.showLogin()
      return
    }

    if (!text.trim().length) {
      this.showModel({
        type: 'err',
        text: '输入为空'
      })
      return
    }
    this.setState({
      commentLoading: true
    })
    const { data } = await Axios({
      url: `${dataInfo.url}/comments`,
      method: 'post',
      data: {
        "body": text
      },
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview+json'
      }
    })
    this.setState({
      commentLoading: false
    })
    if (data) {
      this.showModel({
        type: 'ok',
        text: '留言成功！'
      })
      this.getArticleComments(dataInfo)
      this.refs.commentInput.emptyValue()
    } else {
      this.showModel({
        type: 'ok',
        text: '留言失败，请重试'
      })
    }
  }
  render () {
    const { reactions, commentLoading, comments } = this.state
    const { id } = this.props.userInfo
    const reactionsUpItems = reactions.filter(item => item.content === '+1')
    const reactionsLikeItems = reactions.filter(item => item.content === 'heart')
    const upActiveItem = reactionsUpItems.find(item => item.user.id === id)
    const likeActiveItem = reactionsLikeItems.find(item => item.user.id === id)

    let upIconClass = comCss['reaction-up']
    let likeIconClass = comCss['reaction-like']
    let submitClass = comCss['comment-form-submit']

    if (upActiveItem) upIconClass += ` ${comCss['reaction-up-active']}`
    if (likeActiveItem) likeIconClass += ` ${comCss['reaction-like-active']}`
    if (commentLoading) submitClass += ` ${comCss['comment-form-loading']}`

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
          <CommentInput ref="commentInput"/>
          <button className={submitClass} onClick={()=>this.postComment()}>Comment</button>
        </section>
        <section className={comCss['comment-view']}>
          { 
            comments.length ?
            comments.map(comment => <Comment data={comment} key={comment.id}/>) :
            <div style={{textAlign: 'center', color: '#ccc'}}>这里空空如也～</div>
          }
        </section>
        <Model ref="model" type={this.state.type} text={this.state.text}/>
      </div>
    )
  }
}
