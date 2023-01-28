import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadingNotes } from '../../actions/notes'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const MainScreen = () => {
 
  const dispatch = useDispatch();
  const {notes, auth} = useSelector( state => state )

  const { active } = notes;



  useEffect(() => {
    !notes.notes[0] && dispatch( startLoadingNotes( auth.uid ) )

  }, [])
  
  

  return (
    <div className='main__main-content'>

   <Sidebar/>
      
      
      
      <main>
      {     
        (active)
          ? <NoteScreen  /> 
          : <NothingSelected />
          
      }
      </main>
    </div>
  )
}
