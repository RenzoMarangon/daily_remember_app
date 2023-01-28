import moment from 'moment/moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes';

export const MainEntry = ( {...props }) => {

  const { id, date, title, body, url } = props

  const dispatch = useDispatch();

  const noteDate = moment( date )

  const handleActivateNote = () => {
    dispatch( activeNote(id, props) )
  }

  return (
    <div className='main__entry pointer animate__animated animate__fadeInDown' onClick={ handleActivateNote }>


      <div className='main__entry-picture'>
        <img src={`${ url ? url : './img_not_found.png' }`}  className={ !url && 'main__entry-default-picture' }/>
      </div> 
      

      <div className='main__entry-body'>
        <p className='main__entry-title'>
          { title ? title : 'Title' }
        </p>
        <p className='main__entry-content'>
          { body ? body : 'Lorem ipsum' }
        </p>
      </div>
          
      <div className='main__entry-date-box'>
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
        
    </div>
  )
}
