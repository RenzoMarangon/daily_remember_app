import { types } from "../types/types";

const authReducer = ( state = {logged:false}, action ) => {
    switch( action.type )
    {
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName,
                photoURL: action.payload.photoURL,
                logged:true,
            };

        case types.logout:
            return { 
                logged:false
            };
        
        default:
            return state;
    }
}

export default authReducer