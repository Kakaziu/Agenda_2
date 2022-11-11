const Contact = require('../models/Contact')

exports.read = async (req, res) =>{
    try{
        const allContacts = await Contact.getAll()

        return res.json(allContacts)
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.register = async (req, res) =>{
    const contact = new Contact(req.body)

    try{   
        await contact.register()

        if(contact.errors.length > 0) return res.status(400).json({ errors: contact.errors })

        return res.json(contact.contact)
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.delete = async (req, res) =>{
    const { id } = req.params

    try{
        const deletedContact = await Contact.delete(id)

        return res.json(deletedContact)
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.edit = async (req, res) =>{
    const contact = new Contact(req.body)
    const { id } = req.params

    try{
        await contact.edit(id)

        if(contact.errors.length > 0) return res.status(400).json({ errors: contact.contact })

        return res.json({ message: 'Contato editado.' })
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.getOne = async (req, res) =>{
    const { id } = req.params

    try{
        const contact = await Contact.getContact(id)

        return res.json(contact)
    }catch(e){
        return res.status(500).json({ error })
    }
}