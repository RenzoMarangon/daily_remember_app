import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async(dispatch, getState ) => {
        const { uid } = getState().auth;

        const collectionRef = collection(db, `${ uid }/remember/notes`)
        const newNote = {
            title: '',
            body:  '',
            date:  new Date().getTime(),
            url:'',
        }

        const doc = await addDoc(collectionRef,  newNote )

        dispatch( activeNote(doc.id, newNote))
        dispatch( addNewNote(doc.id, newNote) )

    }
}

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload:{id, ...note}
})

export const activeNote = (id, note ) => ({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
})

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}

export const startSaveNote = ( note ) => {
    return ( dispatch, getState) => {
        const { uid } = getState().auth;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteDoc = doc(db, `${uid}/remember/notes/${ note.id }`);

        updateDoc( noteDoc, noteToFirestore );

        dispatch( refreshNote( note.id, note) );

        Swal.fire('success', note.title, 'success')
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        note:{
            id,
            ...note
            }
    }
})

export const startUploadingFile = ( file ) =>
{
    return async( dispatch, getState ) => 
    {
        const { active:note } = getState().notes;

        Swal.fire({
            title:'Uploading',
            text: 'Please wait.',
            allowOutsideClick:false,
            didOpen: ()=>{ Swal.showLoading() }
        });
        

        const fileUrl = await fileUpload( file );

        const otherNote = {...note, url:fileUrl};


        dispatch( activeNote( note.id, otherNote ));
        dispatch( startSaveNote( otherNote ) );
    }
}


export const startNoteDelete = () => {
    return async( dispatch, getState ) => {
        const { active } = getState().notes;
        const { uid } = getState().auth;

        Swal.fire({
            title:'Deleting',
            text: 'Please wait.',
            allowOutsideClick:false,
            didOpen: ()=>{ Swal.showLoading() }
        });

        const noteDoc = doc(db, `${ uid }/remember/notes/${ active.id }`);
        await deleteDoc( noteDoc )
            .then(()=>{
                dispatch( deleteNote( active.id ) )
                Swal.fire(`${ active.title || 'Note' } deleted`, `${ active.title || 'Note' } was deleted successfuly`, 'success')
               
            })
    }   
    
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})


export const cleanNotes = () =>({
    type:types.notesLogoutCleaning
})
