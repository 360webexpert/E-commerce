// import mongoose, { Schema, Document } from 'mongoose';
// export interface IOrder extends Document {
//   customerName: string;
//   products: mongoose.Types.ObjectId[];
//   status: string;
// }
// const orderSchema: Schema = new Schema({
//   customerName: { type: String, required: true },
//   products: [{ type: mongoose.Types.ObjectId, ref: 'Product', required: true }],
//   status: { type: String, default: 'Pending' }
// }, {
//   timestamps: true
// });
// export default mongoose.model<IOrder>('Order', orderSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
