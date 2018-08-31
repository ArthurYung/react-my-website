import React,{Component} from 'react'
import Switch from '@c/switch'

const hStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  marginTop: '1.4rem',
  color: '#fad049',
}

export default class Blog extends Component {
  constructor(){
    super()
    this.state = {
      switchin: true
    }
  }
  switchOut(n){
    this.setState({
      switchin: n
    })
  }
  render(){
    return (
      <div className="page">
        <div className="doll-outer">
          <div className="doll-middle">
            <div className="doll-main doll-clearfix">
              <div className="doll-buddha">
                <span className="doll-tail"></span>
                <span className="doll-legs"></span>
                <div className="doll-head">
                  <span className="doll-ears doll-right"></span>
                  <span className="doll-ears doll-left"></span>
                  <span className="doll-circle"></span>
                  <span className="doll-eye doll-right"></span>
                  <span className="doll-eye doll-left"></span>
                  <span className="doll-mouth"></span>
                </div>
                <span className="doll-hand"></span>
              </div>
              <span className="doll-shadow"></span>
            </div>
            <h1 style={hStyle}>- 敬请期待 -</h1>
          </div>
        </div>
        {this.state.switchin?<Switch type="enter" callback={this.switchOut.bind(this)}/>:''}
      </div>
    )
  }
}