import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { ContactContext } from '../../../contexts/ContactContext'

function Content(){

    const loginContext = useContext(AuthContext)
    const { allContacts, deleteContact, editContact, getContact, setShowModal, setEdit} = useContext(ContactContext)

    function showEditModal(id){
        getContact(id)
        setShowModal(true)
    }

    return(
        <>
            { !loginContext.user ? 
                <div className='content'> 
                    <h1>Agenda</h1>
                    <p>Faça login no nosso sistema para salvar seus contatos</p>    
                </div>
             :
                <div className='content'>
                    <h1>Agenda</h1>
                    <div className='welcomeMessage'> Olá {loginContext.user.name}, seja bem-vindo ao sistema! </div>

                    <table className='table'>
                        { allContacts.map(contact =>{
                            return(
                                <tr>
                                    <td>{contact.name}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phoneNumber}</td>
                                    <td><button className='edit-btn' onClick={() => showEditModal(contact._id)}>Editar</button></td>
                                    <td><button className='del-btn' onClick={() => deleteContact(contact._id)}>Deletar</button></td>
                                </tr>
                            )
                        }) }
                    </table>
                </div>
             }
        </>
    )
}

export default Content