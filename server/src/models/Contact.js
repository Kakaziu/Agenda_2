const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
})

const contactModel = mongoose.model('Contact', ContactSchema)

class Contact{
    constructor(body){
        this.body = body
        this.errors = []
        this.contact = null
    }

    static async delete(id){
        const contact = await contactModel.findByIdAndRemove(id)

        return contact
    }

    static async getAll(){
        const contacts = await contactModel.find({})

        return contacts
    }

    static async getContact(id){
        const contact = await contactModel.findOne({ _id: id })

        return contact
    }

    async register(){
        this.valida()

        if(this.errors.length > 0) return

        this.contact = await contactModel.create(this.body)
    }

    async edit(id){
        this.valida()

        if(this.errors.length > 0) return 

        this.contact = await contactModel.findByIdAndUpdate({ _id: id }, this.body)
    }

    valida(){
        if(!this.body.name){
            this.errors.push('Nome inválido.')
        }

        if(!this.body.lastName){
            this.errors.push('Sobrenome inválido.')
        }

        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.')
        }

        if(!this.body.phoneNumber || this.body.phoneNumber.length < 3){
            this.errors.push('Número inválido.')
        }
    }
}

module.exports = Contact