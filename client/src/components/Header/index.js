import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import './style.css'

const Header = () => {
    const login = useContext(LoginContext)
    const token = localStorage.getItem('token')

    function logout(){
      login.logout()
      window.location.href = '/'
    }

    return(
        <header className='header'>
          <h2>Agenda</h2>

          <nav>
            <ul>
              { !token ? 
                <li><Link to='/login'>Entrar</Link></li>  
              :
                <>
                <li>Cadastrar contato</li>
                <li><button onClick={logout}>Sair</button></li>
                </>
              }
            </ul>
          </nav>
        </header>
    )
}

export default Header