import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarReserva, detalleReserva, eliminarReserva, registroReserva, visualizarReservas } from '../controllers/Reserva_controller.js'

const router = Router()
router.post('/registro/reserva',verificarTokenJWT, registroReserva)
router.get('/reservas',verificarTokenJWT, visualizarReservas)
router.get('/reserva/:id', verificarTokenJWT,detalleReserva)
router.put('/reserva/actualizar/:id',verificarTokenJWT, actualizarReserva)
router.delete('/reserva/eliminar/:id',verificarTokenJWT, eliminarReserva)


export default router