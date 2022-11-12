import { ContactProvider } from '../../contexts/ContactContext'
import Content from './components/Content'
import Header from './components/Header'
import ModalForm from './components/ModalForm'
import './style.css'

function Index(){
    
    return(
        <ContactProvider>
            <div id='index'>
                <ModalForm/>
                <Header/>
                <Content/>
            </div> 
        </ContactProvider>
    )
}

export default Index