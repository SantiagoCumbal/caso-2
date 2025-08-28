import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarReserva, detalleReserva, eliminarReserva, registroReserva, visualizarReservas } from '../controllers/Reserva_controller.js'

const router = Router()
router.post('/registro/matricula',verificarTokenJWT, registroReserva)
router.get('/matriculas',verificarTokenJWT, visualizarReservas)
router.get('/matricula/:id', verificarTokenJWT,detalleReserva)
router.put('/matricula/actualizar/:id',verificarTokenJWT, actualizarReserva)
router.delete('/matricula/eliminar/:id',verificarTokenJWT, eliminarReserva)


export default router