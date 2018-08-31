import React,{Component} from 'react'
import Color from './color'
import {colors} from '../../home.scss'


export default class Colors extends Component{
  constructor(){
    super()
    this.state = {
      colors:[
        {value: 'main-bg',
         isChoose: false
        },
        {value: 'green-bg',
         isChoose: false
        },
        {value: 'red-bg',
         isChoose: false
        },
        {value: 'black-bg',
         isChoose: false
        },
        {value: 'colour-bg',
         isChoose: false
        },
        {value: 'grid-bg',
         isChoose: false
        }
      ]
    }
  }
  bgChoose(index){
    const _index = this.state.colors.indexOf(index)
    this.colorChoose(_index)
    document.getElementById("root").className = this.state.colors[_index].value
  }
  colorChoose(index){
    let newColors = this.state.colors.filter((c,i)=>{
      c.isChoose = i === index
      return c
      }
    )
    this.setState({
      colors : newColors
    })
  }
  componentDidMount(){
    let hasClass = void 0;
    const color = document.getElementById('root').className
    const newColors = this.state.colors.map(i=>{
      if(i.value === color) i.isChoose=true, hasClass=1;
      return i
    })
    if(!hasClass)newColors[0].isChoose = true;
    this.setState({
      color: newColors
    })
  }
  render(){
    return(
      <div className={colors}>
        {this.state.colors.map((color,i)=>
          <Color key={i} color={color} choose={this.bgChoose.bind(this,color)} />
        )}
      </div>
    )
  }
}