import React, {Component} from 'react'
import Css from './work.scss'
import Icon from '../../components/icons'

/**
 * @name 作品图标列表组件
 */
export default class ListCompon extends Component{
  constructor(){
    super()
  }
  render(){
    return(
    <div style={{zIndex:this.props.style?20:10}} className={Css.codeBox}>
      <span>{this.props.title}</span>
      <div className={Css.figureBox}>
        {this.props.figures.map((fig,i) => <Icon key={i} 
        show={()=>this.props.shows(fig)} 
        close = {this.props.close} 
        {...fig}/>)}        
      </div>
      <hr align='center' width='100%' color='#1e1e1e' size="1"/>
    </div>
    )
  }
}