import './style.css'
import {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPag(){
    const [inputEmail, setInputEmail] = useState({ value: '', error: '' })
    const [inputPassword, setInputPassword] = useState({ value: '', error: '' })
    const [serverErrorMessage, setServerErrorMessage] = useState('')
    const loginContext = useContext(AuthContext)
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        validCamps(inputEmail.value, 'E-mail', setInputEmail)
        validCamps(inputPassword.value, 'Senha', setInputPassword)

        if(inputEmail.value && inputPassword.value){
            const isLogged = await loginContext.signin(inputEmail.value, inputPassword.value)

        
            if(isLogged){
                navigate('/')
            }else{
                setServerErrorMessage('Usuário inválido')

                setTimeout(() =>{
                    setServerErrorMessage('')
                }, 3000)
            }
        }
    }

    function validCamps(value, camp, setFunc){
        if(!value){
            setFunc({ value: '', error: `* O campo "${camp}" está vazio.` })
        }
    }

    return(

        <div className='container'> 

            { serverErrorMessage ? 
                <div className='message serverErrorMessage show'>
                    {serverErrorMessage}
                </div>
            : <></>}

            <form className="form" onSubmit={handleSubmit}>
                <div className='titleCamp'>
                    <h2>Agenda</h2>
                    <p>Cadastre-se no sistema</p>
                </div>

               <div className="camp">
                    <label>E-mail:</label>
                    <input type="email" value={inputEmail.value} onChange={(e) => setInputEmail({ value: e.target.value, error: '' })}/>
                    <p className='errorMessage'>{inputEmail.error}</p>
               </div>
               <div className="camp">
                    <label>Senha:</label>
                    <input type="password" value={inputPassword.value} onChange={(e) => setInputPassword({ value: e.target.value, error: '' })}/>
                    <p className='errorMessage'>{inputPassword.error}</p>
               </div>

               <button>Cadastrar</button>

               <span>Não tem cadastro ainda? <Link to='/register'>Cadastre-se</Link></span>
            </form>
        </div>
    )
}

export default LoginPag