import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import './style.css'

function Index(){

    const login = useContext(AuthContext)

    return(
        <div id='index'>
            <header className='header'>
                <h2>Agenda</h2>

                <nav>
                    <ul>
                        <li><Link to='/register'>Entrar</Link></li>
                    </ul>
                </nav>
            </header>

            { !login.user ? 
                <div className='content'> 
                    <h1>Agenda</h1>
                    <p>Faça login no nosso sistema para salvar seus contatos</p>    
                </div>
             :
                <div className='content'>
                    <h1>Agenda</h1>
                    <div className='welcomeMessage'> Olá Kauã, seja bem-vindo ao sistema! </div>

                    <table className='table'>
                        <tr>
                            <td>Lucio</td>
                            <td>Almeida</td>
                            <td>Lucio@email.com</td>
                            <td>21 987362645</td>
                        </tr>
                        <tr>
                            <td>Lucio</td>
                            <td>Almeida</td>
                            <td>Lucio@email.com</td>
                            <td>21 987362645</td>
                        </tr>
                    </table>
                </div>
             }
        </div>
    )
}

export default Index