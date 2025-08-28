import {Router} from 'express'
import { actualizarVehiculo, detalleVehiculo, eliminarVehiculo, registroVehiculo, visualizarVehiculos } from '../controllers/Vehiculo_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()
router.post('/registro/vehiculo', verificarTokenJWT, registroVehiculo)
router.get('/vehiculos', verificarTokenJWT,visualizarVehiculos)
router.get('/vehiculo/:id', verificarTokenJWT,detalleVehiculo)
router.put('/vehiculo/actualizar/:id',verificarTokenJWT, actualizarVehiculo)
router.delete('/vehiculo/eliminar/:id',verificarTokenJWT, eliminarVehiculo)

export default router