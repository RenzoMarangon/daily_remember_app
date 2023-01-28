import { collection,getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const loadNotes = async( uid ) => {
    const noteCollection = collection(db, `${ uid }/remember/notes`);
    const noteList = await getDocs( noteCollection ).then( notes => notes)
    const noteArrayList = [];

    noteList.forEach( note =>{
        noteArrayList.push({
            id:note.id,
            ...note.data(),
        })
    })

    return noteArrayList;
}