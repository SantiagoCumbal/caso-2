import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarCliente, detalleCliente, eliminarCliente, registroCliente, visualizarClientes } from '../controllers/Cliente_controller.js'

const router = Router()
router.post('/registro/cliente', verificarTokenJWT, registroCliente)
router.get('/clientes', verificarTokenJWT, visualizarClientes)
router.get('/cliente/:id', verificarTokenJWT,detalleCliente)
router.put('/cliente/actualizar/:id',verificarTokenJWT, actualizarCliente)
router.delete('/cliente/eliminar/:id',verificarTokenJWT, eliminarCliente)

export default router