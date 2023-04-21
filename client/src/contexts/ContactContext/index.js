import { createContext, useContext } from "react";
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { AuthContext } from "../AuthContext";

export const ContactContext = createContext()

export function ContactProvider({ children }){

    const [allContacts, setAllContacts] = useState([])
    const [editContact, setEditContact] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { loading } = useContext(AuthContext)

    useEffect(() =>{
        if(!loading){
            getAllContacts()
        }
    }, [loading]) 

    async function getAllContacts(){
        try{
            const response = await api.get('/contact/all')

            if(response.status === 200){
                setAllContacts(response.data)
            }
        }catch(error){
            console.log(error)
        }
    }

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

    async function deleteContact(id){
        try{
            const response = await api.delete(`/contact/delete/${id}`)

            if(response.status === 200){
                const filteredContacts = allContacts.filter(contact => contact._id !== response.data._id)

                setAllContacts(filteredContacts)
            }
        }catch(e){
            return 
        }
    }

    async function handleEdit(data){
        try{
            const response = await api.put(`/contact/edit/${editContact._id}`, data)

            if(response.status === 200){
                await getAllContacts()
                setEditContact(null)
                return true
            }
        }catch(e){
            return false
        }
    }

    async function getContact(id){
        try{
            const response = await api.get(`/contact/one/${id}`)

            if(response.status === 200){
                setEditContact(response.data)
                return true
            }
        }catch(e){
            return false
        }
    }

    return(
        <ContactContext.Provider value={{ 
            allContacts, 
            showModal, 
            editContact,
            setEditContact,
            setShowModal, 
            registerContact, 
            deleteContact, 
            getContact ,
            handleEdit
            }}>
            { children }
        </ContactContext.Provider>
    )
}