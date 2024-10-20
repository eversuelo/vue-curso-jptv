import mongoose from 'mongoose';
function validateObjectId(id,res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El id no es valido');
        return res.status(400).json({ message: error.message });
    }
}
function handleNotFoundError(res, msg) {
    const error = new Error(msg);
    return res.status(404).json({ message: error.message });
}

export { validateObjectId ,handleNotFoundError};