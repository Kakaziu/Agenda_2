const Contact = require('../models/Contact')

exports.read = async (req, res) =>{
    try{
        const allContacts = await Contact.getAll()
        const contactsUser = allContacts.filter(contact =>{
            return contact.createBy === req.user
        })

        return res.json(contactsUser)
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.register = async (req, res) =>{
    const contact = new Contact({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        createBy: req.user
    })

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

        if(contact.errors.length > 0) return res.status(400).json({ errors: contact.errors })

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