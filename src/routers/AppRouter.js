import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'
import { login } from '../actions/auth'
import { MainScreen } from '../component/main/MainScreen'
import { AuthRouter } from './AuthRouter'
import { ErrorScreen } from '../component/screens/ErrorScreen'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import {  startLoadingNotes } from '../actions/notes'


export const AppRouter = () => {
  const dispatch = useDispatch();
  const auth = getAuth();


  const [ , setIsLogged ] = useState(true);

  const { auth:{logged} } = useSelector((state)=>state)

  useEffect(() => 
  {
    onAuthStateChanged(auth, async( user ) =>
    {
      if( user?.uid ) 
      {        
        dispatch( login( user.uid, user.displayName ));
      }else
        setIsLogged(false)
    })

  }, [ dispatch ])


  
  return (
    <Router>
        <div className='base__container'>
            <Routes>
                <Route path='auth/*' element ={ 
                  <PublicRoute isLogged={ logged }>
                    <AuthRouter /> 
                  </PublicRoute>} 
                />


                <Route path='/' element ={ 
                  <ProtectedRoute  isLogged = { logged } >
                    <MainScreen />
                  </ProtectedRoute>  } />

                  
                <Route path='*' element = { <ErrorScreen/>}/>
            </Routes>
        </div>
    </Router>
  )
}
