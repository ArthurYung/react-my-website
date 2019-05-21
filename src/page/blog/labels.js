import React from 'react'
import * as blogCss from './blog.scss'
const Label = props => {
  const { color, name, url } = props
  return (
    <a className={blogCss['blog-menu-label']} target="_blank" href={url} style={{color: `#${color}`}}>{ name }</a>
  )
}

export default props => {
  return (
    <span>
      {
        props.labels.map(label => <Label key={label.id} {...label}/>)
      }
    </span>
  )
}
