import {Schema, model} from 'mongoose'
import Reserva from "../models/Reserva.js"

const vehiculoSchema = new Schema({
    marca: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'La marca no puede superar 20 caracteres']
    },
    modelo: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El modelo no puede superar 20 caracteres']
    },
    anio_fabricacion: {
        type: Date,
        required: false
    },
    placa: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: [6, 'La placa no puede superar los 6 caracteres']
    },
    color: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El color no puede superar 20 caracteres']
    },
    tipo_vehiculo: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El tipo de vehiculo no puede superar 20 caracteres']
    },
    kilometraje: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'El kilometraje no puede superar 20 caracteres']
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La descripcion no puede superar 50 caracteres']
    },
    }, {
    timestamps: true 
});

vehiculoSchema.pre('findOneAndDelete', async function(next) {
    const vehiculo = await this.model.findOne(this.getFilter());
    if (vehiculo) {
        await Reserva.deleteMany({ id_vehiculo: vehiculo._id });
    }
    next();
});

export default model('Vehiculo',vehiculoSchema)