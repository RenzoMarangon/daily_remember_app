import React from 'react'
import {Routes, Route,  } from 'react-router-dom'
import { LoginScreen } from '../component/auth/LoginScreen'
import { RegisterScreen } from '../component/auth/RegisterScreen'


export const AuthRouter = () => {

    //Si es ventana de error hacé esto...
    // const path = window.location.pathname;
    // const pathIsError = ( path !== '/auth/login' && path !== '/auth/register');


  return (
    <div className='auth__main'>
      <div className='auth__box-container'>

      <Routes>
        <Route path = 'login' 

        element={ 
            <LoginScreen />
        } />

        <Route path = 'register' 
        
        element={ 
            <RegisterScreen /> 
        } />

      </Routes>
      </div>
    </div>
  )
}
