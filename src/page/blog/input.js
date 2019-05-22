import React, {Component} from 'react'
import iptCss from './input.scss'
import {CSSTransition} from 'react-transition-group'

const EMOJI_LIST = [
  '😄', '😆','😊','😃','😏','😍','😘','😚','😳','😌','😆','😁',
  '😉','😜','😝','😀','😗','😙','😛','😴','😟','😦','😧','😮','😬','😕','😯',
  '😑','😒','😅','😓','😥','😩','😔','😞','😖','😨','😰','😣','😢','😭','😂',
  '👍','👍','👎','👎','👌','👊','👊','✊','✌️'
]

const getLineSize = ele => {
  const { fontSize, paddingLeft, paddingRight } = getComputedStyle(ele)
  const width = ele.offsetWidth - parseInt(paddingLeft) - parseInt(paddingRight)
  return (2 * width / parseInt(fontSize))
}

const getRealLine = (str, size) => {
  let len = 1
  let index = 0
  str = str.replace(/[^\x00-\xff]/g, "01")
  for (let i = 0; i < str.length; i++, index++) {
    if (index > size) {
      index = 0
      len ++
    }
    if (str.charCodeAt(i) == 10) {
      index = 0
      len ++
    }
  }
  return len
}
export default class Input extends Component {
  constructor() {
    super()
    this.state = {
      showEmoji: false,
      currentHeight: 45,
      currentLine: 1
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
    this.setState({
      currentHeight: 45
    })
  }
  getValue() {
    return this.refs.commentText.value
  }
  selectEmoji(e) {
    if (e.target.tagName === 'SPAN') {
      this.refs.commentText.value += e.target.innerText
      this.refs.emojiToggle.blur()
      e.preventDefault()
    }
  }
  textAutoSize() {
    const element = this.refs.commentText
    const lineSize = this.$lineSize || getLineSize(element)
    const realLine = getRealLine(element.value, lineSize) 
    const lineHeight = 22 
    this.$lineSize = lineSize
    if (this.state.currentLine < realLine) {
      this.setState(({currentHeight, currentLine}) => ({
        currentHeight: currentHeight + lineHeight,
        currentLine: currentLine + 1
      }))
    }
    if (this.state.currentLine > realLine) {
      this.setState(({currentHeight, currentLine}) => ({
        currentHeight: currentHeight - lineHeight,
        currentLine: currentLine - 1
      }))
    }
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
              <div className={iptCss['user-emoji-list']} onClick={(e)=>this.selectEmoji(e)}>
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
            <textarea 
              ref="commentText" 
              placeholder="Leave a comment" 
              style={{height: this.state.currentHeight + 'px'}} 
              onKeyDown={()=>this.textAutoSize()}
            />
          </div>
        </div>
      </div>
    )
  }
}
