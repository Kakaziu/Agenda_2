import {useState} from 'react'
import './style.css'

function RegisterPag(){
    const [inputName, setInputName] = useState({ value: '', error: '' })
    const [inputEmail, setInputEmail] = useState({ value: '', error: '' })
    const [inputPassword, setInputPassword] = useState({ value: '', error: '' })

    return(
        <div className='container'>
            <form className="form">
                <h2>Agenda</h2>
                <p>Cadastre-se abaixo</p>

               <div className="camp">
                    <label>Nome:</label>
                    <input type="text" value={inputName.value}/>
               </div>
               <div className="camp">
                    <label>E-mail:</label>
                    <input type="email" value={inputEmail.value}/>
               </div>
               <div className="camp">
                    <label>Senha:</label>
                    <input type="password" value={inputPassword.value}/>
               </div>

               <button>Cadastrar</button>
            </form>
        </div>
    )
}

export default RegisterPag