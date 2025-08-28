import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuarios from './routers/Usuario_routes.js'
import routerVehiculos from './routers/Vehiculo_router.js'
import routerClientes from './routers/Cliente_router.js'
import routerReservas from './routers/Reserva_router.js'


// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Rutas para usuarios
app.use('/api',routerUsuarios)

// Rutas para las materias
app.use('/api',routerVehiculos)

// Rutas para los clientes
app.use('/api',routerClientes)

// Rutas para las matriculas
app.use('/api',routerReservas)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app