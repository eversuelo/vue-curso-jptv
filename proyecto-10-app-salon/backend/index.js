import express from 'express';
import dotenv from 'dotenv';
import servicesRoutes from './routes/servicesRoutes.js';
import colors from 'colors';
import { db } from './config/db.js';
//Configurar dotenv
dotenv.config();


//Configurar la app
const app = express();
//Leer los datos como JSON
app.use(express.json());

//Conectar a la base de datos
db();
//Definir una ruta
app.use('/api/services', servicesRoutes);

//Definir puerto
const PORT=process.env.PORT || 4000;

//Aarramcar el servidor
app.listen(PORT, () => {
    console.log(colors.blue(`El servidor esta funcionando en el puerto ${PORT}`));
});