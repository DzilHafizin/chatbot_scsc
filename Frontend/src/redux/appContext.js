import React, { useState, useReducer, useContext } from "react";
import reducer from "./reducers";
import { CONSTANTS } from './actions'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    user:user ? JSON.parse(user) : null,
    token:null
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addUserToLocal = ({user,token}) => {
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
    }

    const removeUser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const registerUser = async (currUser) => {
        dispatch({type: CONSTANTS.REGISTER.REGISTER_USER_BEGIN})

        try {

            const response = await axios.post('./api/v1/auth/register', currUser)
            console.log(response)

            const { user, token } = response.data

            dispatch({
                type: CONSTANTS.REGISTER.REGISTER_USER_SUCCESS,
                payload: { user, token }
            })

            addUserToLocal({user,token})
            
        } catch (error) {
            console.log(error.response)
            dispatch({ 
                type: CONSTANTS.REGISTER.REGISTER_USER_ERROR, 
                payload:{msg: error.response.data.msg} 
            })
        }
    }

    return (
        <AppContext.Provider value={{...state, registerUser}}>
            {children}  
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }