import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import '../styles/components/header.scss'
import { colors } from '../scripts/utils'

const Header: React.FC = () => {
  return (
    <div className="header">
      <h1 className="title">ToDoList</h1>
      <a className="link" href="/">Main website</a>
      <a className="link" href="/">Github <IconContext.Provider value={{ color: colors.white }}><FiExternalLink /></IconContext.Provider></a>
    </div>
  )
}

export default Header