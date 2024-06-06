import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema);
