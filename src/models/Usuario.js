import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: false,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,    
		unique:true
    },
    password:{
        type:String,
        required: true
    }
    }, {
    timestamps: true 
});

usuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}
export default model('Usuario',usuarioSchema)