import React, {Component} from 'react'
import {
  CSSTransition,
} from 'react-transition-group';
import Pop from './iconPor';

/**
 * @name 图标+弹窗组件
 * props.src 图标 :String
 * props.text 标题文本 :String
 * props.isShow 弹窗控制 :Boolean
 * props.other 其它属性（用户邮箱及姓名）:Object
 * props.close 关闭弹窗方法 :Function
 * props.add (可选，专用于点赞组件) :Function
 */
export default class Icon extends Component{
  // 优化dif
  shouldComponentUpdate(nextProps){
    // 8.15 更新user判断
    if(this.props.other){
      if(nextProps.other.user!==this.props.other.user)return true;
    }
    return nextProps.isShow !== this.props.isShow
  }
  handleShow(close,show){ // 显示弹窗方法，先调用父关闭所有弹窗方法，100ms之后显示弹窗
    let open = new Promise(resolve =>{
       close()
       setTimeout(resolve,100)
    })
    open.then(()=> show())
  }
  handleHide(){
    this.props.close && this.props.close() //父组件的close方法
  }
  render(){
    const isShow = this.props.isShow
    const Component = this.props.child //这里的child是通过props传入的组件，非this.props.children
    return(
    <div  className='figure-flex'>
        <figure onClick={this.handleShow.bind(this,this.props.close,this.props.show)}>
          <img src={this.props.src} alt=""/>
          <figcaption>{this.props.text}</figcaption>
        </figure>
        <CSSTransition
                in={isShow}
                key='test'
                timeout={200}
                unmountOnExit
                classNames="figure">
                <Pop close={this.props.close} type={this.props.type} title={this.props.text} unmove={this.props.unmove}>
                  <Component close={this.props.close} other={this.props.other} add={this.props.add}/> 
                </Pop> 
        </CSSTransition>
    </div>
    )
  }
}
