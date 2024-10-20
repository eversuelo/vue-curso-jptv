import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const db = async() => {
    try{
        const db= await mongoose.connect(process.env.MONGO_URI);
        const url=`${db.connection.name}://${db.connection.host}:${db.connection.port}/`;
        console.log('Conectado a la base de datos: ', url);
    }catch(err){
        console.log(`Error : ${err.message}`);
        process.exit(1);
    }
}