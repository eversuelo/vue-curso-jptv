import e from 'express';
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
});

const Services=mongoose.model('Services', serviceSchema);
export default Services;