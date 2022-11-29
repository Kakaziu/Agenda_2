import { useCallback, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import api from '../../services/api'
import './style.css'

const LoginPag = () =>{

    const login = useContext(LoginContext)

    const [inputEmail, setInputEmail] = useState({ value: '', error: '' })
    const [inputPassword, setInputPassword] = useState({ value: '', error: '' })
    const [serverErrorMessage, setServerErrorMessage] = useState([])
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        validCamps(inputEmail.value, 'E-mail', setInputEmail)
        validCamps(inputPassword.value, 'Senha', setInputPassword)

        const data = {
            email: inputEmail.value,
            password: inputPassword.value
        }

        if(inputEmail.value && inputPassword.value){
            await login.signin(data)

            if(login.errors.length > 0){
                setServerErrorMessage(login.errors)
                return
            }

            navigate('/')
        }
    }

    function validCamps(value, camp, setInput){
        if(!value){
            setInput({ value: '', error: `* O campo ${camp} está vazio.` })
        }else{
            setInput({ value: value, error: '' })
        }
    }

    // async function handleSubmit(e){
    //     e.preventDefault()

    //     validCamps(inputEmail.value, 'E-mail', setInputEmail)
    //     validCamps(inputPassword.value, 'Senha', setInputPassword)

    //     const data = {
    //         email: inputEmail.value,
    //         password: inputPassword.value
    //     }

    //     if(inputEmail.value && inputPassword.value){
    //         try{
    //             const response = await api.post('/user/login', data)

    //             if(response.status === 200){
    //                 navigate('/', {
    //                     state: response.data.user
    //                 })
    //             }
    //         }catch(error){
    //             console.log(error.response.data.error)
    //         }
    //     }
    // }


    return(

        <div className='registerPag'>
            <div className={serverErrorMessage.length > 0 ? 'serverErrors' : 'none'}>
                {serverErrorMessage.map((error, index) =>{
                    return ( 
                        <>
                            <p key={index}>{error}</p>
                            <button onClick={() => setServerErrorMessage([])}>X</button>
                        </>
                    )
                })}
            </div>


            <form className='form' onSubmit={handleSubmit}>
                <h2>Agenda</h2>
                <p className='subtitle'>Faça login no sistema</p>

                <input type='email' placeholder='E-MAIL' onChange={(e) => setInputEmail({ value: e.target.value, error: ''})} value={inputEmail.value}/>
                <p className='errorMessage'>{inputEmail.error}</p>
                <input type="password" placeholder='SENHA' onChange={(e) => setInputPassword({ value: e.target.value, error: ''})} value={inputPassword.value}/>
                <p className='errorMessage'>{inputPassword.error}</p> 

                <button>Cadastrar</button>

                <p className='registerLink'>Não tem cadastro? <Link to={'/register'}>Cadastre-se</Link></p>
            </form>
        </div>
    )
}

export default LoginPag