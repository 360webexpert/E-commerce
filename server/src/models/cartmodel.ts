import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
    user: string;
    products: string[];
}

const cartSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model/schema
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // Assuming you have a Product model/schema
});

export default mongoose.model<ICart>('Cart', cartSchema);
