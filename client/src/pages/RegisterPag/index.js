import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import api from '../../services/api'
import './style.css'

function RegisterPag(){
    const [inputName, setInputName] = useState({ value: '', error: '' })
    const [inputEmail, setInputEmail] = useState({ value: '', error: '' })
    const [inputPassword, setInputPassword] = useState({ value: '', error: '' })
    const [serverErrorMessage, setServerErrorMessage] = useState([])
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        validCamps(inputName.value, 'Nome', setInputName)
        validCamps(inputEmail.value, 'E-mail', setInputEmail)
        validCamps(inputPassword.value, 'Senha', setInputPassword)

        const data = {
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value
        }

        if(inputName.value && inputEmail.value && inputPassword.value){
            try{
                const response = await api.post('/user/register', data)

                if(response.status === 200){
                    navigate('/')
                }
            }catch(error){
                setServerErrorMessage(error.response.data.errors[0])


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


            { serverErrorMessage.length > 0 ? 
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
                    <label>Nome:</label>
                    <input type="text" value={inputName.value} onChange={(e) => setInputName({ value: e.target.value, error: '' })}/>
                    <p className='errorMessage'>{inputName.error}</p>
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
            </form>
        </div>
    )
}

export default RegisterPag