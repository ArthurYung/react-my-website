import React, { Component } from 'react'
import Matter from 'matter-js'
import isPhone from '@/utils/isPhone'
import Css from '../about.scss'
import {aboutImg} from '@c/imgurls'

/**
 * @name AboutMe 城市组件
 */
// 引擎相关配置
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Common = Matter.Common,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint;

// 表情图片
const emojis = [aboutImg.emjs, aboutImg.emja, aboutImg.emjd, aboutImg.emjh, aboutImg.emjz]  

// 球体配置
const density = isPhone? 0.6 : 0.9
const restitution = isPhone ? 0.6 : 0.4
const ballopts = (size) => ({
        density: density, // 密度
        restitution: restitution, // 弹性
        render:{
          fillStyle:'none',
          sprite:{
            texture: emojis[~~(Math.random()*5)],
            xScale: (size / 40).toFixed(2),
            yScale: (size / 40).toFixed(2)
          },
        },
        friction: 1,
      })

export default class MyExp extends Component{
  constructor(){
    super();
    this.engine = Engine.create()
    this.ReSize = this._ReSize.bind(this)
    this.GetGravity = this._GetGravity.bind(this)
  }
  componentDidMount(){
    this.ele = this.refs.canvas
    this.Ew = this.ele.offsetWidth
    this.Eh = this.ele.offsetHeight
    this.CreateRender()
    this.CreateBg()
    this.CreateBall()
    this.CreateMouse()
    this.WorldInit()
    !isPhone && window.addEventListener('resize', this.ReSize)
    isPhone && window.addEventListener('deviceorientation', this.GetGravity)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.ReSize)
    window.removeEventListener('deviceorientation', this.GetGravity)
    World.clear(this.engine.world)
    Engine.clear(this.engine)
  }

  // 建立渲染
  CreateRender(){
    this._render = Render.create({
      element: this.ele,
      engine: this.engine,
      options: {
        wireframes: false,
        width: this.Ew,
        height: this.Eh,
        showMousePosition: false, // 鼠标约束线
        showVelocity: false, // 移动刚体时速度
        background: 'none',
        pixelRatio: window.devicePixelRatio
      }
    })
  }

  // 创建背景以及边框
  CreateBg(){
    const sprite = isPhone 
                ? {texture: aboutImg.icity, xScale: .6, yScale: .6}
                : {texture: aboutImg.icity}
    const bgw = isPhone ? 616 : 880
    const bgh = isPhone ? 140 : 200
    const bgy = isPhone ? 62 :101
    const opts = {
      isStatic: true,
      render: {
        opacity: 0
      }
    }

    this.borders = [
       Bodies.rectangle(this.Ew / 2, -4, this.Ew + 2, 10, opts),
       Bodies.rectangle(this.Ew + 4,this.Eh / 2, 10, this.Eh + 2, opts),
       Bodies.rectangle(this.Ew / 2, this.Eh + 4, this.Ew + 2, 10, opts),
       Bodies.rectangle(-4, this.Eh / 2, 10, this.Eh + 2, opts)
    ]
    this.bg = Bodies.rectangle(this.Ew / 2, this.Eh - bgy, bgw, bgh, { 
      isStatic: true,
      render: {
        fillStyle:'none',
        sprite: sprite
      },
      isStatic: true,
      isSensor: true,
    })
  }

  // 鼠标约束
  CreateMouse(){
    if(isPhone) return;
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      element: this._render.canvas,
      constraint: {
        friction: .5,
        render: {
          visible: false
        }
      }
    });
  }

  // 自适应屏幕
  _ReSize(){
    const b = this.borders
    const x = this.ele.offsetWidth
    const y = this.ele.offsetHeight
    const _x = b[0].vertices[1].x - b[0].vertices[0].x
    const _y = b[1].vertices[2].y - b[1].vertices[1].y

    this._render.canvas.width = x
    this._render.canvas.height = y
    Body.scale(b[0], x / _x,1)
    Body.scale(b[2], x / _x,1)
    Body.scale(b[1], 1, y / _y)
    Body.scale(b[3], 1, y / _y)
    Body.setPosition(b[0], {x: _x / 2, y: -4})
    Body.setPosition(b[2], {x: _x / 2, y: y - -4})
    Body.setPosition(b[1], {x: x - 4, y: _y / 2})
    Body.setPosition(b[3], {x: -4, y: _y / 2})
    Body.setPosition(this.bg, {x: x / 2, y: y - 101})

    this.RestBall()
  }
  // 陀螺仪
  _GetGravity(event){
    var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
        gravity = this.engine.world.gravity;
    if (orientation === 0) {
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
        gravity.y = Common.clamp(event.beta, -90, 90) / 90;
    } else if (orientation === 180) {
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
        gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
    } else if (orientation === 90) {
        gravity.x = Common.clamp(event.beta, -90, 90) / 90;
        gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
    } else if (orientation === -90) {
        gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
        gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
    }
  }

  // 初始化小球
  CreateBall(){
    this.balls =Composites.stack(0, 120, 6, 3, 0, 0, function(x, y) {
      const r = isPhone ? 20 : 30
      return Bodies.circle(x, y, r, ballopts(r));
    });
  }

  // 重置小球
  RestBall(){
    var promise1 = new Promise((resolve, reject) => {
      World.remove(this.engine.world, this.balls)
      resolve()
    })
    promise1.then(
      () => {
        this.CreateBall()
        World.add(this.engine.world, this.balls)
      }
    )
  }

  // 初始化世界
  WorldInit(){
    World.add(this.engine.world,[...this.borders, this.bg, this.balls])
    !isPhone && World.add(this.engine.world, this.mouseConstraint)
    Engine.run(this.engine);
    Render.run(this._render);
  }
  render(){
    return(
      <div ref='canvas' className={Css.canvas}></div>
    )
  }
}