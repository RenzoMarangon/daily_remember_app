import React from 'react'
import { Navigate,  } from 'react-router-dom'

export const PublicRoute = ({isLogged, children}) => {

    if(isLogged)
    {
        return <Navigate  to={'/'} />
    }

  return (
    children
  )
}
