import React from 'react';
import {createPortal} from 'react-dom';

/**
 * @name 警示弹窗
 * @props.type 弹窗种类 'ok' || 'err'
 * @props.time 弹窗持续时间 :Number<String>
 * @props.close 弹窗关闭方法 :Function
 */
export default class MyPortal extends React.Component {
  constructor() {
    super(...arguments)
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }
  clearboth(e){
    e.stopPropagation();
  }
  clearmove(e){
   e.stopPropagation();   
  }
  render() {
    return createPortal(
      <div className={`model-pop model-${this.props.type}`}>
        <h1>{this.props.text || (this.props.type==='ok'? '账号绑定成功':'请求错误，请重试')}</h1>
      </div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}
