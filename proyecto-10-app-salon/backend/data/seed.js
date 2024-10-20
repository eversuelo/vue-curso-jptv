import dotenv from 'dotenv';
import { db } from '../config/db.js';
import Services from '../models/services.js';
import { services } from './beautyServices.js';
dotenv.config();

await db();
async function seedDB() {
    try {
        await Services.insertMany(services);
        console.log('Data imported');
        process.exit();
    } catch (error) {
        console.error('Error: ', error.message);
        process.exit(1);
    }
}

async function clearDB() {
    try {
        await Services.deleteMany();
        console.log('Data deleted');
        process.exit();
    } catch (error) {
        console.error('Error: ', error.message);
        process.exit(1);
    }
}
if (process.argv[2] === '--import') {
    seedDB();
} else {
    clearDB();
}