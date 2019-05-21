import React from 'react'
import comCss from './comment.scss'
import axios from 'axios';
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
    this.getArticleReactions(newProps.data)
  }
  handleReactionUp() {
    if (!this.props.userInfo.id) this.props.showLogin()
    if (this.state.upIsActive) return
    this.setState({
      upIsActive: true
    })
  }
  handleReactionLike() {
    if (this.state.likeIsActive) return
    this.setState({
      likeIsActive: true
    })
  }
  getArticleReactions(dataInfo) {
    this.setState({
      reactions: []
    })
    const token = localStorage.getItem('githubToken')
    axios.get(dataInfo.url + '/reactions', {
      headers: {
        'Authorization': token,
        'Accept': 'application/vnd.github.squirrel-girl-preview+json'
      }
    }).then(({data})=>{
      this.setState({
        reactions: data
      })
    }).catch(e=>console.log(e))
  }
  render () {
    const { reactions } = this.state
    const { id } = this.props.userInfo
    const reactionsUpItems = reactions.filter(item => item.content === '+1')
    const reactionsLikeItems = reactions.filter(item => item.content === 'heart')
    const upIsActive = reactionsUpItems.some(item => item.user.id === id)
    const likeIsActive = reactionsLikeItems.some(item => item.user.id === id)

    let upIconClass = comCss['reaction-up']
    let likeIconClass = comCss['reaction-like']
    
    if (upIsActive) upIconClass += ` ${comCss['reaction-up-active']}`
    if (likeIsActive) likeIconClass += ` ${comCss['reaction-like-active']}`


    return (
      <div className={comCss['comment-box']}>
        <section className={comCss['reaction-box']}>
          <div className={upIconClass} onClick={()=>this.handleReactionUp(reactionsUpItems)}>
            <i></i>
            <span>{reactionsUpItems.length}</span>
          </div>
          <div className={likeIconClass} onClick={()=>this.handleReactionLike(reactionsLikeItems)}>
            <i></i>
            <span>{reactionsLikeItems.length}</span>
          </div>
        </section>
      </div>
    )
  }
}