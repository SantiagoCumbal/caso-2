import Cliente from "../models/Cliente.js"
import mongoose from "mongoose"

const registroCliente = async (req,res)=>{
    try {
        const {nombre,apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email} = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const cedulaExistente = await Cliente.findOne({ cedula });
        if (cedulaExistente) return res.status(400).json(
            { msg: `La cedula ${cedula} ya está en uso por otro cliente` }
        )
        const nuevoCliente = new Cliente(req.body)
        await nuevoCliente.save()
        res.status(200).json({nuevoCliente})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
        
}

const visualizarClientes = async (req,res)=>{
    const clientes = await Cliente.find().select(" -createdAt -updatedAt -__v")
    res.status(200).json(clientes)
}

const detalleCliente = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const clienteBDD = await Cliente.findById(id)
    if(!clienteBDD) return res.status(404).json(
        {msg:`No existe un cliente con el siguiente id: ${id}`}
    )
    const cliente = await Cliente.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(cliente)
}

const actualizarCliente = async (req,res)=>{
    try {
            const {id} = req.params
        const {nombre,apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email} = req.body
        if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
            {msg:`Lo sentimos, debe ser un id válido`}
        )
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        const clienteBDD = await Cliente.findById(id)
        if(!clienteBDD) return res.status(404).json(
            {msg:`No existe un cliente con el siguiente id: ${id}`}
        )
        const cedulaExistente = await Cliente.findOne({ cedula, _id: { $ne: id } })
        if (cedulaExistente) return res.status(400).json(
            { msg: `La cedula ${cedula} ya está en uso por otro cliente` }
        )
        

        clienteBDD.nombre = nombre ?? clienteBDD.nombre
        clienteBDD.apellido = apellido ?? clienteBDD.apellido
        clienteBDD.cedula = cedula ?? clienteBDD.cedula
        clienteBDD.fecha_nacimiento = fecha_nacimiento ?? clienteBDD.fecha_nacimiento
        clienteBDD.ciudad = ciudad ?? clienteBDD.ciudad
        clienteBDD.direccion = direccion ?? clienteBDD.direccion
        clienteBDD.telefono = telefono ?? clienteBDD.telefono
        clienteBDD.email = email ?? clienteBDD.email
        await clienteBDD.save()

        res.status(200).json(clienteBDD)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    

}

const eliminarCliente = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json(
        {msg:`Lo sentimos, debe ser un id válido`}
    )
    const clienteBDD = await Cliente.findById(id)
    if(!clienteBDD) return res.status(404).json(
        {msg:`No existe un cliente con el siguiente id: ${id}`}
    )
    await Cliente.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {msg:"Cliente eliminado exitosamente"})
}


export{
    registroCliente,
    visualizarClientes,
    detalleCliente,
    actualizarCliente,
    eliminarCliente
}
