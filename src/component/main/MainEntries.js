import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../store/store';
import { MainEntry } from './MainEntry'

export const MainEntries = () => {
  
  const { notes} = useSelector( state => state.notes);

  return (
    <div className='main__entries '>
        {
            notes.map( note => 
                  <MainEntry 
                  { ...note }
                    key={ note.id }
                    
                  />
            )
        }
    </div>
  )
}
