import { createContext, useContext } from "react";
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { AuthContext } from "../AuthContext";

export const ContactContext = createContext()

export function ContactProvider({ children }){

    const loginContext = useContext(AuthContext)
    const [allContacts, setAllContacts] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() =>{
        async function getAllContacts(){
            try{
                const response = await api.get('/contact/all')

                if(response.status == 200){
                    setAllContacts(response.data)
                }
            }catch(error){
                console.log(error)
            }
        }

        setTimeout(() =>{
            getAllContacts()
        }, 500)
    }, []) 

    async function registerContact(data){
        try{
            const response = await api.post('/contact/register', data)

            if(response.status === 200){
                setAllContacts([...allContacts, response.data])
                return true
            }
        }catch(error){ 
            return false
        }
    }


    return(
        <ContactContext.Provider value={{ allContacts, showModal, setShowModal, registerContact }}>
            { children }
        </ContactContext.Provider>
    )
}