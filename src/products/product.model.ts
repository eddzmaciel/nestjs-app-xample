
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
    {
        //data type with JavaScript Type
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true }
    }
);

//indicated that this interface is based in a mongoose interface
export interface Product extends mongoose.Document {
    //data type with TypeScript Type
    id: string;
    title: string;
    description: string;
    price: number;
}