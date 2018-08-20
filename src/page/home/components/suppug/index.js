import React, {Component} from 'react'
import {parrotUrl} from '@c/imgurls'
import Css from '../../home.scss'

/**
 * @name 点赞弹窗组件
 */


var PARROTS = 25, //半径
    DIAMETER = 30,
    ROTATION = 0.1,
    SPEED = 0.3,
    SPACING = 4,
    OFFSET = 20
let parrotsSrcs = [];
for(let i = 0; i - PARROTS; i++){
  parrotsSrcs.push(parrotUrl[~~(Math.random()*18)]) // gif图序列
}

// 点赞弹窗数值+1动画
class AddSup extends Component{
  constructor(props){
    super(props)
    this.state = {
      num: this.props.num,
      bright:false
    }
  }
  componentDidMount(){
    this.setTimeout = setTimeout(()=>{this.setState({
      num: (+this.state.num) + 1,
      bright: true
    })},1200)
  }
  componentWillUnmount(){
    clearTimeout(this.setTimeout)
  }
  render(){
    const myclass = this.state.bright? Css.numSpan + ' ' + Css.bright : Css.numSpan
    return(
      <div className={myclass}>
        {this.state.num}
      </div> 
    )
  }
}

// 点赞弹窗gif图动画
export default class SupPug extends Component{
  constructor(){
    super()
    this.src = parrotsSrcs
    this.parrots = []
    this.SIZE = 30
    this.a = Math.round(this.SIZE * DIAMETER * 0.208333) //无限循环
    this.current = OFFSET;
    this.mouse = {
      x: this.a + OFFSET,
      y: this.a + OFFSET
    }
    this.imgLoad = 0
    this.windowSize = {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight
    }
  }
  componentDidMount(){
    for (var i = 0; i < PARROTS; i++) {
      this.parrots[i] = {x:0,y:0,X:0,Y:0};
    }
    this.props.add.upSup()
    this.draw()
    this.mouse={
      x: this.windowSize.w / 2,
      y: this.windowSize.h / 2
    }
    this.roundOut = setTimeout(()=>{
      this.mouse={
        x: this.windowSize.w + 600,
        y:0
      };
    },3000)
    this.closeOut = setTimeout(()=>{
      this.props.close()
    },4600)
  }
  componentWillUnmount(){
    cancelAnimationFrame(this.darw)
    clearTimeout(this.roundOut)
    clearTimeout(this.closeOut)
    this.darw = this.makeCircle = null
    this.retruns = true
  }

  draw() {
    if(this.retruns) return
    var parrot = this.parrots[0];
    var prevParrot = this.parrots[0];
    parrot.x = parrot.X += (this.mouse.x - parrot.X) * SPEED;
    parrot.y = parrot.Y += (this.mouse.y - parrot.Y) * SPEED;
    for (var _i2 = PARROTS - 1; _i2 > 0; --_i2) {
      parrot = this.parrots[_i2];
      prevParrot = this.parrots[_i2 - 1];
      parrot.x = parrot.X += (prevParrot.x - parrot.X) * SPEED;
      parrot.y = parrot.Y += (prevParrot.y - parrot.Y) * SPEED;
    }
    this.makeCircle(this.refs.imgs);
    requestAnimationFrame(this.draw.bind(this));
  }
  makeCircle(dom) {
    if(this.retruns) return
    var parrot = void 0;
    this.current -= ROTATION;
    for (var _i = PARROTS - 1; _i > -1; --_i) {
      parrot = this.parrots[_i];
      dom.children[_i].style.transform = "translate("+
        Math.round(parrot.x + this.a * Math.cos((this.current + _i) / SPACING) - 15) + 'px,'+
        Math.round(parrot.y + this.a * Math.sin((this.current + _i) / SPACING) - 15) + 'px)'
    }
  }
  render(){
    return(
    <div className={Css.supBox}>
         <div className={Css.addSupNum}>
            <h1>THANK U!</h1>
            <AddSup num={this.props.add.num}/>
         </div>
      <div ref = "imgs">
        {this.src.map((src,i) => <img key={i} src={src}/> )}
      </div>
    </div>
    )
  } 
}