import React, {Component} from 'react'
import Switch from '@c/switch'
import Css from './about.scss'
import * as Modules from './components/pops'
export default class About extends Component{
  constructor(){
    super()
    this.state = {
      switchin:true
    }
  }
  switchOut(n){
    this.setState(
      {
        switchin:n
      }
    )
  }
  render(){
    const mainClass = `page app-center ${Css.aboutPage}`
    return(
      <main className={mainClass}>
        <div className={Css.consMain}>
          <div className={Css.fontMain}>
            <div className={Css.phonto}><Modules.Photo/></div>
            <div className={Css.mail}><Modules.Mail/></div>
          </div>
          <div className={Css.introduce}>
            <div className={Css.myintro}><Modules.Introduce/></div>
            <div className={Css.contact}>
              <div className={Css.github}><Modules.Git/></div>
              <div className={Css.weichart}><Modules.WeiChart/></div>
            </div>
          </div>
        </div>
        <div className={Css.addMain}>
          <div className={Css.add}><Modules.MyAdd/></div>
          <div className={Css.link}><Modules.OurLink/></div>
        </div>
        {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
      </main>
    )
  }
}