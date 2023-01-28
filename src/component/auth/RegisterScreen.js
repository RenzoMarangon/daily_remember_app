import React, { useEffect } from 'react'
import { useDispatch, useSelector,  } from 'react-redux';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import validator from 'validator';

import {  registerWithUserEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'


export const RegisterScreen = () => {

  const { msgError } = useSelector( state => state.ui)


  const dispatch = useDispatch();


  const [ values, handleInputChange ] = useForm({
    user:'user',
    email:'groi@gmail.com',
    password:'123456',
    password2:'123456'
  })
  const { user, password, password2, email } = values;


  const throwError = ( errMsg ) => {
    Swal.fire('Register error', errMsg ,'error')

  }



  const isFormValid = () => {
    if(user.trim().length === 0)
    {
      dispatch( setError( 'User is required' ) ) ;
      throwError( 'User is required' )
      return false;
    }

    if(!validator.isEmail(email))
    {
      dispatch( setError( 'Email is not valid' ) ) ;
      throwError( 'Email is not valid' )
      return false;
    }

    if(password !== password2)
    {
      dispatch( setError( "Passwords don't matches") ) ;
      throwError( "Passwords don't matches" )
      return false;
    }

    if(password.trim().length <= 5 || password2.trim().length <= 5)
    {
      dispatch( setError( 'Password should be at least 6 characters') ) ;
      throwError( 'Password should be at least 6 characters' )
      return false;
    }

    dispatch( removeError() )
    return true;
  }


  const formSubmit = (e) => {
    e.preventDefault();
    if( isFormValid() ) dispatch( registerWithUserEmailPassword( user, email, password ) )

  }

  

  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={ formSubmit } className={'animate__animated animate__fadeIn'}>
        <input 
          className='auth__input'
          type='text'
          placeholder='User'
          name='user'
          required
          value={ user }
          onChange={ handleInputChange }
        />

        <input 
          className='auth__input'
          type='email'
          placeholder='Email'
          name='email'
          required
          value={ email }
          onChange={ handleInputChange }
        />

        <input 
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          autoComplete='false'
          required
          value={ password }
          onChange={ handleInputChange }
        />

        <input 
          className='auth__input'
          type='password'
          placeholder='Repeat password'
          name='password2'
          autoComplete='false'
          required
          value={ password2 }
          onChange={ handleInputChange }
        />
        
        <button className='btn btn-primary btn-block' type='submit'>
          Register
        </button>
      </form>

      <Link className='pt-2 link animate__animated animate__fadeIn' to='/auth/login'> Already registered?</Link>
    
    </>
  )
}
