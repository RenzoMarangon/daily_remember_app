import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({isLogged, children}) => {
    
    if(!isLogged)
    {
        return <Navigate to={'/auth/login'} />
    }

  return children
}
