import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ListIcon from '@mui/icons-material/List'
import { Link } from 'react-router-dom'

import Logo from '../../assets/images/logo.png'
import { MenuContainer, HeaderContainer } from './styles'

function Menu() {
  return (
    <>
      <HeaderContainer>
        <Link to='/'>
          <img style={{ width: '150px' }} alt='logo' src={Logo} />
        </Link>
      </HeaderContainer>
      <MenuContainer>
        <Tooltip title='Adicionar clientes' placement='right'>
          <Link to='/create'>
            <IconButton aria-label='add clients'>
              <AddIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title='Listar clientes' placement='right'>
          <Link to='/clients'>
            <IconButton aria-label='list clients'>
              <ListIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </MenuContainer>
    </>
  )
}

export default Menu
