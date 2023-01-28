import { firebase } from "../firebase";
import { types } from "../types/types";
import { getAuth,GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, signInWithPopup  } from 'firebase/auth';
import { finishLoading, startLoading } from "./ui";
import { cleanNotes } from "./notes";
import Swal from "sweetalert2";



export const login = (uid, displayName,photoURL ) => ({
    type:types.login,
    payload:{
        uid,
        displayName,
        photoURL,
        logged:true,
    }
})

export const loginWithMailPassword = ( ...data ) => {
    
    return( dispatch ) => {
        const [email,password] = data;
        const auth = getAuth(firebase);
        
        dispatch(startLoading())
    
        signInWithEmailAndPassword(auth, email, password  )
        .then(({user}) => {
            dispatch( login(user.uid, user.displayName, '' ) )
    
            dispatch(finishLoading())
        }) 
    }


}


export const registerWithUserEmailPassword = ( ...data ) => {
    return(dispatch)=>{
        const auth = getAuth( firebase );

        const [ username, email, password ]   = data;

        Swal.fire({
            title:'Register',
            text:'please whait',
            allowOutsideClick:false,
            didOpen: ()=>{ Swal.showLoading() } 
        })
    
        createUserWithEmailAndPassword(auth, email, password)
        .then( async({user}) => {
             await updateProfile(user,
                {
                    displayName: username,
                    photoURL:'./avatar.png'
                })
    
                dispatch(
                    login( user.uid, user.displayName, '')
                )

                Swal.fire('Register success', 'registered successfuly','success')
        })
        .catch(e =>{
            
            Swal.fire('Registration error','Email is already in use','error')
        })
    }

}


export const logout = () => ({
    type:types.logout
})

export const startLogOut = ( ) => {
    const auth = getAuth(firebase);
    return async( dispatch )=>{
        
        await signOut( auth );
        dispatch( cleanNotes() );
        dispatch( logout() );
    }
    
}


export const loginWithGoogle = (  ) => 
{
        
    return async(dispatch)=>{
        const auth = getAuth(); 
        const provider = new GoogleAuthProvider();
        try{
    
            const { user } = await signInWithPopup(auth, provider)
            
            const { displayName, uid, photoURL } = user;
            console.log(photoURL)
            
            dispatch( login(uid, displayName, photoURL) )
    
        }catch(err){
            console.log(err)
            dispatch(logout)
        }
    }



 
}