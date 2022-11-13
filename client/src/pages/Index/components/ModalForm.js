import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../../contexts/ContactContext"


function ModalForm(){

    const contactContext = useContext(ContactContext)

    const [inputName, setInputName] = useState({ value: '', error: '' })
    const [inputLastName, setInputLastName] = useState({ value: '', error: '' })
    const [inputEmail, setInputEmail] = useState({ value: '', error: '' })
    const [inputPhone, setInputPhone] = useState({ value: '', error: '' })
    const [successMessage, setSuccessMessage] = useState('')
    const [serverErrorMessage, setServerErrorMessage] = useState('')

    useEffect(() =>{
        if(contactContext.editContact){
            setInputName({ value: contactContext.editContact.name, error: '' })
            setInputLastName({ value: contactContext.editContact.lastName, error: '' })
            setInputEmail({ value: contactContext.editContact.email, error: '' })
            setInputPhone({ value: contactContext.editContact.phoneNumber, error: '' })
        }
    }, [contactContext.editContact])

   
    function setInputs(){
        setInputName({ value: '', error: '' })
        setInputLastName({ value: '', error: '' })
        setInputEmail({ value: '', error: '' })
        setInputPhone({ value: '', error: '' })
    }

    function offModal(e){
        const id = e.target.id

        if(id === 'modal'){
            contactContext.setShowModal(false)
            contactContext.setEditContact(null)
            setInputs()
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
            contactContext.setShowModal(false)
            setInputs()

            if(isRegister){
                setSuccessMessage('Contato registrado')

                setTimeout(() =>{
                    setSuccessMessage('')
                }, 3000)
            }else{
                setServerErrorMessage('Houve um erro, verifique os dados.')
                

                setTimeout(() =>{
                    setServerErrorMessage('')
                }, 3000)
            }
        }
    }

    async function handleEditContact(e){
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
            const isEdit = await contactContext.handleEdit(data)
            contactContext.setShowModal(false)
            setInputs()

            if(isEdit){
                setSuccessMessage('Contato Editado')

                setTimeout(() =>{
                    setSuccessMessage('')
                }, 3000)
            }else{
                setServerErrorMessage('Houve um erro, verifique os dados.')
                

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
        <>

        {successMessage ? <div className="message successMessage show">{successMessage}</div> : <></>}
        {serverErrorMessage ?<div className="message serverErrorMessage show">{serverErrorMessage}</div> : <></>}

        <div onClick={offModal} id="modal" className={contactContext.showModal ? 'modal' : 'none'}>
            <form className="modal-form" onSubmit={!contactContext.editContact ? handleRegister : handleEditContact}>
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