import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const crearTokenJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const verificarTokenJWT = async (req, res, next) => {
		const { authorization } = req.headers
		
    if (!authorization) return res.status(401).json(
        { msg: "Acceso denegado: token no proporcionado o inválido" }
    )
    try {
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token,process.env.JWT_SECRET)
        req.usuarioBDD = await Usuario.findById(id).lean().select("-password");
        if (!req.usuarioBDD) {
            return res.status(404).json(
                { msg: "Usuario no encontrado" }
            );
        }
        next();

    } catch (error) {
        return res.status(401).json(
            { msg: "Token inválido o expirado" }
        );
    }
}

export { 
    crearTokenJWT,
    verificarTokenJWT 
}

