import React from 'react';
import {createPortal} from 'react-dom';
import Windo from '../windo'

export default class IconPor extends React.Component {
  constructor() {
    super(...arguments)
    this.doc = window.document.querySelector(".main");
    this.node = document.createElement('div');
    this.doc.appendChild(this.node);
  }
  clearboth(e){
    e.stopPropagation();
  }
  render() {
    return createPortal(
      <Windo {...this.props}>
        {this.props.children}
      </Windo>,
      this.node // 传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    this.doc.removeChild(this.node);
    this.doc = null
  }
}