import { createContext, useEffect, useState } from 'react'
import { useApi } from '../services/api'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) =>{
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState([])
    const api = useApi()

    useEffect(() =>{
        function validateToken(){
            const storageData = localStorage.getItem('token')
            if(storageData){
                localStorage.setItem('token', storageData)
            }
        }

        validateToken()
    }, [])

    async function signin(data){
        const response = await api.signin(data)

        if(response.data.user && response.data.token){
            setUser(response.data)
            localStorage.setItem('token', response.data.token)
            return true
        }

        setErrors(response.data.errors)
        return false
    }

    function logout(){
        setUser(null)
        localStorage.removeItem('token')
    }

    return(
        <LoginContext.Provider value={{ user, errors ,signin, logout }}>
            { children }
        </LoginContext.Provider>
    )
}