import Vehiculo from "../models/Vehiculo.js"
import mongoose from "mongoose"

const registroVehiculo = async (req,res)=>{
    try {
        const {marca,modelo,anio_fabricacion,placa,color,tipo_vehiculo, kilometraje, descripcion} = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        
        const placaExistente = await Vehiculo.findOne({ placa });
        if (placaExistente) return res.status(400).json(
            { msg: `La placa ${placa} ya está en uso` }
        )
        
        const nuevoVehiculo = new Vehiculo(req.body)
        await nuevoVehiculo.save()
        res.status(200).json({nuevoVehiculo})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
}

const visualizarVehiculos = async (req,res)=>{
    const vehiculos = await Vehiculo.find().select(" -createdAt -updatedAt -__v")
    res.status(200).json(vehiculos)
}

const detalleVehiculo = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const vehiculoBDD = await Vehiculo.findById(id)
    if(!vehiculoBDD) return res.status(404).json(
        {msg:`No existe un vehiculo con el siguiente id: ${id}`}
    )
    const vehiculo = await Vehiculo.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(vehiculo)
}

const actualizarVehiculo = async (req,res)=>{
    try {
        const {id} = req.params
        const {marca,modelo,anio_fabricacion,placa,color,tipo_vehiculo, kilometraje, descripcion} = req.body
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
            {msg:`Lo sentimos, debe ser un id válido`}
        )
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const vehiculoBDD = await Vehiculo.findById(id)
        if(!vehiculoBDD) return res.status(404).json(
            {msg:`No existe un vehiculo con el siguiente id: ${id}`}
        )
        const placaExistente = await Vehiculo.findOne({ placa, _id: { $ne: id } })
        if (placaExistente) return res.status(400).json(
            { msg: `La placa ${placa} ya está en uso por otra materia` }
        )
        

        vehiculoBDD.marca = marca ?? vehiculoBDD.marca
        vehiculoBDD.modelo = modelo ?? vehiculoBDD.modelo
        vehiculoBDD.anio_fabricacion = anio_fabricacion ?? vehiculoBDD.anio_fabricacion
        vehiculoBDD.placa = placa ?? vehiculoBDD.placa
        vehiculoBDD.color = color ?? vehiculoBDD.color
        vehiculoBDD.tipo_vehiculo = tipo_vehiculo ?? vehiculoBDD.tipo_vehiculo
        vehiculoBDD.kilometraje = kilometraje ?? vehiculoBDD.kilometraje
        vehiculoBDD.descripcion = descripcion ?? vehiculoBDD.descripcion
        await vehiculoBDD.save()

        res.status(200).json(vehiculoBDD)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}

const eliminarVehiculo = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const vehiculoBDD = await Vehiculo.findById(id)
    if(!vehiculoBDD) return res.status(404).json(
        {msg:`No existe un vehiculo con el siguiente id: ${id}`}
    )
    await Vehiculo.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {msg:"Vehiculo eliminada exitosamente"})
}


export{
    registroVehiculo,
    visualizarVehiculos,
    detalleVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
}
