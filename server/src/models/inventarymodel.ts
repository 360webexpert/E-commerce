import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    sku: string;
}

const InventorySchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    sku: { type: String, required: true, unique: true }
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);
