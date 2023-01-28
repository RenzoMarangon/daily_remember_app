import { configureStore, combineReducers, applyMiddleware} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducers } from '../reducers/rootReducer';

const reducer = combineReducers({
    auth: reducers.authReducer,
    ui: reducers.uiReducer,
    notes: reducers.notesReducer,
})

export const store = configureStore({reducer}, applyMiddleware(thunk));