import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ContactContext } from '../../../contexts/ContactContext'

function Header(){
    const loginContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)

    return(
        <header className='header'>
                <h2>Agenda</h2>

                <nav>
                    <ul>
                        { !loginContext.user ? 
                        <li><Link to='/login'>Entrar</Link></li> 
                        
                        :
                        <>
                        <li><button onClick={() => contactContext.setShowModal(true)}>Cadastrar contatos</button></li>
                        <li><button onClick={() => loginContext.signout()}>Sair</button></li>
                        </>
                        
                        }
                    </ul>
                </nav>
            </header>
    )
}

export default Header