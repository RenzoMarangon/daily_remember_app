import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import {  loginWithGoogle, loginWithMailPassword } from '../../actions/auth'

export const LoginScreen = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {ui:{loading}} = useSelector(state => state)
    
  const [ values, handleInputChange ] = useForm({
    email:'groi@gmail.com',
    password:'123456'
  })

  const { email, password } = values;

  const handleLogin= (e) => {
    e.preventDefault();
    dispatch( loginWithMailPassword( email, password ) )

  }

  const handleLoginWithGoogle = () => {
    
    dispatch( loginWithGoogle( ) )
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={ handleLogin } className={'animate__animated animate__fadeIn'}>
        <input 
          className='auth__input'
          type='text'
          placeholder='email'
          name='email'
          value={email}
          onChange={handleInputChange}
          required
        />

        <input 
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          value={ password }
          autoComplete='false'
          onChange={handleInputChange}
          required
        />
        
        <button className='btn btn-primary btn-block' type='submit' disabled = { loading }>
          Login
        </button>
      </form>

      <div className='auth__social-networks animate__animated animate__fadeIn'>
        <p>Login with social networks</p>
        
        <div 
            className="google-btn"
        >
            <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <button onClick={ handleLoginWithGoogle } className="btn-text">
                <b>Sign in with google</b>
            </button>
        </div>
      </div>

      <Link className='link animate__animated animate__fadeIn' to='/auth/register'> Create new account</Link>
    </>
  )
}
