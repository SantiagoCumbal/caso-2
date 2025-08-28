import Reserva from "../models/Reserva.js"
import mongoose from "mongoose"
import Cliente from "../models/Cliente.js"
import Vehiculo from "../models/Vehiculo.js"

const registroReserva= async (req,res)=>{
    try {
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        
        const codigoExistente = await Reserva.findOne({ codigo });
        if (codigoExistente) return res.status(400).json(
            { msg: `El código ${codigo} ya está en uso para otra reserva` }
        )

        const clienteExiste = await Cliente.findById(id_cliente);
        if (!clienteExiste) return res.status(400).json(
            { msg: "El estudiante no existe" }
        )
        
        const vehiculoExistente = await Vehiculo.findById(id_vehiculo);
        if (!vehiculoExistente) return res.status(400).json(
            { msg: "La materia no existe" }
        )
        
        const nuevaReserva = new Reserva({
            ...req.body,
            id_cliente: id_cliente,
            id_vehiculo: id_vehiculo
        })
        await nuevaReserva.save()
        res.status(200).json({nuevaReserva})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}

const visualizarReservas = async (req,res)=>{
    const reservas = await Reserva.find().select(" -createdAt -updatedAt -__v").populate('id_estudiante',' nombre apellido cedula').populate('id_materia','nombre codigo creditos')
    res.status(200).json(reservas)
}

const detalleReserva = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const reservaBDD = await Reserva.findById(id)
    if(!reservaBDD) return res.status(404).json(
        {msg:`No existe una reserva con el siguiente id: ${id}`}
    )
    const reserva = await Reserva.findById(id).select("-createdAt -updatedAt -__v").populate('id_estudiante',' nombre apellido cedula').populate('id_materia','nombre codigo creditos')
    res.status(200).json(reserva)
}

const actualizarReserva = async (req,res)=>{
    try {
        const {id} = req.params
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
            {msg:`Lo sentimos, debe ser un id válido`}
        )
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const reservaBDD = await Reserva.findById(id)
        if(!reservaBDD) return res.status(404).json(
            {msg:`No existe una reserva con el siguiente id: ${id}`}
        )
        const codigoExistente = await Reserva.findOne({ codigo, _id: { $ne: id } })
        if (codigoExistente) return res.status(400).json(
            { msg: `El código ${codigo} ya está en uso por otra reserva` }
        )
        const clienteExiste = await Cliente.findById(id_cliente);
        if (!clienteExiste) return res.status(400).json(
            { msg: "El estudiante no existe" }
        )
        
        const vehiculoExistente = await Vehiculo.findById(id_vehiculo);
        if (!vehiculoExistente) return res.status(400).json(
            { msg: "La materia no existe" }
        )
        

        reservaBDD.codigo = codigo ?? reservaBDD.codigo
        reservaBDD.descripcion = descripcion ?? reservaBDD.descripcion
        reservaBDD.id_cliente = id_cliente ?? reservaBDD.id_cliente
        reservaBDD.id_vehiculo = id_vehiculo ?? reservaBDD.id_vehiculo
        await reservaBDD.save()

        res.status(200).json(reservaBDD)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}

const eliminarReserva = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const reservaBDD = await Reserva.findById(id)
    if(!reservaBDD) return res.status(404).json(
        {msg:`No existe una matricula con el siguiente id: ${id}`}
    )
    await Reserva.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {msg:"Matricula eliminada exitosamente"})
}



export {
    registroReserva,
    visualizarReservas,
    detalleReserva,
    actualizarReserva,
    eliminarReserva
}