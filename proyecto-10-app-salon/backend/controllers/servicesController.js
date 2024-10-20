import Services from '../models/Services.js';
import { validateObjectId, handleNotFoundError } from '../utils/index.js';
const createService = async (req, res) => {
    if (Object.values(req.body).includes('') || Object.values(req.body).length === 0) {
        const error = new Error('No se han enviado datos');
        return res.status(400).json({ message: error.message });

    }
    try {
        const service = new Services(req.body);
        const result = await service.save();
        res.json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error al crear el servicio' });
    }

}
const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.json(services);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error al obtener los servicios' });
    }
}
const getServicesById = async (req, res) => {
    //Validar un ObjectId
    if (validateObjectId(req.params.id, res)) return;
    const service = await Services.findById(req.params.id);
    if (!service) {
        return handleNotFoundError(res, 'Servicio no encontrado');
    }
    res.json(service);
}
const updateService = async (req, res) => {
    //Validar un ObjectId
    if (validateObjectId(req.params.id, res)) return;
    const service = await Services.findById(req.params.id);
    if (!service) {
        return handleNotFoundError(res, 'Servicio no encontrado');
    }
    const { name, price } = req.body;
    if (name) {
        service.name = name;
    }
    if (price) {
        service.price = price;
    }
    const result = await service.save();
    return res.json(result);
}
const deleteService = async (req, res) => {
    //Validar un ObjectId
    if (validateObjectId(req.params.id, res)) return;
    const service = await Services.findById(req.params.id);
    if (!service) {
        return handleNotFoundError(res, 'Servicio no encontrado');
    }
    try {
        const result = await service.deleteOne();
        res.json({
            message: 'Servicio eliminado',
            ...result

        }, 204);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Error al eliminar el servicio',
            error: error.message
        });
    }
}

export {
    createService,
    getServicesById,
    getServices,
    updateService,
    deleteService
}