import {Schema, model, mongoose} from 'mongoose'
const reservaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: [20, 'El codigo no puede superar 20 caracteres']
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La descripcion no puede superar 50 caracteres']
    },
    id_cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cliente',
        required: true
    },
    id_vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vehiculo',
        required: true
    }
    }, {
    timestamps: true 
});

export default model('Reserva',reservaSchema)