import {Schema, model} from 'mongoose'
import Reserva from "../models/Reserva.js"

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El nombre no puede superar 20 caracteres']
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El apellido no puede superar 20 caracteres']
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [10, 'La cedula debe tener al menos 10 caracteres'],
        maxlength: [10, 'La cedula no puede superar 10 caracteres']
    },
    fecha_nacimiento: {
        type: Date,
        required: false
    },
    ciudad: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La ciudad no puede superar 20 caracteres']
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La direccion no puede superar 50 caracteres']
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, 'El telefono debe tener al menos 10 caracteres'],
        maxlength: [10, 'El telefono no puede superar 10 caracteres']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: [50, 'El email no puede superar 50 caracteres']
    }
    }, {
    timestamps: true 
});

clienteSchema.pre('findOneAndDelete', async function(next) {
    const cliente = await this.model.findOne(this.getFilter());
    if (cliente) {
        await Reserva.deleteMany({ id_cliente: cliente._id });
    }
    next();
});

export default model('Cliente',clienteSchema)