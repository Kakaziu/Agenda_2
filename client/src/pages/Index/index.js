import { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import './style.css'

function Index(){

    const loginContext = useContext(AuthContext)

    return(
        <div id='index'>
            
            <header className='header'>
                <h2>Agenda</h2>

                <nav>
                    <ul>
                        { !loginContext.user ? 
                        <li><Link to='/login'>Entrar</Link></li> 
                        
                        :
                        <>
                        <li><button>Cadastrar contatos</button></li>
                        <li><button onClick={() => loginContext.signout()}>Sair</button></li>
                        </>
                        
                        }
                    </ul>
                </nav>
            </header>

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