import React, { useState, createContext, useEffect } from "react";
import api from "../../services/api";

export const AuthContext = createContext()

export function AuthProvider({ children }){

    const [user, setUser] = useState(null)
    
    useEffect(() =>{
        async function persistLogin(){
            const token = localStorage.getItem('token')

            if(token){
                const response = await api.post('/user/validate', {token})

                setUser(response.data)
            }
        }

        persistLogin()
    }, [])
    
    async function signin(email, password){
        const data = {
            email,
            password
        }

        try{
            const response = await api.post('/user/login', data)


            if(response.data.user && response.data.token){
                setUser(response.data.user)
                localStorage.setItem('token', response.data.token)
                api.defaults.headers.common['authorization-token'] = response.data.token
                return true
            }
        }catch(e){
            return false
        }
    }

    function signout(){
        setUser(null)
        localStorage.removeItem('token')
    }

    return(
        <AuthContext.Provider value={{ user, signin, signout}}>
            { children }
        </AuthContext.Provider>
    )
}