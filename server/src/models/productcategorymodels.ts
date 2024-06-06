import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    _id: string;
    name: string;
    products: string[];
}

const categorySchema: Schema = new Schema({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model<ICategory>('Category', categorySchema);
