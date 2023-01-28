import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth'
import { startCleaningNotes, startLoadingNotes, startNewNote } from '../../actions/notes'
import { MainEntries } from './MainEntries'

export const Sidebar = () => {

    const { auth } = useSelector(state => state)

    const {name, uid, photoURL} = auth;
    

    const [ screenSize, setScreenSize ] = useState( 1920 );

    const [ showMenu, setShowMenu ] = useState( false )

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch( startLogOut() )
    }

    const handleAddNote = () => {
        dispatch( startNewNote() )
    }

    const handleClick =() => {
        document.querySelector('#menu-btn').click();

    }

    useEffect(() => {
        setScreenSize( window.innerWidth )
        window.innerWidth > 450 && setShowMenu( true );
    }, [])
    
    
  return (

    <>
    <aside className={`main__sidebar ${ showMenu && 'main__sidebar__active' }`} onClick={ handleClick }>

        <div className='main__sidebar-menu'>
            {showMenu && <h2>Daily reminder</h2>}
            { (screenSize <= 450 ) &&  
            <>

            <div className={`main__sidebar-menu-btn ${ !showMenu && 'main__sidebar-menu-btn_active' }`}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    id='menu-btn'
                    onClick={ ()=>{ setShowMenu(!showMenu) } }
                >
                    <MenuIcon />
                </IconButton>
            </div>
            </>
            }

            </div>
        { showMenu &&
            <>
            <div className='main__sidebar-navbar animate__animated animate__fadeInDown'>

            <div className='main__sidebar-navbar-avatar'>
                <img src={ photoURL ? photoURL : './avatar.png'} />
                
                <h3 className='mt-5'>
                    <span>{name}</span>
                </h3>
            </div>

            <button className='btn btn_logout' onClick={ handleLogOut }>
                Logout
            </button>
            </div>

            <div className='main__new-entry animate__animated animate__fadeInDown' onClick={ handleAddNote }>
            <i className='far fa-calendar-plus fa-5x'></i>
            <p className='mt-5'>
                New entry
            </p>
            </div>

            <MainEntries /></>
        }    
    </aside>
    </>
  )
}
