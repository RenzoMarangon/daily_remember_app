import { useState } from 'react'
import { store } from '../store/store'


export const useLogged = () => {
    const auth = store.getState()


    const [ isLogged, setIsLogged ] = useState(auth.auth);

    const handleSetLogged = ( log ) => {
        setIsLogged( log );
    }

  return [ isLogged, handleSetLogged]
}
