import React, {Component} from 'react'
import iptCss from './input.scss'
import {CSSTransition} from 'react-transition-group'
import isMobile from '@/utils/isPhone'

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
    this.closeEmojiView = this.closeEmojiView.bind(this)
  }
  componentWillMount() {
    document.body.addEventListener('click', this.closeEmojiView)
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeEmojiView)
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
      this.setState({showEmoji: false})
      e.preventDefault()
    }
  }
  showEmojiView() {
    this.setState({showEmoji: true})
  }
  closeEmojiView(e) {
    const target = this.refs.emojiView
    if (target && target.contains(e.target)) { 
      return
    }
    this.setState({showEmoji: false})
  }
  textAutoSize() {
    const element = this.refs.commentText
    const lineSize = this.$lineSize || getLineSize(element)
    const realLine = getRealLine(element.value, lineSize) 
    const lineHeight = 22 
    this.$lineSize = lineSize
    this.setState({
      currentHeight: 45 + lineHeight * (realLine - 1)
    })
  }
  render() {
    return (
      <div className={iptCss['user-input']}>
        <div className={iptCss['user-input-label']}>
          <div className={iptCss['user-emoji']}>
            <span className={iptCss['user-emoji-icon']} onClick={()=>{this.showEmojiView()}}></span>
            <CSSTransition
              in={this.state.showEmoji}
              key='tests'
              timeout={200}
              unmountOnExit
              classNames="fade">
              <div ref="emojiView" className={iptCss['user-emoji-list']} onClick={(e)=>this.selectEmoji(e)}>
                {
                  EMOJI_LIST.map((emoji, i) => <span key={i}>{emoji}</span>)
                }
              </div>
            </CSSTransition>
          </div>
          <div className={iptCss['user-input-enter']}>
            <textarea 
              ref="commentText" 
              placeholder="Leave a comment" 
              style={{height: this.state.currentHeight + 'px'}} 
              onKeyUp={(e)=>this.textAutoSize(e)}
            />
          </div>
        </div>
      </div>
    )
  }
}
