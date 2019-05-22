import React, {Component} from 'react'
import iptCss from './input.scss'
import {CSSTransition} from 'react-transition-group'

const EMOJI_LIST = [
  '😄', '😆','😊','😃','😏','😍','😘','😚','😳','😌','😆','😁',
  '😉','😜','😝','😀','😗','😙','😛','😴','😟','😦','😧','😮','😬','😕','😯',
  '😑','😒','😅','😓','😥','😩','😔','😞','😖','😨','😰','😣','😢','😭','😂',
  '👍','👍','👎','👎','👌','👊','👊','✊','✌️'
]

export default class Input extends Component {
  constructor() {
    super()
    this.state = {
      showEmoji: false
    }
  }
  showEmojiList() {
    this.refs.emojiToggle.focus()
  }
  handleBlur() {
    this.setState({
      showEmoji: false
    })
  }
  handleFocus() {
    this.setState({
      showEmoji: true
    })
  }
  emptyValue() {
    this.refs.commentText.value = ''
  }
  getValue() {
    return this.refs.commentText.value
  }
  selectEmoji(e) {
    this.refs.commentText.value += e.target.innerText
    this.refs.emojiToggle.blur()
    e.preventDefault()
  }
  render() {
    
    return (
      <div className={iptCss['user-input']}>
        <div className={iptCss['user-input-label']}>
          <div className={iptCss['user-emoji']}>
            <span className={iptCss['user-emoji-icon']} onClick={()=>this.showEmojiList()}></span>
            <CSSTransition
              in={this.state.showEmoji}
              key='tests'
              timeout={200}
              unmountOnExit
              classNames="fade">
              <div className={iptCss['user-emoji-list']} onMouseDown={(e)=>this.selectEmoji(e)}>
                {
                  EMOJI_LIST.map((emoji, i) => <span key={i}>{emoji}</span>)
                }
              </div>
            </CSSTransition>
            <input 
              ref="emojiToggle"
              className={iptCss['hided']}
              onFocus={(e)=>this.handleFocus(e)}
              onBlur={(e)=>this.handleBlur(e)}
            />
          </div>
          <div className={iptCss['user-input-enter']}>
            <textarea pla ref="commentText"></textarea>
          </div>
        </div>
      </div>
    )
  }
}
