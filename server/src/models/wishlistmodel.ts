import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
// import { IUser } from './User'; // Import IUser from your existing user model

export interface IWishlistUser extends IUser {
    wishlist: string[];
}

const userSchema: Schema = new Schema({
    // Define other user schema properties
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


export default mongoose.model<IWishlistUser>('WishlistUser', userSchema);
