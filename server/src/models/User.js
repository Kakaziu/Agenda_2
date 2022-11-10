const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now() }
})

const userModel = mongoose.model('User', UserSchema)

class User{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async register(){
        this.validaRegister()

        if(this.errors.length > 0) return 

        await this.userExists()

        if(this.errors.length > 0) return

        this.user = await userModel.create({
            name: this.body.name,
            email: this.body.email,
            password: bcrypt.hashSync(this.body.password)
        })
    }

    async login(){
        this.validaLogin()

        if(this.errors.length > 0) return

        this.user = await userModel.findOne({ email: this.body.email })

        if(!this.user){
            this.errors.push('Usuário não existe')
            return
        }

        const passwordMatch = bcrypt.compareSync(this.body.password, this.user.password)

        if(!passwordMatch){
            this.errors.push('Senha incorreta')
            return
        }
    }

    static async findUser(id){
        const user = await userModel.findOne({ _id: id })

        return user
    }

    async userExists(){
        this.user = await userModel.findOne({ email: this.body.email })
        if(this.user){
            this.errors.push('Usuário já existe')
        }
    }

    validaRegister(){
        if(!this.body.name){
            this.errors.push('Nome inválido')
        }

        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido')
        }

        if(!this.body.password){
            this.errors.push('Senha inválida')
        }
    }

    validaLogin(){
        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido')
        }

        if(!this.body.password){
            this.errors.push('Senha inválida')
        }
    }
}

module.exports = User