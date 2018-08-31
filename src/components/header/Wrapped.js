import React ,{ Component} from 'react'

export default (WrappedComponent) => class Header extends Component{
  render(){
    return(
      <div>
        <WrappedComponent {...this.props}/>
      </div>
    )
  }
}