import mongoose, { Schema } from 'mongoose';

const pagesSchem = new Schema({
	athor: { type: String, required: true },
	description: { type: String, required: true },
	advantages: { type: String },
	disadvantages: { type: String },
});

export default mongoose.model('Comments', pagesSchem);