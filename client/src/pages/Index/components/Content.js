import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { ContactContext } from '../../../contexts/ContactContext'

function Content(){

    const { user, loading } = useContext(AuthContext)
    const { allContacts, deleteContact, getContact, setShowModal} = useContext(ContactContext)

    function showEditModal(id){
        getContact(id)
        setShowModal(true)
    }

    if(!user){
        return(
            <div className='content'> 
                <h1>Agenda</h1>
                <p>Faça login no nosso sistema para salvar seus contatos</p>    
            </div>
        )
    }

    return(
        <>
            { !loading ? <div className='content'>
                <h1>Agenda</h1>
                <div className='welcomeMessage'> Olá {user.name}, seja bem-vindo ao sistema! </div>

                <table className='table'>
                    <tbody>
                        {allContacts.map(contact =>{
                            return(
                            <tr key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phoneNumber}</td>
                                <td><button className='edit-btn' onClick={() => showEditModal(contact._id)}>Editar</button></td>
                                <td><button className='del-btn' onClick={() => deleteContact(contact._id)}>Deletar</button></td>
                            </tr>
                        )
                    }) }
                    </tbody>
                </table>
            </div> : <h1>Loading...</h1>}
        </>
    )
}

export default Content