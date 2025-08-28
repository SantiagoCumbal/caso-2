import Usuario from "../models/Usuario.js"
import mongoose from "mongoose"
import { crearTokenJWT } from "../middlewares/JWT.js"

const login = async(req,res)=>{

    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json(
        {msg:"Lo sentimos, debes llenar todos los campos"}
    )
    const usuarioBDD = await Usuario.findOne({email}).select("-__v -updatedAt -createdAt")

    if(!usuarioBDD) return res.status(404).json(
        {msg:"Usuario no registrado"}
    )
    const verificarPassword = await usuarioBDD.matchPassword(password)

    if(!verificarPassword) return res.status(401).json(
        {msg:"Contraseña incorrecta"}
    )
    const {nombre,apellido,_id} = usuarioBDD
    const token = crearTokenJWT(usuarioBDD._id)

    res.status(200).json({
        token,
        _id,
        nombre,
        apellido,
        email:usuarioBDD.email
    })
}

const perfil =(req,res)=>{
    const {createdAt,updatedAt,__v,...datosPerfil} = req.usuarioBDD
    res.status(200).json(datosPerfil)
}

export{
    login,
    perfil
}