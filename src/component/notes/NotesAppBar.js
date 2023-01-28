import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadingNotes, startSaveNote, startUploadingFile } from '../../actions/notes'

export const NotesAppBar = () => {

  const dispatch = useDispatch()

  const { active } = useSelector(state => state.notes);

  const handleSave = () => {
    dispatch( startSaveNote( active ) )
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    if( file )
    {
      dispatch( startUploadingFile( file ) )
    }
  }



  return (
    <div className='notes__appbar'>
        <span> 28th august </span>

        <div>


          <input id="fileSelector" type='file' name='file' onChange={ handleFileUpload } style={{display:'none'}} />

            <button className='btn btn_save' onClick={ handleSave } >
                Save
            </button>
        </div>
    </div>
  )
}
