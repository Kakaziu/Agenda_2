import { useContext, useState } from "react"
import { ContactContext } from "../../../contexts/ContactContext"


function ModalForm(){

    const contactContext = useContext(ContactContext)

    const [inputName, setInputName] = useState({ value: '', error: '' })
    const [inputLastName, setInputLastName] = useState({ value: '', error: '' })
    const [inputEmail, setInputEmail] = useState({ value: '', error: '' })
    const [inputPhone, setInputPhone] = useState({ value: '', error: '' })
    const [successMessage, setSuccessMessage] = useState('')

    function offModal(e){
        const id = e.target.id

        if(id === 'modal'){
            contactContext.setShowModal(false)
        }
    }

    async function handleRegister(e){
        e.preventDefault()

        validCamps(inputName.value, 'Nome', setInputName)
        validCamps(inputLastName.value, 'Sobrenome', setInputLastName)
        validCamps(inputEmail.value, 'E-mail', setInputEmail)
        validCamps(inputPhone.value, 'Telefone', setInputPhone)

        const data = {
            name: inputName.value,
            lastName: inputLastName.value,
            email: inputEmail.value,
            phoneNumber: inputPhone.value
        }

        if(inputName.value && inputLastName.value && inputEmail.value && inputPhone.value){
            const isRegister = await contactContext.registerContact(data)

            if(isRegister){
                contactContext.setShowModal(false)
                setSuccessMessage('Contato registrado')

                setTimeout(() =>{
                    setSuccessMessage('')
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
        <>

        {successMessage ? <div className="message successMessage show">{successMessage}</div> : <></>}

        <div onClick={offModal} id="modal" className={contactContext.showModal ? 'modal' : 'none'}>
            <form className="modal-form" onSubmit={handleRegister}>
                <h2>Cadastre o contato</h2>
                <input type='text' placeholder="Nome" value={inputName.value} onChange={(e) => setInputName({ value: e.target.value, error: '' })}/>
                <p className="errorMessage">{inputName.error}</p>
                <input type='text' placeholder="Sobrenome" value={inputLastName.value} onChange={(e) => setInputLastName({ value: e.target.value, error: '' })}/>
                <p className="errorMessage">{inputLastName.error}</p>
                <input type='email' placeholder="E-mail" value={inputEmail.value} onChange={(e) => setInputEmail({ value: e.target.value, error: '' })}/>
                <p className="errorMessage">{inputEmail.error}</p>
                <input type='tel' placeholder="Telefone" value={inputPhone.value} onChange={(e) => setInputPhone({ value: e.target.value, error: '' })}/>
                <p className="errorMessage">{inputPhone.error}</p>

                <button>Salvar</button>
            </form>
        </div>
        </>
    )
}

export default ModalForm