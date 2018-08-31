import React from 'react'
import isPhone from '@/utils/isPhone'
import Mobile from './mobile'
import Wrapped from './Wrapped'
import logo from './logo.png'
import git from './github.png'
import Pc from './PC'

const NewComponent = isPhone ? Wrapped(Mobile) : Wrapped(Pc)

export default (props) => {
  const _props = {logo,git,...props}
  return(
    <header>
      <NewComponent {..._props}/>
    </header>
  )
}