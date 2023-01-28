import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { activeNote, startNoteDelete } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { store } from '../../store/store'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {


  const dispatch = useDispatch();

  const { active:note } = useSelector(state => state.notes)

  const [ formValues, handleInputChange, reset ] = useForm( note );
  const { body, title, id } = formValues;

  const [activeID, setActiveID] = useState( note.id )


  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  }


  useEffect(() => {
    if( note.id !== activeID) {

      reset( note )
      setActiveID( note.id )

    }
  }, [ note ])
  
  useEffect(() => {

    note.url && ( formValues.url = note.url )
    formValues.id = note.id;
    dispatch( activeNote(formValues.id, {...formValues}) )
  }, [formValues, dispatch])
  


  const handleDelete = () => {
    Swal.fire({
      title:'Do you want to delete the note?',
      showDenyButton:true,
      showConfirmButtonText:'Delete',
      denyButtonText:'Cancel'
    }).then(( result ) => {

      if(result.isConfirmed)
      {
        dispatch( startNoteDelete( activeID ) )
      }
    
    })


  }

  return (
    <div className='notes__main-content '>
      <NotesAppBar/>
      <div className='notes__content'>
        <input
          type={'text'}
          name = 'title'
          placeholder='Title'
          className='notes__title-input'
          value = { title }
          onChange={ handleInputChange }
        />

        <textarea
          placeholder='What are you thinking'
          className='notes__textarea'
          name = { 'body'}
          value = { body }
          onChange={ handleInputChange }
        ></textarea>

              
          <div className='notes__image'>

            {
            note.url 
              ?(<img 
                src={`${note.url}`}
                alt='image'
                />)
              :(
                <button className='btn ' onClick={ handlePictureClick }>
                  <img className='notes__img-upload' src='./img_upload.png' />
                </button>
              )
            }

            <button className='btn btn-danger button_delete' onClick={ handleDelete }>
              Delete
            </button>
                
          </div>

          

        
      </div>



    </div>
  )
}
